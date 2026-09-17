const { GoogleGenerativeAI } = require("@google/generative-ai");
const pool = require("../config/db");

// Inicializamos el cliente de Gemini con la variable de entorno
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Función auxiliar para normalizar fechas en formato YYYY-MM-DD
 */
const parsearFecha = (fechaStr) => {
    if (!fechaStr) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(fechaStr)) return fechaStr;

    // Maneja formatos DD/MM/YY o DD/MM/YYYY
    const partes = fechaStr.split('/');
    if (partes.length === 3) {
        let dia = partes[0].padStart(2, '0');
        let mes = partes[1].padStart(2, '0');
        let anio = partes[2];
        if (anio.length === 2) {
            anio = parseInt(anio, 10) > 50 ? '19' + anio : '20' + anio;
        }
        return `${anio}-${mes}-${dia}`;
    }

    const d = new Date(fechaStr);
    if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
    }
    return null;
};

/**
 * Procesar receta médica mediante visión por IA (Gemini OCR)
 */
const procesarReceta = async (req, res) => {
    const { imagenBase64 } = req.body;

    if (!imagenBase64) {
        return res.status(400).json({
            exito: false,
            mensaje: "Se requiere la imagen de la receta en formato Base64."
        });
    }

    const base64Limpia = imagenBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.1-flash-lite",
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const prompt = `Eres un asistente médico experto en reconocimiento óptico de caracteres (OCR). 
        Analiza la imagen adjunta y extrae ÚNICAMENTE la siguiente información clínica utilizando este esquema JSON:
        {
            "nombre_paciente": "Nombre completo o null",
            "nombre_medico": "Nombre del médico o null",
            "fecha": "Fecha de expedición o null",
            "cedula_profesional": "Cédula o null",
            "diagnostico": "Motivo de consulta o null",
            "indicaciones": "Cualquier indicación extra, reposo, dieta o cuidados generales (null si no aplica)",
            "medicamentos": [
                {
                    "nombre_comercial": "Nombre comercial",
                    "sustancia_activa": "Sustancia o null",
                    "dosis": "Concentración (ej. 500mg)",
                    "formato": "Tabletas, Jarabe, etc.",
                    "instrucciones_uso": "Indicaciones o frecuencia",
                    "fecha_caducidad": "Fecha o null"
                }
            ]
        }
        Regla: Respeta estrictamente los nombres de las llaves. Si un dato no es legible, usa null.`;

        const imagePart = {
            inlineData: {
                data: base64Limpia,
                mimeType: "image/jpeg" 
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const textoRespuesta = response.text();
        const recetaExtraida = JSON.parse(textoRespuesta);

        return res.status(200).json({
            exito: true,
            mensaje: "Documento procesado con éxito",
            datos_clinicos: recetaExtraida
        });

    } catch (error) {
        console.error("Error al procesar la imagen con Gemini:", error);
        
        return res.status(500).json({
            exito: false,
            mensaje: "Error interno al comunicarse con el motor de visión."
        });
    }
};

/**
 * Controlador Transaccional para guardar la receta médica en MySQL
 * POST /api/recetas/guardar
 */
const guardarReceta = async (req, res) => {
    // 1. Extraer id_usuario del token JWT
    const id_usuario = req.usuario?.id || req.usuario?.id_usuario;

    if (!id_usuario) {
        return res.status(401).json({
            exito: false,
            mensaje: "No se encontró un usuario válido en el token de autenticación."
        });
    }

    const datosClinicos = req.body.datos_clinicos || req.body;
    const { nombre_medico, fecha, cedula_profesional, diagnostico, indicaciones, medicamentos } = datosClinicos;

    // Obtener conexión para la transacción
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 2. Insertar al médico o buscar su ID si ya existe por cédula o nombre
        let id_medico = null;

        const nombreMedicoFinal = (nombre_medico && nombre_medico.trim() !== "") ? nombre_medico.trim() : "Médico Desconocido";
        const cedulaFinal = (cedula_profesional && cedula_profesional.trim() !== "") ? cedula_profesional.trim() : "Sin Cédula";

        // Buscar primero por cédula
        const [rowsCedula] = await connection.query(
            "SELECT id_medico FROM medicos WHERE cedula_profesional = ?",
            [cedulaFinal]
        );
        if (rowsCedula.length > 0) {
            id_medico = rowsCedula[0].id_medico;
        }

        // Si no se encontró por cédula, intentar por nombre
        if (!id_medico) {
            const [rowsNombre] = await connection.query(
                "SELECT id_medico FROM medicos WHERE nombre_medico = ?",
                [nombreMedicoFinal]
            );
            if (rowsNombre.length > 0) {
                id_medico = rowsNombre[0].id_medico;
            }
        }

        // Si no existe, lo insertamos
        if (!id_medico) {
            const [medicoResult] = await connection.query(
                "INSERT INTO medicos (nombre_medico, cedula_profesional) VALUES (?, ?)",
                [nombreMedicoFinal, cedulaFinal]
            );
            id_medico = medicoResult.insertId;
        }

        // Parsear fecha de expedición
        const fecha_expedicion = parsearFecha(fecha);

        // 3. Insertar la receta en la tabla recetas
        const [recetaResult] = await connection.query(
            `INSERT INTO recetas (id_usuario, id_medico, fecha_expedicion, diagnostico, indicaciones) 
             VALUES (?, ?, ?, ?, ?)`,
            [id_usuario, id_medico, fecha_expedicion, diagnostico || null, indicaciones || null]
        );
        const id_receta = recetaResult.insertId;

        // 4. Iterar el arreglo medicamentos y ejecutar lógica de Catálogo + Detalles
        if (Array.isArray(medicamentos) && medicamentos.length > 0) {
            for (const med of medicamentos) {
                const nombreComercial = med.nombre_comercial || med.sustancia_activa || "Medicamento Desconocido";
                const sustanciaActiva = med.sustancia_activa || null;
                const formato = med.formato || null;
                
                // 4.1 Buscar en catalogo_medicamentos
                let id_catalogo = null;
                const [catRows] = await connection.query(
                    "SELECT id_catalogo FROM catalogo_medicamentos WHERE nombre_comercial = ?",
                    [nombreComercial]
                );
                
                if (catRows.length > 0) {
                    id_catalogo = catRows[0].id_catalogo;
                } else {
                    // 4.2 Si no existe, lo insertamos en el catálogo
                    const [catInsert] = await connection.query(
                        "INSERT INTO catalogo_medicamentos (nombre_comercial, sustancia_activa, formato) VALUES (?, ?, ?)",
                        [nombreComercial, sustanciaActiva, formato]
                    );
                    id_catalogo = catInsert.insertId;
                }
                
                // 4.3 Insertar en recetas_detalles
                await connection.query(
                    `INSERT INTO recetas_detalles (id_receta, id_catalogo, dosis, instrucciones_uso) 
                     VALUES (?, ?, ?, ?)`,
                    [
                        id_receta,
                        id_catalogo,
                        med.dosis || null,
                        med.instrucciones_uso || null
                    ]
                );
            }
        }

        // 5. Hacer commit si todo fue exitoso
        await connection.commit();

        return res.status(201).json({
            exito: true,
            mensaje: "Receta y medicamentos guardados exitosamente en la base de datos.",
            id_receta,
            id_medico
        });

    } catch (error) {
        // En caso de error, deshacer todos los cambios con rollback
        if (connection) {
            await connection.rollback();
        }
        console.error("Error al guardar la receta (transacción revertida):", error);
        return res.status(500).json({
            exito: false,
            mensaje: "Error al guardar la receta en la base de datos.",
            error: error.message
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = { procesarReceta, guardarReceta };