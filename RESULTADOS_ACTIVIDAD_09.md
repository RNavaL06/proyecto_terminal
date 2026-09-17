### Resultados de la Actividad 09: Pruebas de Accesibilidad en Captura y Síntesis de Voz

Con el propósito de validar la integración de la **Web Speech API** en el módulo de interacción por voz, se diseñó y ejecutó un plan de pruebas enfocado en la precisión, la tolerancia a fallos y la legibilidad del sistema para pacientes con discapacidades visuales o motoras. A continuación, se presentan los resultados obtenidos:

#### 1. Prueba de Precisión y Ruido Ambiental
**Objetivo:** Verificar la capacidad del sistema para interpretar correctamente el dictado del paciente bajo diferentes condiciones acústicas, garantizando la transcripción adecuada de términos médicos o síntomas comunes.
**Ejecución:** Se ingresó la frase de prueba *"Me duele la cabeza, tengo náuseas y fiebre de 38 grados"* en un ambiente controlado (silencioso) y, posteriormente, bajo condiciones de ruido de fondo moderado (ruido blanco y ambiente de calle).
**Resultados:** |
* En condiciones acústicas óptimas, el motor de reconocimiento (`es-MX`) capturó el 100% de la frase con la ortografía correcta, incluyendo acentuaciones. 
* Ante ruido moderado, la transcripción presentó un ligero incremento en la latencia (1 a 2 segundos de retraso adicional); no obstante, el algoritmo logró aislar la voz principal transcribiendo el mensaje central de manera exitosa.
**Veredicto:** Satisfactorio. El sistema demostró ser robusto y altamente funcional para entornos domésticos y de consulta clínica habitual.

#### 2. Prueba de Resiliencia ante Permisos Denegados
**Objetivo:** Comprobar que la aplicación maneja adecuadamente los escenarios donde el usuario bloquea el acceso al hardware del micrófono por motivos de privacidad, asegurando la continuidad del servicio sin colapsos (*crashes*).
**Ejecución:** Se revocaron explícitamente los permisos de acceso al micrófono desde la configuración del navegador y se intentó interactuar con el botón de dictado.
**Resultados:** 
* El sistema no presentó excepciones no controladas de JavaScript. El ícono del micrófono permaneció inactivo y la consola registró correctamente la advertencia de acceso denegado (`not-allowed`). 
* El flujo alterno funcionó según lo esperado, permitiendo al usuario utilizar el área de texto como un formulario tradicional de ingreso manual sin bloquear la interfaz.
**Veredicto:** Satisfactorio. Se cumple con los principios de diseño tolerante a fallos y accesibilidad.

#### 3. Prueba de Guion Dinámico y Claridad (Síntesis de Texto a Voz)
**Objetivo:** Evaluar la naturalidad, claridad y coherencia sintáctica del audio autogenerado por el sistema al leer los resúmenes de padecimientos y alertas de inventario del usuario.
**Ejecución:** Se ingresaron síntomas correspondientes al historial médico precargado para forzar la emisión de alertas de medicamentos por agotarse, activando la función "Escuchar" (`speechSynthesis`).
**Resultados:** 
* El motor de lógica condicional concatenó el guion de manera coherente, emitiendo el siguiente mensaje: *"He terminado de escuchar tus malestares. Hemos registrado síntomas como: dolor de cabeza. Al revisar tu expediente real, notamos que anteriormente has tenido recetas de Paracetamol. Ten cuidado, noté que algunos medicamentos están por agotarse en tu botiquín..."*. 
* La velocidad de lectura, preconfigurada con una tasa reducida (`rate = 0.9`), resultó óptima para evitar una síntesis acelerada o robótica, garantizando que los adultos mayores o personas con dificultades cognitivas puedan procesar la información de manera pausada y clara.
**Veredicto:** Satisfactorio. La síntesis acústica resulta natural y otorga un valor informativo accesible superior al de una lectura estática en pantalla.

---
**Conclusión de la Fase de Pruebas:**
Los resultados obtenidos validan que el módulo de voz cumple satisfactoriamente con los criterios de accesibilidad y usabilidad. La implementación no se limita a un mero componente visual, sino que procesa activamente el contexto clínico del usuario y responde asertivamente frente a variaciones de ruido ambiental y restricciones de seguridad a nivel de hardware.
