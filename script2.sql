-- ============================================================
--  DATOS INICIALES - Botica Nova Salud
-- ============================================================

-- Las tablas tipo_comprobante, presentacion, unidad_venta,
-- categoria y cargo ya tienen datos del script anterior.
-- Solo agregamos los que faltan.

-- ------------------------------------------------------------
-- LABORATORIO
-- ------------------------------------------------------------
INSERT INTO laboratorio (nombre, pais, telefono, email, activo) VALUES
('Abbott',            'Estados Unidos', '01-4521100', 'contacto@abbott.com.pe',    1),
('Hersil',            'Perú',           '01-3190000', 'ventas@hersil.com.pe',       1),
('Portugal',          'Perú',           '01-3610000', 'info@portugal.com.pe',       1),
('Pharma',            'Perú',           '01-2250000', 'contacto@pharma.com.pe',     1),
('Bayer',             'Alemania',       '01-6280000', 'info@bayer.com.pe',          1),
('GlaxoSmithKline',   'Reino Unido',    '01-6370000', 'contacto@gsk.com.pe',        1);

-- ------------------------------------------------------------
-- EMPLEADO (cargo_id: 1=Administrador, 2=Farmacéutico, 3=Cajero)
-- Contraseña: "admin123" y "empleado123" — en producción van hasheadas
-- ------------------------------------------------------------
INSERT INTO empleado (nombre, apellido, dni, email, telefono, cargo_id, contrasena, activo) VALUES
('Carlos',   'Quispe Ramos',    '45231876', 'carlos.quispe@novasalud.pe',   '987654321', 1, '$2b$10$adminhasheado123xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 1),
('María',    'Huanca Torres',   '73821456', 'maria.huanca@novasalud.pe',    '976543210', 2, '$2b$10$empleadohasheado123xxxxxxxxxxxxxxxxxxxxxxxxx', 1);

-- ------------------------------------------------------------
-- CLIENTE (algunos clientes base)
-- ------------------------------------------------------------
INSERT INTO cliente (nombre, apellido, dni, ruc, telefono, email, direccion) VALUES
('Juan',      'Pérez López',      '12345678', NULL,          '987111222', 'juan.perez@gmail.com',      'Av. Arequipa 123, Lima'),
('Ana',       'Flores Mamani',    '87654321', NULL,          '976222333', 'ana.flores@gmail.com',       'Jr. Cusco 456, Lima'),
('Farmacia',  'San Juan S.A.C.',  NULL,       '20512345678', '014445566', 'compras@sanjuan.com.pe',    'Av. Brasil 789, Lima');

-- ------------------------------------------------------------
-- MEDICAMENTO
-- (laboratorio: 1=Abbott 2=Hersil 3=Portugal 4=Pharma 5=Bayer 6=GSK)
-- (categoria:   1=Antibióticos 2=Cuidado Personal 3=Analgésicos 4=Antiinflamatorios 5=Vitaminas)
-- (presentacion:1=Pastilla 2=Jarabe 3=Inyectable 4=Crema 5=Cápsula 6=Solución)
-- ------------------------------------------------------------
INSERT INTO medicamento (nombre, principio_activo, descripcion, laboratorio_id, categoria_id, presentacion_id, activo) VALUES
('Amoxicilina 500mg',      'Amoxicilina',        'Antibiótico de amplio espectro',           2, 1, 5, 1),
('Azitromicina 500mg',     'Azitromicina',       'Antibiótico para infecciones respiratorias',1, 1, 1, 1),
('Paracetamol 500mg',      'Paracetamol',        'Analgésico y antipirético',                 3, 3, 1, 1),
('Ibuprofeno 400mg',       'Ibuprofeno',         'Antiinflamatorio y analgésico',             4, 4, 1, 1),
('Vitamina C 1g',          'Ácido Ascórbico',    'Suplemento vitamínico',                     5, 5, 1, 1),
('Amoxicilina Jarabe',     'Amoxicilina',        'Antibiótico en suspensión para niños',      2, 1, 2, 1),
('Loratadina 10mg',        'Loratadina',         'Antihistamínico para alergias',             1, 3, 1, 1),
('Omeprazol 20mg',         'Omeprazol',          'Protector gástrico',                        6, 3, 5, 1),
('Crema Hidratante',       'Glicerina',          'Hidratante para piel seca',                 5, 2, 4, 1),
('Complejo B',             'Vitaminas del grupo B','Suplemento vitamínico complejo',           3, 5, 1, 1);

-- ------------------------------------------------------------
-- MEDICAMENTO_PRECIO
-- (unidad_venta: 1=Unidad 2=Blíster 3=Caja 4=Frasco 5=Ampolla)
-- ------------------------------------------------------------
INSERT INTO medicamento_precio (medicamento_id, unidad_venta_id, precio, stock) VALUES
-- Amoxicilina 500mg
(1, 1, 1.50,  200),
(1, 2, 15.00,  50),
(1, 3, 45.00,  20),
-- Azitromicina 500mg
(2, 1, 3.50,  150),
(2, 2, 18.00,  40),
-- Paracetamol 500mg
(3, 1, 0.50,  500),
(3, 2, 5.00,  100),
(3, 3, 12.00,  30),
-- Ibuprofeno 400mg
(4, 1, 0.80,  400),
(4, 2, 7.50,   80),
(4, 3, 18.00,  25),
-- Vitamina C 1g
(5, 1, 1.20,  300),
(5, 3, 22.00,  15),
-- Amoxicilina Jarabe
(6, 4, 18.50,  60),
-- Loratadina 10mg
(7, 1, 1.00,  250),
(7, 2, 9.00,   70),
-- Omeprazol 20mg
(8, 1, 1.80,  180),
(8, 2, 16.00,  45),
-- Crema Hidratante
(9, 4, 25.00,  35),
-- Complejo B
(10, 1, 0.90, 220),
(10, 3, 16.00,  30);