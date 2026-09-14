USE bdi_database;

CREATE TABLE IF NOT EXISTS botiquin (
    id_botiquin INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_catalogo INT NOT NULL,
    id_receta INT DEFAULT NULL, -- Opcional: ¿De dónde salió esta caja?
    
    -- Realidad física
    cantidad_disponible INT NOT NULL DEFAULT 0,
    fecha_caducidad DATE DEFAULT NULL,
    
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_usuario_botiquin 
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    CONSTRAINT fk_catalogo_botiquin 
        FOREIGN KEY (id_catalogo) REFERENCES catalogo_medicamentos(id_catalogo) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
        
    CONSTRAINT fk_receta_botiquin 
        FOREIGN KEY (id_receta) REFERENCES recetas(id_receta) 
        ON DELETE SET NULL ON UPDATE CASCADE,
        
    INDEX idx_usuario_botiquin (id_usuario),
    INDEX idx_caducidad_botiquin (fecha_caducidad)
);
