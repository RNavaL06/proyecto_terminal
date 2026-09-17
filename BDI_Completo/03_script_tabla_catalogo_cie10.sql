USE bdi_database;

CREATE TABLE IF NOT EXISTS catalogo_cie10 (
    id_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Información médica oficial
    termino_medico VARCHAR(255) NOT NULL,
    
    -- El código CIE-10 debe ser único, ya que será el identificador principal
    codigo_cie10 VARCHAR(10) UNIQUE NOT NULL,
    
    -- Arreglo de síntomas coloquiales (ej. '["panza", "retortijon", "colico"]')
    keywords JSON NOT NULL,
    
    -- Campos de auditoría automática para control interno
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índice de búsqueda: Vital porque el motor NLP devolverá el código CIE-10
    -- y el backend hará un SELECT buscando exactamente este código.
    INDEX idx_codigo_cie10 (codigo_cie10)
);
