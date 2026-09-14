use bdi_database;
INSERT INTO medicamentos (id_usuario, nombre_comercial, sustancia_activa, dosis, formato, cantidad_disponible, fecha_caducidad, instrucciones_uso) 
VALUES 
-- Botiquín Usuario 1 (ID 1)
(1, 'Aspirina', 'Ácido acetilsalicílico', '500mg', 'Tabletas', 20, '2027-05-15', 'Tomar una tableta en caso de cefalea.'),
(1, 'Tylenol', 'Paracetamol', '500mg', 'Tabletas', 50, '2028-01-10', 'Tomar cada 8 horas para fiebre.'),
(1, 'Advil', 'Ibuprofeno', '400mg', 'Cápsulas', 15, '2026-11-20', 'Para dolores musculares o inflamación.'),
(1, 'Pepto-Bismol', 'Subsalicilato de bismuto', '262mg', 'Suspensión', 1, '2026-09-05', 'Tomar 30ml cada media hora en caso de malestar estomacal.'),
(1, 'Omeprazol', 'Omeprazol', '20mg', 'Cápsulas', 14, '2027-03-30', 'Una cápsula en ayunas para acidez.'),
(1, 'Buscapina', 'Hioscina', '10mg', 'Grageas', 10, '2026-12-01', 'Tomar una gragea para cólicos abdominales.'),
(1, 'Dramamine', 'Dimenhidrinato', '50mg', 'Tabletas', 8, '2027-08-14', 'Una tableta 30 min antes de viajar para el mareo.'),
(1, 'Claritin', 'Loratadina', '10mg', 'Tabletas', 20, '2028-02-28', 'Una tableta al día para alergias o flujo nasal.'),
(1, 'Bisolvon', 'Ambroxol', '30mg/5ml', 'Jarabe', 1, '2026-10-10', 'Tomar 10ml cada 8 horas para la tos con flema.'),
(1, 'Suero Oral', 'Electrolitos', '500ml', 'Líquido', 3, '2026-08-30', 'Tomar a libre demanda en caso de deshidratación o diarrea.'),
(1, 'Voltaren', 'Diclofenaco', '100mg', 'Tabletas', 12, '2027-06-25', 'Para dolor articular fuerte.'),
(1, 'Amoxicilina', 'Amoxicilina', '500mg', 'Cápsulas', 0, '2025-12-30', 'Antibiótico. Requiere receta. (Inventario en 0 para probar alertas).'),
(1, 'Vitacilina', 'Retinol / Neomicina', '28g', 'Ungüento', 1, '2028-05-05', 'Aplicar sobre raspaduras o quemaduras leves.'),
(1, 'Tums', 'Carbonato de calcio', '500mg', 'Tabletas masticables', 40, '2029-01-01', 'Masticar de 1 a 2 tabletas cuando haya pirosis.'),
(1, 'Flanax', 'Naproxeno', '550mg', 'Tabletas', 10, '2027-04-12', 'Para dolores intensos o desinflamar.');