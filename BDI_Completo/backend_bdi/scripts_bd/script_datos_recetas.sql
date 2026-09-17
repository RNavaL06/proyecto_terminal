-- DATOS PARA LA TABLA RECETAS VINCULADAS A id_usuario = 1
USE bdi_database;

INSERT INTO recetas (id_receta, id_usuario, id_medico, fecha_expedicion, diagnostico, indicaciones) VALUES
(1, 1, 1, '2025-01-10', 'Faringitis Aguda', 'Reposo relativo e hidratación abundante.'),
(2, 1, 2, '2025-01-15', 'Infección de Vías Respiratorias Altas', 'Evitar cambios bruscos de temperatura.'),
(3, 1, 1, '2025-02-01', 'Gastritis Medicamentosa', 'Dieta blanda sin irritantes ni grasas.'),
(4, 1, 3, '2025-02-12', 'Hipertensión Arterial Sistémica', 'Monitoreo diario de presión arterial.'),
(5, 1, 4, '2025-03-05', 'Dermatitis de Contacto', 'Evitar jabones perfumados y uso de crema humectante.'),
(6, 1, 2, '2025-03-18', 'Bronquitis Aguda', 'Reposo en casa por 5 días.'),
(7, 1, 5, '2025-04-02', 'Lumbago no Especificado', 'No realizar esfuerzos físicos intensos.'),
(8, 1, 1, '2025-04-14', 'Amigdalitis Estreptocócica', 'Completar esquema de antibiótico.'),
(9, 1, 3, '2025-05-01', 'Diabetes Mellitus Tipo 2 (Control)', 'Control glucémico en ayunas y dieta baja en carbohidratos.'),
(10, 1, 4, '2025-05-20', 'Conjuntivitis Alérgica', 'Usar gafas de sol y evitar frotarse los ojos.'),
(11, 1, 5, '2025-06-03', 'Cefalea Tensional', 'Técnicas de relajación y descanso nocturno regular.'),
(12, 1, 2, '2025-06-19', 'Gastroenteritis Infecciosa', 'Vida suero oral e hidratación constante.'),
(13, 1, 1, '2025-07-04', 'Rinitis Alérgica', 'Evitar exposición a polvo y polen.'),
(14, 1, 3, '2025-07-22', 'Dislipidemia', 'Ejercicio aeróbico 30 min diarios y dieta baja en grasas saturadas.'),
(15, 1, 4, '2025-08-01', 'Insomnio Primario', 'Higiene del sueño, evitar pantallas antes de dormir.'),
(16, 1, 5, '2025-08-11', 'Otitis Media Aguda', 'Evitar ingreso de agua a los oídos.'),
(17, 1, 2, '2025-08-25', 'Esguince de Tobillo Grado I', 'Aplicar hielo local y vendaje compresivo.'),
(18, 1, 1, '2025-09-02', 'Síndrome de Intestino Irritable', 'Evitar leguminosas y bebidas carbonatadas.'),
(19, 1, 3, '2025-09-15', 'Colitis Nerviosa', 'Manejo del estrés y dieta rica en fibra.'),
(20, 1, 4, '2025-10-01', 'Infección Urinaria no Complicada', 'Tomar al menos 2.5 litros de agua al día.')
ON DUPLICATE KEY UPDATE 
    diagnostico = VALUES(diagnostico), 
    indicaciones = VALUES(indicaciones);
    
SELECT * FROM recetas;