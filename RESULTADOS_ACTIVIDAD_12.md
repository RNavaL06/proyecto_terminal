# Resultados de la Actividad 12: Conectar la interfaz web con SerpApi para cotización comercial

Tras finalizar el desarrollo y configurar el proxy local para eludir los bloqueos de seguridad (CORS), se realizaron pruebas de funcionamiento de la aplicación en el servidor de desarrollo, comprobando la integración exitosa con Google Shopping a través de SerpApi.

En la **Figura 1** se aprecia la vista inicial del sistema, en donde el paciente ingresa el medicamento a cotizar mediante el buscador interactivo.

![Buscador de medicamentos](./12_Conectar_interfaz_con_SerApi_para_cotizacion/capturas/buscador.png)
> *Figura 1. Interfaz principal de búsqueda interactiva preparada para consultar disponibilidad y precios (ejemplo capturando "ibuprofeno").*

Una vez que el usuario hace clic en "Buscar", la petición se procesa a través de SerpApi, extrayendo las ofertas comerciales en tiempo real. En la **Figura 2** se observa la adaptación del diseño para dispositivos móviles, donde la tabla tradicional se transforma en tarjetas responsivas e individuales para mejorar la experiencia táctil y de lectura.

![Resultados responsivos](./12_Conectar_interfaz_con_SerApi_para_cotizacion/capturas/resultados_movil.png)
> *Figura 2. Despliegue dinámico de resultados comerciales en formato de tarjetas responsivas (vista móvil), mostrando fotografías del producto, tienda vendedora, botones de detalle directo y ordenamiento automático por el precio más bajo.*

**Conclusiones:**
El rediseño permitió no solo mostrar datos completamente reales extraídos de farmacias en México, sino que prioriza la acción de compra mediante enlaces directos. La interfaz gráfica se muestra robusta, clara y completamente adaptable a pantallas móviles.
