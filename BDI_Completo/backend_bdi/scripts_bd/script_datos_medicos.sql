-- DATOS PARA LA TABLA MEDICOS
USE bdi_database;

INSERT INTO medicos (id_medico, nombre_medico, cedula_profesional) VALUES
(1, 'Dr. Antonio Alejandro Becerril Garduño', '7321012'),
(2, 'Dra. María Fernanda López Hernández', '8492015'),
(3, 'Dr. Carlos Eduardo Mendoza Ramos', '9102834'),
(4, 'Dra. Sofia Valeria Gómez Martínez', '6543210'),
(5, 'Dr. Jorge Luis Ramírez Ortiz', '1234567')
ON DUPLICATE KEY UPDATE 
    nombre_medico = VALUES(nombre_medico), 
    cedula_profesional = VALUES(cedula_profesional);
    
SELECT * FROM medicos;