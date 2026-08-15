-- TABLA PARA MEDICAMENTOS
USE bdi_database;

CREATE TABLE IF NOT EXISTS medicamentos (
    id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    
    -- Información principal (Obligatoria para la identificación)
    nombre_comercial VARCHAR(100) NOT NULL,
    sustancia_activa VARCHAR(100) DEFAULT NULL,
    
    -- Dosificación y formato (Dosis obligatoria para la receta)
    dosis VARCHAR(50) NOT NULL,
    formato VARCHAR(50) DEFAULT NULL,
    
    -- Inventario y caducidad (Caducidad obligatoria para alertas del sistema)
    cantidad_disponible INT NOT NULL DEFAULT 0,
    fecha_caducidad DATE NOT NULL,
    
    -- Información adicional
    instrucciones_uso TEXT DEFAULT NULL,
    
    -- Campos de auditoría automática
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Llave foránea restrictiva
    CONSTRAINT fk_usuario_medicamento 
        FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id_usuario) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
        
    -- Índices de rendimiento
    INDEX idx_usuario (id_usuario),
    INDEX idx_caducidad (fecha_caducidad)
);