-- TABLA PARA AUTENTIACIÓN CON GOOGLE
USE bdi_database;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Credenciales de Google Auth
    google_id VARCHAR(255) UNIQUE NOT NULL,
    correo_electronico VARCHAR(255) UNIQUE NOT NULL,
    
    -- Datos del perfil
    nombre_completo VARCHAR(150) NOT NULL,
    foto_perfil VARCHAR(255) DEFAULT NULL,
    
    -- Campos de auditoría y estado
    estado_cuenta TINYINT(1) DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_ultimo_acceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices de búsqueda rápida
    INDEX idx_google_id (google_id),
    INDEX idx_correo (correo_electronico)
);