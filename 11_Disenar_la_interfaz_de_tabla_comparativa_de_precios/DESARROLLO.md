# Desarrollo de la Interfaz para la Tabla Comparativa de Precios

La idea principal detrás de esta actividad es permitir que el paciente consulte el costo de un medicamento y pueda compararlo entre diferentes sucursales farmacéuticas. El desarrollo se enfoca en crear una interfaz interactiva utilizando React, la cual servirá como base para conectarse en el futuro a la API de búsqueda SerpApi.

El proceso inicia con la captura del nombre del medicamento. Para ello, se construyó un buscador principal compuesto por un campo de texto y un botón de acción. Cuando el usuario envía su consulta, el sistema desactiva el botón y muestra un indicador visual de carga, simulando el tiempo de espera que tomaría realizar la petición hacia el servidor.

```javascript
const handleSearch = (e) => {
  e.preventDefault();
  if (!searchTerm.trim()) return;

  // Se activa el estado de carga y se bloquea el botón
  setIsSearching(true);
  
  // Se simula la latencia de la API externa
  setTimeout(() => {
    // Se ordenan los datos de menor a mayor precio antes de guardarlos
    setResults(DUMMY_RESULTS.sort((a, b) => a.precio - b.precio));
    setIsSearching(false);
    setHasSearched(true);
  }, 1500);
};
```
*Código 1. Manejo del evento de búsqueda y simulación de procesamiento de datos.*

Una vez que se resuelve la petición, la información obtenida se procesa y se despliega en una estructura tabular. Cada fila de la tabla corresponde a una farmacia distinta, mostrando detalles como el nombre de la sucursal, el precio del medicamento, la distancia y la disponibilidad. Ya que los datos fueron ordenados previamente por precio, el sistema evalúa la posición de cada registro dentro de la lista. Si el elemento se encuentra en la primera posición (índice 0), se inserta dinámicamente una etiqueta en la interfaz para indicarle al paciente que esa es la "Mejor Opción".

```javascript
{results.map((result, index) => (
  <tr key={result.id}>
    <td>
      {result.farmacia}
      {/* Se lee el índice para destacar la farmacia más económica */}
      {index === 0 && (
        <span>Mejor Opción</span>
      )}
    </td>
    <td>${result.precio.toFixed(2)}</td>
    {/* ... */}
  </tr>
))}
```
*Código 2. Lectura del índice del arreglo para insertar etiquetas dinámicas en los resultados.*

A la par de procesar el precio, el sistema verifica la disponibilidad del medicamento en el inventario de la farmacia. Dependiendo del estado del stock, se modifica el comportamiento del botón final de compra. Si el medicamento está disponible, el botón funciona con normalidad y permite al usuario redirigirse a la farmacia; sin embargo, si el valor del inventario es falso o está agotado, la interfaz deshabilita el botón por completo, previniendo así que el paciente intente realizar una acción de compra inválida.

```javascript
<td>
  {/* Se verifica la variable 'stock' para alterar el estado del botón */}
  <button 
    disabled={!result.stock} 
    onClick={(e) => !result.stock && e.preventDefault()}
  >
    Comprar
  </button>
</td>
```
*Código 3. Bloqueo condicional del botón de compra basado en la disponibilidad del producto.*

Con todos estos elementos interactuando en conjunto, el ciclo de presentación concluye ofreciéndole al paciente una lectura clara y ordenada de las alternativas disponibles. La interfaz gráfica queda así completamente construida y parametrizada, lista para que en una etapa posterior se sustituya el retardo simulado por la petición real hacia el servidor backend y la integración formal con SerpApi.
