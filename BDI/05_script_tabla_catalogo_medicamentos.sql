USE bdi_database;

CREATE TABLE IF NOT EXISTS catalogo_medicamentos (
    id_catalogo INT AUTO_INCREMENT PRIMARY KEY,
    
    nombre_comercial VARCHAR(150) NOT NULL,
    sustancia_activa VARCHAR(150) DEFAULT NULL,
    formato VARCHAR(50) DEFAULT NULL, -- Ej: Tabletas, Jarabe, Solución Inyectable
    
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_nombre_comercial (nombre_comercial),
    INDEX idx_sustancia (sustancia_activa)
);
