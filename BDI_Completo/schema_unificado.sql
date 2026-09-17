CREATE DATABASE IF NOT EXISTS bdi_database;
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
USE bdi_database;

CREATE TABLE IF NOT EXISTS medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    
    nombre_medico VARCHAR(150) NOT NULL,
    cedula_profesional VARCHAR(50) UNIQUE DEFAULT NULL,
    
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_nombre_medico (nombre_medico),
    INDEX idx_cedula (cedula_profesional)
);
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
USE bdi_database;

-- =======================================================
-- POBLAR CATÁLOGO CIE-10 (Términos coloquiales -> NLP)
-- =======================================================
INSERT INTO catalogo_cie10 (termino_medico, codigo_cie10, keywords) 
VALUES 
('Cefalea', 'R51', '["cabeza", "migraña", "punzadas", "sien"]'),
('Dolor abdominal y pélvico', 'R10', '["panza", "estomago", "vientre", "retortijon", "colico"]'),
('Náusea', 'R11.0', '["nausea", "ganas", "vomitar", "asco", "revuelto"]'),
('Vómito', 'R11.1', '["vomito", "vomite", "volver", "arrojar", "regresar"]'),
('Dolor de garganta', 'R07.0', '["garganta", "tragar", "anginas", "ardor", "raspa"]'),
('Dolor en el pecho', 'R07.4', '["pecho", "corazon", "opresion", "torax"]'),
('Dorsalgia, no especificada', 'M54.9', '["espalda", "lumbar", "cintura"]'),
('Fiebre, no especificada', 'R50.9', '["fiebre", "calentura", "temperatura", "hirviendo", "caliente"]'),
('Diarrea y gastroenteritis', 'A09', '["diarrea", "chorrillo", "flojo", "liquido", "evacuacion"]'),
('Infección aguda de las vías respiratorias', 'J06.9', '["gripa", "gripe", "catarro", "resfriado", "moco", "mocos"]'),
('Tos', 'R05', '["tos", "toser", "carraspeo", "flema", "flemas", "seca"]'),
('Disnea', 'R06.0', '["falta", "aire", "respirar", "ahogo", "asfixia", "sofoco"]'),
('Mareo y desvanecimiento', 'R42', '["mareo", "mareado", "vueltas", "vertigo"]'),
('Síncope y colapso', 'R55', '["desmayo", "desmaye", "desvanecimiento", "conocimiento", "inconsciente"]'),
('Epistaxis', 'R04.0', '["sangrado", "sangre", "nariz", "hemorragia"]'),
('Contusión, no especificada', 'T14.0', '["moreton", "golpe", "magulladura", "hematoma", "morado"]'),
('Edema, no especificado', 'R60.9', '["hinchazon", "hinchado", "inflamado", "retencion", "liquidos"]'),
('Hipertensión esencial', 'I10', '["presion", "alta", "hipertension"]'),
('Diabetes mellitus', 'E14', '["azucar", "diabetes", "glucosa"]'),
('Pirosis', 'R12', '["agruras", "acidez", "quemazon", "reflujo"]'),
('Mialgia', 'M79.1', '["musculo", "musculos", "cuerpo", "cortado", "macullado"]'),
('Artralgia', 'M25.5', '["articulaciones", "coyunturas", "huesos", "rodilla", "codo"]'),
('Insomnio', 'G47.0', '["dormir", "insomnio", "sueño", "desvelo", "despertar"]'),
('Ansiedad, no especificada', 'F41.9', '["ansiedad", "nervios", "nerviosismo", "estres", "angustia"]'),
('Malestar y fatiga', 'R53', '["cansancio", "fatiga", "debilidad", "agotamiento", "pesadez"]'),
('Prurito, no especificado', 'L29.9', '["comezon", "picazon", "rascar", "urticaria", "ronchas"]'),
('Estreñimiento', 'K59.0', '["estreñimiento", "tapado", "obrar", "baño", "constipacion"]'),
('Disuria', 'R30.0', '["orinar", "pipi", "orin", "vejiga", "mal"]'),
('Conjuntivitis, no especificada', 'H10.9', '["ojo", "ojos", "lagañas", "rojo", "irritado"]'),
('Calambre y espasmo', 'R25.2', '["calambre", "tiron", "engarrotado", "espasmo"]');


-- =======================================================
-- POBLAR CATÁLOGO DE MEDICAMENTOS (Datos Maestros)
-- =======================================================
INSERT INTO catalogo_medicamentos (nombre_comercial, sustancia_activa, formato)
VALUES 
('Aspirina Protect', 'Ácido Acetilsalicílico', 'Tabletas 100mg'),
('Tylenol', 'Paracetamol', 'Tabletas 500mg'),
('Tempra', 'Paracetamol', 'Jarabe Infantil'),
('Motrin', 'Ibuprofeno', 'Tabletas 400mg'),
('Amoxil', 'Amoxicilina', 'Cápsulas 500mg'),
('Treda', 'Neomicina, Caolín, Pectina', 'Tabletas'),
('Pepto-Bismol', 'Subsalicilato de Bismuto', 'Suspensión'),
('Aleve', 'Naproxeno', 'Tabletas 220mg'),
('Loratadina', 'Loratadina', 'Tabletas 10mg'),
('Riopan', 'Magaldrato con Dimeticona', 'Gel'),
('Aderogyl', 'Vitamina A, C, D', 'Ampolletas'),
('Nexium', 'Esomeprazol', 'Tabletas 40mg'),
('Dolo-Neurobion', 'Complejo B, Diclofenaco', 'Tabletas'),
('Desenfriol D', 'Clorfenamina, Paracetamol', 'Tabletas'),
('Mucosolvan', 'Ambroxol', 'Jarabe');
USE bdi_database;

-- =======================================================
-- DATOS DE PRUEBA: USUARIOS Y MÉDICOS
-- =======================================================
INSERT INTO usuarios (google_id, correo_electronico, nombre_completo) VALUES 
('10101010101010', 'usuario.prueba1@gmail.com', 'Juan Pérez Muestra'),
('20202020202020', 'usuario.prueba2@gmail.com', 'María López Ejemplo');

INSERT INTO medicos (nombre_medico, cedula_profesional) VALUES 
('Dr. Roberto Martínez', 'CED1234567'),
('Dra. Elena Gómez', 'CED7654321');

-- =======================================================
-- DATOS DE PRUEBA: RECETAS Y DETALLES
-- =======================================================
-- Se asume que Juan Pérez (id=1) fue con el Dr. Roberto (id=1)
INSERT INTO recetas (id_usuario, id_medico, fecha_expedicion, diagnostico, indicaciones) VALUES 
(1, 1, '2023-10-15', 'Infección y dolor de garganta (Faringitis Aguda)', 'Guardar reposo 3 días, tomar abundantes líquidos');

-- Receta 1: Le recetan Amoxil (id_catalogo=5) y Tempra (id_catalogo=3)
INSERT INTO recetas_detalles (id_receta, id_catalogo, dosis, instrucciones_uso) VALUES 
(1, 5, '500mg', '1 cápsula cada 8 horas por 7 días'),
(1, 3, '10ml', 'Tomar 10ml en caso de presentar fiebre mayor a 38°C');

-- =======================================================
-- DATOS DE PRUEBA: BOTIQUÍN FÍSICO
-- =======================================================
-- Juan Pérez (id=1) compró sus medicinas de la receta 1
INSERT INTO botiquin (id_usuario, id_catalogo, id_receta, cantidad_disponible, fecha_caducidad) VALUES 
(1, 5, 1, 21, '2025-06-30'), -- Compró el Amoxil (id_catalogo=5) de su receta (id_receta=1)
(1, 3, 1, 1, '2024-12-01');  -- Compró un frasco de Tempra (id_catalogo=3) de su receta

-- Juan Pérez también agregó Aspirinas a su botiquín por su cuenta (Sin receta)
INSERT INTO botiquin (id_usuario, id_catalogo, id_receta, cantidad_disponible, fecha_caducidad) VALUES 
(1, 1, NULL, 30, '2026-01-15'); -- Aspirina Protect (id_catalogo=1) agregada manualmente
