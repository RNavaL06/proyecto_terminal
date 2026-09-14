# Desarrollo de la Interfaz Web con SerpApi para Cotización Comercial

En esta actividad se desarrolló la funcionalidad para realizar cotizaciones comerciales en tiempo real, conectando la interfaz de búsqueda con el motor de Google Shopping a través de **SerpApi**. El objetivo principal es permitir a los usuarios consultar y comparar los precios reales de los medicamentos directamente desde las farmacias en México.

## 1. Integración con SerpApi

La captura y obtención de datos se maneja mediante una petición asíncrona hacia el servicio de SerpApi. Al ingresar el nombre de un medicamento en el buscador, el sistema envía los parámetros necesarios (geolocalización en México `gl=mx` e idioma español `hl=es`) junto con la clave de acceso para obtener un arreglo de resultados con las diferentes ofertas comerciales disponibles en línea.

```javascript
// Petición hacia SerpApi
const apiKey = import.meta.env.VITE_SERPAPI_KEY;
const response = await fetch(`/api/serpapi/search.json?engine=google_shopping&q=${encodeURIComponent(searchTerm)}&hl=es&gl=mx&api_key=${apiKey}`);
const data = await response.json();
```
*Código 1. Petición de resultados utilizando el motor de Google Shopping.*

## 2. Estructura de la Tabla de Comparación

Los resultados obtenidos se presentan en una interfaz diseñada para facilitar la comparación rápida y efectiva por parte del usuario. La tabla gráfica organiza la información devuelta por la API en las siguientes columnas principales:

- **Producto:** Se extrae y despliega la fotografía (miniatura) real del medicamento junto con su nombre descriptivo completo.
- **Vendedor / Tienda:** Indica el nombre de la farmacia o distribuidor que ofrece el producto.
- **Precio:** Extrae el costo monetario de la oferta y lo formatea para el usuario. Los resultados se ordenan automáticamente de menor a mayor precio, destacando visualmente la opción más económica.
- **Detalles / Envío:** Presenta las condiciones de entrega proporcionadas por el distribuidor.

## 3. Comportamiento de los Enlaces de Compra

Cada oferta en la tabla incluye un botón de acción rápida que permite al paciente consultar "Más detalles" y proceder con la compra. Debido a que las ofertas pueden provenir de vendedores individuales o de agrupaciones dentro de Google, el botón implementa una lógica inteligente para redirigir al usuario:

El sistema da prioridad absoluta al enlace directo hacia el sitio web de la tienda (`link`), permitiendo una compra directa. En caso de que se trate de un producto agrupado por Google sin un enlace directo, el sistema utiliza el enlace alternativo (`product_link`) que dirige al agregador de Google Shopping para garantizar que la oferta no se pierda.

```javascript
<a
  href={result.link || result.product_link}
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  Más detalles
  <ExternalLink size={16} />
</a>
```
*Código 2. Priorización dinámica de los enlaces de compra y detalles.*

## 4. Diseño Responsivo

Para asegurar una experiencia de usuario óptima en cualquier dispositivo, la interfaz se construyó con un enfoque responsivo utilizando Tailwind CSS:
- **Vista de Escritorio:** En pantallas medianas y grandes, los resultados se despliegan en una estructura tabular tradicional para aprovechar el espacio horizontal.
- **Vista Móvil:** En dispositivos pequeños, la tabla se oculta automáticamente y el sistema renderiza un formato de **Tarjetas (Cards)** que apila la información (imagen, nombre, tienda y precio) de manera vertical, facilitando la lectura y la interacción táctil con los botones de acción.
