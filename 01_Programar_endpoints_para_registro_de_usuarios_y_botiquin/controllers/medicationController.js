const pool = require('../config/db');

//Añadir medicamento
const addMedication = async (req, res) => {
    //  Variables del body esperadas
    const { nombre_comercial, dosis, cantidad_disponible, fecha_caducidad } = req.body;
    const id_usuario = req.usuario.id; 

    try {
        const [result] = await pool.query(
            'INSERT INTO medicamentos (id_usuario, nombre_comercial, dosis, cantidad_disponible, fecha_caducidad) VALUES (?, ?, ?, ?, ?)',
            [id_usuario, nombre_comercial, dosis, cantidad_disponible, fecha_caducidad]
        );
        res.status(201).json({ 
            mensaje: 'Medicamento registrado', 
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error al registrar el medicamento' 
        });
    }
};

//Obtener todos los medicamentos del usuario
const getMedications = async (req, res) => {
    const id_usuario = req.usuario.id;

    try {
        const [rows] = await pool.query('SELECT * FROM medicamentos WHERE id_usuario = ?', [id_usuario]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener el botiquín' 
        });
    }
};

// Actualizar un medicamento
const updateMedication = async (req, res) => {
    const { id } = req.params;
    const { nombre_comercial, dosis, cantidad_disponible, fecha_caducidad } = req.body;
    const id_usuario = req.usuario.id;

    try {
        const [result] = await pool.query(
            'UPDATE medicamentos SET nombre_comercial = ?, dosis = ?, cantidad_disponible = ?, fecha_caducidad = ? WHERE id_medicamento = ? AND id_usuario = ?',
            [nombre_comercial, dosis, cantidad_disponible, fecha_caducidad, id, id_usuario]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Medicamento no encontrado o sin permisos' 
            });
        }
        res.status(200).json({ 
            mensaje: 'Medicamento actualizado' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al actualizar el medicamento' 
        });
    }
};

// Borrar un medicamento
const deleteMedication = async (req, res) => {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    try {
        const [result] = await pool.query('DELETE FROM medicamentos WHERE id_medicamento = ? AND id_usuario = ?', [id, id_usuario]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Medicamento no encontrado o sin permisos' 
            });
        }
        res.status(200).json({ 
            mensaje: 'Medicamento eliminado del botiquín' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al eliminar el medicamento' 
        });
    }
};

module.exports = { 
    addMedication, 
    getMedications, 
    updateMedication, 
    deleteMedication 
};