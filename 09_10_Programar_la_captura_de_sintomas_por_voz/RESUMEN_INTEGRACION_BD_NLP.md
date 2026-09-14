# Resumen Técnico Extendido: Arquitectura NLP e Integración de Base de Datos (Actividad 09)

Este documento detalla a profundidad los algoritmos clave, tecnologías y el flujo de datos (pipeline) que permiten el funcionamiento del módulo de **Captura de Síntomas por Voz**. 

---

## 1. Detección y Transcripción de Voz (Frontend)

La captura de audio se realiza del lado del cliente (Frontend) utilizando la **Web Speech API** nativa del navegador, la cual es encapsulada por la librería `react-speech-recognition`. Este enfoque evita los altos costos de latencia y procesamiento que implicaría enviar flujos de audio (streaming) hacia un servidor externo, delegando la tarea de transcripción directamente al motor de reconocimiento de voz del sistema operativo.

### Flujo de Ejecución:
1. **Activación del Micrófono:** Al iniciar la captura, se configura el reconocimiento de voz en un canal continuo y se especifica el dialecto esperado (`es-MX`) para mejorar la precisión del modelo acústico local.
2. **Transcripción en Tiempo Real:** A medida que el paciente habla, el navegador actualiza constantemente una variable de estado (`transcript`).
3. **Control del Usuario:** El texto transcrito se inyecta en una caja de texto. Esto permite al paciente revisar lo que el sistema escuchó y hacer correcciones ortográficas o gramaticales manualmente antes de enviar la petición de análisis al servidor.

**Fragmento de Código: Activación y Captura**
```javascript
// Se inicia la captura continua en español (México)
SpeechRecognition.startListening({ continuous: true, language: 'es-MX' });

// Hook de React que expone la transcripción en tiempo real
const { transcript, listening } = useSpeechRecognition();
```

---

## 2. Motor de Procesamiento de Lenguaje Natural (Backend)

Una vez que el Frontend envía el texto transcrito, el servidor en Node.js lo intercepta y lo pasa por un modelo de Inteligencia Artificial (`@nlpjs/lang-es`). La IA clasifica los coloquialismos en entidades médicas oficiales (Catálogo CIE-10).

### 2.1 Construcción del Historial Clínico (MySQL)
Para dotar a la IA de contexto sobre el paciente, el servidor debe recuperar su expediente real. Esto se logra leyendo el token de sesión (`req.usuario.id`) y ejecutando una consulta relacional SQL (`JOIN`) entre las tablas de `recetas` y `medicamentos`. 
Esta consulta extrae: el padecimiento diagnosticado por el médico, el nombre comercial de los medicamentos recetados y, muy importante, la **cantidad disponible actual** en el inventario del paciente.

**Fragmento de Código: Extracción del Expediente**
```javascript
// Consulta relacional ordenada por expedición reciente
const [rows] = await pool.query(`
    SELECT m.nombre_comercial AS medicamento, m.cantidad_disponible, r.diagnostico
    FROM recetas r
    JOIN medicamentos m ON r.id_receta = m.id_receta
    WHERE r.id_usuario = ?
    ORDER BY r.fecha_expedicion DESC
`, [idUsuario]);
```

### 2.2 El Algoritmo de "Fuzzy Matching" con Tokenización
El desafío principal de esta etapa es que los diagnósticos guardados en la Base de Datos provienen de texto libre escrito por doctores (ej. *"Gastroenteritis Infecciosa"*), mientras que la IA devuelve términos estrictos (ej. *"Diarrea y gastroenteritis"*). Para vincularlos, se implementó un cruce de **Tokens**.

En lugar de comparar los textos completos, el algoritmo divide los textos en "palabras clave" (descartando conectores como "el", "de"). Luego, utiliza las funciones de arreglos de JavaScript (`some` e `includes`) para encontrar si comparten palabras en común.

**Fragmento de Código: Tokenización e Intersección**
```javascript
// Usamos TokenizerEs de la librería de NLP para el español
const tokenizer = new TokenizerEs();

// 1. Convertimos el diagnóstico del doctor en tokens (ej: ["gastroenteritis", "infecciosa"])
const cleanReceta = tokenizer.tokenize(receta.diagnostico).filter(w => w.length > 3);

// 2. Comparamos contra los tokens devueltos por la IA (ej: ["diarrea", "gastroenteritis"])
return cleanIA.some(word => cleanReceta.includes(word)); // Si comparten una palabra, hay coincidencia
```

---

## 3. Síntesis de Voz (Text-to-Speech) y UI

Cuando el backend responde con los síntomas analizados y las recetas médicas encontradas, el componente visual (`ResultadosDiagnostico.jsx`) agrupa los datos. 

### Interfaz Gráfica (UI)
Se diseñó bajo un esquema modular. Cada enfermedad detectada genera un bloque independiente. Si hay historial asociado, se muestran los medicamentos con **Badges tipo semáforo** evaluando el campo `cantidad_disponible` (Rojo: Agotado, Amarillo: Por agotarse, Verde: En inventario). Además, se incorporó una alerta legal (*Disclaimer*) obligatoria de color rojo en la cabecera para informar que la IA no sustituye el diagnóstico clínico.

### Algoritmo de Conversión a Voz (TTS)
Para cerrar el ciclo, el sistema le *"habla"* al paciente. Se construye un guion dinámico basado en las variables del estado actual. Si se detecta que un medicamento está por agotarse (`cantidad_disponible < 5`), el algoritmo inyecta una cadena de advertencia adicional en el texto final.
Posteriormente, el guion se envía a la interfaz `SpeechSynthesisUtterance` del navegador.

**Fragmento de Código: Generación del Guion y Reproducción**
```javascript
// Generación dinámica del texto a narrar
let guion = `Hemos registrado síntomas como: ${textoSintomas}. `;
if (medsPorAgotarse.length > 0) {
  guion += "Ten cuidado, algunos medicamentos están por agotarse en tu botiquín.";
}

// Configuración de la API nativa de Voz
const utterance = new SpeechSynthesisUtterance(guion);
utterance.lang = 'es-MX'; // Acento Latino
utterance.rate = 0.9;     // Velocidad ligeramente reducida para claridad

// Ejecución del audio
window.speechSynthesis.speak(utterance);
```

---

### Resumen de la Arquitectura

1. **Voz ➔ Texto:** Web Speech API (`react-speech-recognition`)
2. **Texto ➔ Tokens CIE-10:** `@nlpjs/lang-es` (NLP Model)
3. **Cruce de Datos ➔ Historial Médico:** TokenizerEs (Intersección de arreglos `string[]`) + MySQL (`JOIN`)
4. **Respuestas ➔ UI:** React (Renderizado modular y semáforo de inventario)
5. **Texto ➔ Voz:** Web Speech API (`window.speechSynthesis`)
