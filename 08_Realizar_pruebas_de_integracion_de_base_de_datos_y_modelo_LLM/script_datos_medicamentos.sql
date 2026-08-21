-- DATOS PARA LA TABLA MEDICAMENTOS VINCULADAS A LAS RECETAS Y A id_usuario = 1
USE bdi_database;

INSERT INTO medicamentos (id_medicamento, id_usuario, id_receta, nombre_comercial, sustancia_activa, dosis, formato, cantidad_disponible, fecha_caducidad, instrucciones_uso) VALUES
(1, 1, 1, 'Wilvit', 'Polivitamínico', NULL, 'Cápsulas', 30, NULL, '1 en el desayuno'),
(2, 1, 1, 'Amoxil', 'Amoxicilina', '500 mg', 'Cápsulas', 15, '2026-12-31', '1 cápsula cada 8 horas por 7 días'),
(3, 1, 2, 'Paracetamol Tecno', 'Paracetamol', '500 mg', 'Tabletas', 20, '2026-06-30', '1 tableta cada 8 horas si hay dolor o fiebre'),
(4, 1, 2, 'Sensibit', 'Loratadina', '10 mg', 'Tabletas', 10, '2027-01-15', '1 tableta diaria por las noches'),
(5, 1, 3, 'Omeprazol Med', 'Omeprazol', '20 mg', 'Cápsulas', 14, '2026-08-20', '1 cápsula en ayunas durante 14 días'),
(6, 1, 3, 'Gelcaps Antiácido', 'Hidróxido de Aluminio y Magnesio', '200 ml', 'Suspensión', 1, '2025-11-30', '10 ml después de los alimentos'),
(7, 1, 4, 'Losartán', 'Losartán Potásico', '50 mg', 'Comprimidos', 30, '2027-05-10', '1 comprimido cada 24 horas por la mañana'),
(8, 1, 4, 'Amlodipino', 'Amlodipino', '5 mg', 'Tabletas', 30, '2026-10-15', '1 tableta por la mañana'),
(9, 1, 5, 'Bedoyecta Tri', 'Complejo B', '5000 mcg', 'Solución Inyectable', 3, '2026-04-18', '1 ampolleta intramuscular cada 3 días'),
(10, 1, 5, 'Cortidex', 'Hidrocortisona', '1%', 'Crema', 1, '2026-09-01', 'Aplicar capa delgada en zona afectada cada 12 horas'),
(11, 1, 6, 'Bisolvon', 'Bromhexina', '8 mg / 5 ml', 'Jarabe', 1, '2025-12-01', '5 ml cada 8 horas por 5 días'),
(12, 1, 6, 'Azitromicina Genfar', 'Azitromicina', '500 mg', 'Tabletas', 3, '2026-11-20', '1 tableta diaria por 3 días'),
(13, 1, 7, 'Voltaren', 'Diclofenaco', '100 mg', 'Grageas de Liberación Prolongada', 10, '2027-03-30', '1 gragea cada 12 horas con alimentos'),
(14, 1, 7, 'Dorixina Relax', 'Clonixinato de Lisina / Ciclobenzaprina', '125 mg / 5 mg', 'Comprimidos', 10, '2026-07-14', '1 comprimido cada 8 horas'),
(15, 1, 8, 'Penamox', 'Amoxicilina / Ácido Clavulánico', '875 mg / 125 mg', 'Tabletas', 14, '2026-05-25', '1 tableta cada 12 horas por 7 días'),
(16, 1, 8, 'Ketanov', 'Ketorolaco', '10 mg', 'Tabletas Sublinguales', 10, '2026-09-12', '1 tableta sublingual en caso de dolor intenso'),
(17, 1, 9, 'Dimefor', 'Metformina', '850 mg', 'Tabletas', 60, '2027-08-01', '1 tableta con la comida principal'),
(18, 1, 10, 'Patanol', 'Olopatadina', '0.1%', 'Solución Oftálmica', 1, '2026-02-28', '1 gota en cada ojo cada 12 horas'),
(19, 1, 11, 'Tylenol', 'Paracetamol', '650 mg', 'Tabletas', 24, '2027-04-15', '1 tableta cada 8 horas si persiste el dolor de cabeza'),
(20, 1, 12, 'Electrolit', 'Electrolitos Orales', '625 ml', 'Solución Oral', 4, '2026-01-30', 'Tomar a libre demanda para rehidratación'),
(21, 1, 12, 'Smecta', 'Diosmectita', '3 g', 'Polvo para Suspensión', 10, '2026-08-10', '1 sobre disuelto en medio vaso de agua cada 8 horas'),
(22, 1, 13, 'Afrin', 'Oximetazolina', '0.05%', 'Spray Nasal', 1, '2025-10-20', '2 aplicaciones en cada fosa nasal cada 12 horas máximo por 3 días'),
(23, 1, 14, 'Lipitor', 'Atorvastatina', '20 mg', 'Tabletas', 30, '2027-09-05', '1 tableta por la noche'),
(24, 1, 15, 'Stilnox', 'Zolpidem', '10 mg', 'Tabletas', 10, '2026-11-11', '1 tableta 20 minutos antes de acostarse'),
(25, 1, 16, 'Otoseptil', 'Neomicina / Polimixina B', '15 ml', 'Gotas Óticas', 1, '2026-04-05', '3 gotas en odo afectado cada 8 horas'),
(26, 1, 17, 'Fastum Gel', 'Ketoprofeno', '2.5%', 'Gel', 1, '2027-02-14', 'Aplicar suavemente en el tobillo cada 8 horas'),
(27, 1, 18, 'Librax', 'Clordiazepóxido / Clidinio', '5 mg / 2.5 mg', 'Grageas', 20, '2026-07-20', '1 gragea antes de las comidas'),
(28, 1, 19, 'Planticin', 'Psyllium Plantago', '400 g', 'Polvo', 1, '2027-06-30', '1 cucharada disuelta en agua por las mañanas'),
(29, 1, 20, 'Macrodantina', 'Nitrofurantoína', '100 mg', 'Cápsulas', 20, '2026-10-01', '1 cápsula cada 6 horas por 7 días'),
(30, 1, 20, 'Uroclasasio', 'Citrato de Potasio', '10 meq', 'Tabletas', 30, '2027-01-20', '1 tableta después de la comida')
ON DUPLICATE KEY UPDATE 
    nombre_comercial = VALUES(nombre_comercial),
    instrucciones_uso = VALUES(instrucciones_uso);

SELECT * FROM medicamentos;