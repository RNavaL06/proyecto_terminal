-- TABLA PARA MEDICOS
USE bdi_database;

CREATE TABLE IF NOT EXISTS medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    nombre_medico VARCHAR(150) DEFAULT 'Médico Desconocido',
    cedula_profesional VARCHAR(50) DEFAULT 'Sin Cédula' UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
