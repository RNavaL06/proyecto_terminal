USE bdi_database;

CREATE TABLE IF NOT EXISTS recetas (
    id_receta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_medico INT DEFAULT NULL,
    
    fecha_expedicion DATE NOT NULL,
    diagnostico VARCHAR(255) DEFAULT NULL,
    indicaciones TEXT DEFAULT NULL,
    
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_usuario_receta 
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    CONSTRAINT fk_medico_receta 
        FOREIGN KEY (id_medico) REFERENCES medicos(id_medico) 
        ON DELETE SET NULL ON UPDATE CASCADE,
        
    INDEX idx_usuario_receta (id_usuario),
    INDEX idx_medico_receta (id_medico)
);
