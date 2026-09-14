# Desarrollo del Módulo de Captura de Síntomas por Voz e Integración con Historial Clínico

La idea principal detrás de este módulo es permitir que los pacientes relaten sus malestares usando un lenguaje natural, tal como lo harían en una consulta médica. Para lograrlo, se utiliza Procesamiento de Lenguaje Natural (NLP) que se encarga de interpretar estos coloquialismos y convertirlos a términos médicos estándar (CIE-10). Una vez interpretados, el sistema consulta la base de datos para recuperar el historial clínico relacionado del usuario. Todo este proceso se presenta de forma fluida e intuitiva al integrar el reconocimiento de voz con respuestas habladas, creando una comunicación bidireccional.

El proceso inicia con la captura del audio. Con el fin de agilizar el tiempo de respuesta y evitar depender de servidores externos, se optó por utilizar la Web Speech API nativa de los navegadores. Para facilitar su implementación dentro del entorno de React, se empleó la librería `react-speech-recognition`. El sistema configura el micrófono para escuchar de forma continua, ajustando el idioma a español latinoamericano (`es-MX`) para mejorar la precisión del reconocimiento acústico.

```javascript
// Activamos el micrófono en español de forma continua
SpeechRecognition.startListening({ continuous: true, language: 'es-MX' });

// Obtenemos el texto en tiempo real mientras el usuario habla
const { transcript, listening } = useSpeechRecognition();
```
*Código 1. Inicialización del micrófono y captura de voz en tiempo real.*

A medida que el paciente habla, el texto transcrito se muestra en la pantalla dentro de una caja editable. Este diseño permite que, en caso de algún error en el reconocimiento auditivo, el usuario pueda corregir la información manualmente antes de enviarla. Una vez que el texto es confirmado, la petición se transmite de forma estructurada hacia el servidor en Node.js.

Al recibir la solicitud, el servidor necesita identificar al usuario activo para darle contexto a la consulta. Para ello, extrae el identificador único directamente desde su token de sesión (JWT). Con este dato, se realiza una consulta relacional a la base de datos MySQL, uniendo la información de las recetas con el catálogo de medicamentos. Esta acción permite conocer el diagnóstico previo otorgado por un médico, el nombre comercial del fármaco y la cantidad actualmente disponible en el inventario del usuario.

```sql
SELECT m.nombre_comercial AS medicamento, m.cantidad_disponible, r.diagnostico
FROM recetas r
JOIN medicamentos m ON r.id_receta = m.id_receta
WHERE r.id_usuario = ?
ORDER BY r.fecha_expedicion DESC
```
*Código 2. Consulta SQL para recuperar el historial de medicamentos y diagnósticos.*

Con el historial recuperado y el texto del paciente listo, se emplea la librería de Inteligencia Artificial `@nlpjs/lang-es` para procesar el lenguaje y obtener las entidades médicas. Durante esta etapa se resolvió una discrepancia de vocabulario importante: los médicos suelen redactar diagnósticos de forma libre (por ejemplo, *"Gastroenteritis Infecciosa"*), mientras que la Inteligencia Artificial devuelve términos predefinidos (como *"Diarrea y gastroenteritis"*). Para lograr conectar ambos datos, se diseñó un algoritmo que divide las frases en palabras clave o *tokens*. De esta manera, si ambas frases comparten palabras significativas, el sistema comprende que se refieren a la misma condición.

```javascript
// Usamos el tokenizador para español
const tokenizer = new TokenizerEs();

// 1. Partimos el diagnóstico del doctor en palabras clave (ignorando palabras muy cortas)
const cleanReceta = tokenizer.tokenize(receta.diagnostico).filter(w => w.length > 3);

// 2. Revisamos si las palabras devueltas por la IA coinciden con las del doctor
const existeCoincidencia = cleanIA.some(word => cleanReceta.includes(word));
```
*Código 3. Algoritmo de tokenización para vincular diagnósticos discrepantes.*

Una vez que los datos están correctamente agrupados, se presentan al usuario mediante una interfaz modular. Cada padecimiento detectado genera un contenedor distinto, dentro del cual se listan los medicamentos recetados anteriormente. Además, se añadió un sistema visual de semáforo (verde, amarillo o rojo) para indicar claramente el nivel de inventario de cada fármaco. En la parte superior de esta interfaz, se incluyó una alerta preventiva obligatoria para recordarle al usuario que los resultados algorítmicos son informativos y no sustituyen una consulta médica certificada.

Finalmente, para enriquecer la experiencia interactiva, el sistema proporciona una retroalimentación auditiva (*Text-to-Speech*). Tomando la información mostrada en pantalla, el algoritmo construye dinámicamente un guion de texto. Si se detecta que un medicamento está próximo a agotarse (con menos de 5 unidades), se incorpora una frase de precaución al mensaje. Este guion es procesado por el sintetizador de voz nativo del navegador, el cual narra los resultados de manera clara y empática, cerrando así el ciclo de interacción con el paciente.

```javascript
// 1. Armamos dinámicamente lo que la voz va a decir
let guion = `Hemos registrado síntomas como: ${textoSintomas}. `;
if (medsPorAgotarse.length > 0) {
  guion += "Ten cuidado, algunos medicamentos están por agotarse en tu botiquín.";
}

// 2. Preparamos el sintetizador de voz configurando acento y velocidad
const utterance = new SpeechSynthesisUtterance(guion);
utterance.lang = 'es-MX';
utterance.rate = 0.9;

// 3. Ejecutamos la lectura en voz alta
window.speechSynthesis.speak(utterance);
```
*Código 4. Lógica de generación dinámica y ejecución de la respuesta hablada.*
