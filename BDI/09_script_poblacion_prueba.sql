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
