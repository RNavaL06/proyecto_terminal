Conclusiones

Como se pudo comprobar con las pruebas del sistema, se concluye que los objetivos planteados inicialmente se cumplieron satisfactoriamente. El sistema recibe la descripción de los malestares del usuario, la procesa mediante un modelo de lenguaje y da como resultado los términos médicos oficiales para, posteriormente, mostrar una cotización de los medicamentos en farmacias cercanas.

A pesar de que el sistema cumple con sus funciones, presenta un punto importante a mejorar: el tiempo de respuesta. Dado que el programa depende de servicios externos como la conexión a la inteligencia artificial y a la API de cotización (SerpApi), el tiempo que tarda en mostrar los resultados en pantalla puede llegar a ser largo si la conexión no es óptima o si los servidores externos tardan en responder.

El procesamiento de la información funciona adecuadamente para identificar los padecimientos, aunque se podrían ajustar los filtros de relevancia. Es decir, configurar con más detalle las instrucciones que recibe el sistema para evitar que muestre diagnósticos que no tienen mucha relación con lo que el usuario está sintiendo, aumentando así la precisión de la búsqueda médica.

La base del proyecto puede ser ampliada en el futuro. Al estar diseñado por módulos, es posible conectar el sistema directamente a bases de datos de más farmacias locales. Esto también abre la posibilidad de usar esta misma tecnología para otras áreas de la salud, como el registro automatizado de consultas en clínicas o el seguimiento de inventarios médicos.

Finalmente, es importante considerar que la forma en que el usuario describe sus síntomas influye de manera directa en el resultado final. Si la descripción que el usuario dicta o escribe es muy breve o poco explícita, el sistema puede no encontrar el diagnóstico adecuado. Por lo tanto, se requiere que las palabras introducidas sean claras para que el modelo logre procesar la información correctamente y muestre los medicamentos esperados.
