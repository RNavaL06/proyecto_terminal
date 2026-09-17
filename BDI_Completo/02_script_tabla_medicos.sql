USE bdi_database;

CREATE TABLE IF NOT EXISTS medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    
    nombre_medico VARCHAR(150) NOT NULL,
    cedula_profesional VARCHAR(50) UNIQUE DEFAULT NULL,
    
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_nombre_medico (nombre_medico),
    INDEX idx_cedula (cedula_profesional)
);
