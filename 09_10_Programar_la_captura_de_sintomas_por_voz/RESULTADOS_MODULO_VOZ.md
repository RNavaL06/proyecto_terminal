# Resultados del Módulo de Captura de Síntomas por Voz e Integración con Historial Clínico

La implementación del módulo de captura de síntomas por voz culminó con resultados altamente satisfactorios, logrando una interfaz intuitiva, rápida y robusta. A continuación se presentan las evidencias visuales del funcionamiento del sistema durante un escenario de prueba real, demostrando el ciclo completo desde la interacción inicial hasta la retroalimentación auditiva y visual.

### 1. Solicitud de Permisos y Captura en Tiempo Real

El primer paso de la interacción ocurre cuando el usuario decide utilizar la herramienta de dictado. Para garantizar la privacidad y seguridad del paciente, el navegador intercepta la petición y solicita explícitamente el permiso para acceder al hardware del micrófono. Una vez concedido, la interfaz cambia dinámicamente para indicar que se encuentra en modo de escucha, mostrando la transcripción del audio a texto en tiempo real.

![Solicitud de permisos del micrófono](./image.png)
*Figura 1. Solicitud de permisos de hardware por parte del navegador y activación del estado de escucha en la interfaz.*

A medida que el paciente narra sus síntomas de forma coloquial, el texto se inyecta progresivamente en la caja de texto. El diseño limpio y minimalista evita distracciones, centrando la atención del usuario en lo que el sistema está interpretando.

![Transcripción en curso](./image\ 1.png)
*Figura 2. Transcripción automática en tiempo real de los síntomas dictados por el paciente.*

### 2. Edición Manual y Envío al Servidor

Una ventaja clave de este diseño es la capacidad de auditar la información. Si el paciente finaliza su dictado y nota algún error de interpretación acústica, puede corregir el texto manualmente dentro de la misma caja. En la siguiente prueba, el usuario completó la narración detallando múltiples malestares (tos, calentura, dolor de cabeza, punzadas, dolor de panza, asco y ganas de vomitar). Al oprimir el botón, el sistema bloquea la interfaz temporalmente mostrando un estado de carga mientras el motor de Inteligencia Artificial procesa la cadena de texto en el servidor.

![Procesamiento de síntomas](./image\ 2.png)
*Figura 3. Texto final validado por el usuario y estado de procesamiento visual ("Analizando Síntomas...").*

### 3. Resultados Modulares y Vinculación con el Historial Médico

El núcleo de los resultados se observa en la pantalla de diagnóstico. Aquí se refleja el éxito del algoritmo de *Fuzzy Matching* y la integración con la base de datos MySQL. El sistema logró extraer exitosamente las palabras clave (tokens) del dictado y clasificar las enfermedades en bloques independientes.

Se puede observar cómo el sistema generó tres contenedores distintos:
- **Para: Náusea** (Sin historial previo).
- **Para: Cefalea** (Con historial previo: Se encontró la receta de *Tylenol*, indicando mediante un *Badge* verde que existen 24 unidades en el inventario actual).
- **Para: Tos** (Sin historial previo).

En la cabecera de esta pantalla se aprecia con claridad la inserción de una alerta visual de tono rojo, la cual funge como aviso legal (*Disclaimer*) para recordar al paciente que los resultados algorítmicos mostrados no reemplazan el criterio de un médico profesional.

![Resultados y Semáforo](./image\ 3.png)
*Figura 4. Visualización estructurada de los padecimientos detectados, extracción de palabras clave y su vinculación con el inventario de recetas previas.*

### 4. Retroalimentación Auditiva Bidireccional

Finalmente, para dotar al sistema de accesibilidad y empatía, se ejecuta de manera automática la lectura de los hallazgos mediante síntesis de voz (*Text-to-Speech*). Mientras el navegador lee el guion generado dinámicamente, el botón superior derecho cambia su estado y color a rojo ("Detener Voz"), brindando al usuario el control absoluto para silenciar el audio en cualquier momento.

![Reproducción de Voz](./image\ 4.png)
*Figura 5. Interfaz mostrando el control activo para detener la síntesis de voz y el aviso legal permanente.*
