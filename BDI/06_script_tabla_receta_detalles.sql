USE bdi_database;

CREATE TABLE IF NOT EXISTS recetas_detalles (
    id_receta_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_receta INT NOT NULL,
    id_catalogo INT NOT NULL,
    
    -- Datos Clínicos puros (No inventario)
    dosis VARCHAR(100) DEFAULT NULL, -- Ej. 500mg
    instrucciones_uso TEXT DEFAULT NULL, -- Ej. Tomar 1 cada 8 horas
    
    CONSTRAINT fk_receta_detalle 
        FOREIGN KEY (id_receta) REFERENCES recetas(id_receta) 
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    CONSTRAINT fk_catalogo_receta 
        FOREIGN KEY (id_catalogo) REFERENCES catalogo_medicamentos(id_catalogo) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
        
    INDEX idx_receta_detalle (id_receta)
);
