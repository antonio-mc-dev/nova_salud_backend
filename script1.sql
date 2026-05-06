-- ============================================================
--  BASE DE DATOS: Botica Nova Salud
--  Compatible con: MySQL 8+ / PostgreSQL 14+
-- ============================================================

CREATE DATABASE IF NOT EXISTS nova_salud
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nova_salud;

-- ------------------------------------------------------------
-- LABORATORIO
-- Fabricante del medicamento (Pharma, Hersil, Abbott, etc.)
-- ------------------------------------------------------------
CREATE TABLE laboratorio (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(100)    NOT NULL,
    pais        VARCHAR(60)     NOT NULL,
    telefono    VARCHAR(20),
    email       VARCHAR(100),
    activo      TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- CATEGORIA
-- Grupo terapéutico (Antibióticos, Cuidado Personal, etc.)
-- ------------------------------------------------------------
CREATE TABLE categoria (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(80)     NOT NULL,
    descripcion VARCHAR(255),
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- PRESENTACION
-- Forma farmacéutica (Pastilla, Jarabe, Inyectable, etc.)
-- ------------------------------------------------------------
CREATE TABLE presentacion (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(60)     NOT NULL,
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- UNIDAD_VENTA
-- Cómo se vende al cliente (Unidad, Blíster, Caja, etc.)
-- ------------------------------------------------------------
CREATE TABLE unidad_venta (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(60)     NOT NULL,
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- MEDICAMENTO
-- ------------------------------------------------------------
CREATE TABLE medicamento (
    id              INT             NOT NULL AUTO_INCREMENT,
    nombre          VARCHAR(150)    NOT NULL,
    principio_activo VARCHAR(150),
    descripcion     VARCHAR(500),
    laboratorio_id  INT             NOT NULL,
    categoria_id    INT             NOT NULL,
    presentacion_id INT             NOT NULL,
    activo          TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT fk_med_laboratorio  FOREIGN KEY (laboratorio_id)  REFERENCES laboratorio (id),
    CONSTRAINT fk_med_categoria    FOREIGN KEY (categoria_id)    REFERENCES categoria   (id),
    CONSTRAINT fk_med_presentacion FOREIGN KEY (presentacion_id) REFERENCES presentacion(id)
);

-- ------------------------------------------------------------
-- MEDICAMENTO_PRECIO
-- Precio y stock por unidad de venta
-- Un medicamento puede venderse en varias presentaciones de
-- venta (ej: unitario S/1.50, blíster S/12.00, caja S/45.00)
-- ------------------------------------------------------------
CREATE TABLE medicamento_precio (
    id              INT             NOT NULL AUTO_INCREMENT,
    medicamento_id  INT             NOT NULL,
    unidad_venta_id INT             NOT NULL,
    precio          DECIMAL(10,2)   NOT NULL,
    stock           INT             NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_precio_medicamento  FOREIGN KEY (medicamento_id)  REFERENCES medicamento  (id),
    CONSTRAINT fk_precio_unidad_venta FOREIGN KEY (unidad_venta_id) REFERENCES unidad_venta (id),
    CONSTRAINT uq_med_unidad UNIQUE (medicamento_id, unidad_venta_id)
);

-- ------------------------------------------------------------
-- CARGO
-- Puesto del empleado (Cajero, Farmacéutico, Administrador)
-- ------------------------------------------------------------
CREATE TABLE cargo (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(80)     NOT NULL,
    descripcion VARCHAR(255),
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- EMPLEADO
-- Usuario del sistema que emite comprobantes
-- ------------------------------------------------------------
CREATE TABLE empleado (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(80)     NOT NULL,
    apellido    VARCHAR(80)     NOT NULL,
    dni         VARCHAR(15)     NOT NULL,
    email       VARCHAR(100)    NOT NULL,
    telefono    VARCHAR(20),
    cargo_id    INT             NOT NULL,
    contrasena  VARCHAR(255)    NOT NULL,
    activo      TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT fk_emp_cargo FOREIGN KEY (cargo_id) REFERENCES cargo (id),
    CONSTRAINT uq_empleado_dni   UNIQUE (dni),
    CONSTRAINT uq_empleado_email UNIQUE (email)
);

-- ------------------------------------------------------------
-- CLIENTE
-- ------------------------------------------------------------
CREATE TABLE cliente (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(80)     NOT NULL,
    apellido    VARCHAR(80)     NOT NULL,
    dni         VARCHAR(15),
    ruc         VARCHAR(15),
    telefono    VARCHAR(20),
    email       VARCHAR(100),
    direccion   VARCHAR(255),
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- TIPO_COMPROBANTE
-- Boleta o Factura
-- ------------------------------------------------------------
CREATE TABLE tipo_comprobante (
    id          INT             NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(30)     NOT NULL,   -- 'Boleta' | 'Factura'
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- COMPROBANTE
-- Cabecera del comprobante de pago (venta)
-- ------------------------------------------------------------
CREATE TABLE comprobante (
    id                  INT             NOT NULL AUTO_INCREMENT,
    serie               VARCHAR(10)     NOT NULL,   -- ej: B001, F001
    numero              INT             NOT NULL,   -- correlativo
    tipo_comprobante_id INT             NOT NULL,
    cliente_id          INT             NOT NULL,
    empleado_id         INT             NOT NULL,
    fecha               DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    igv                 DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    total               DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    PRIMARY KEY (id),
    CONSTRAINT fk_comp_tipo_comprobante FOREIGN KEY (tipo_comprobante_id) REFERENCES tipo_comprobante (id),
    CONSTRAINT fk_comp_cliente          FOREIGN KEY (cliente_id)          REFERENCES cliente          (id),
    CONSTRAINT fk_comp_empleado         FOREIGN KEY (empleado_id)         REFERENCES empleado         (id),
    CONSTRAINT uq_comprobante UNIQUE (serie, numero)
);

-- ------------------------------------------------------------
-- DETALLE_VENTA
-- Líneas del comprobante (qué se vendió, cuánto, a qué precio)
-- ------------------------------------------------------------
CREATE TABLE detalle_venta (
    id                      INT             NOT NULL AUTO_INCREMENT,
    comprobante_id          INT             NOT NULL,
    medicamento_precio_id   INT             NOT NULL,
    cantidad                INT             NOT NULL,
    precio_unitario         DECIMAL(10,2)   NOT NULL,
    subtotal                DECIMAL(10,2)   NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_det_comprobante        FOREIGN KEY (comprobante_id)        REFERENCES comprobante       (id),
    CONSTRAINT fk_det_medicamento_precio FOREIGN KEY (medicamento_precio_id) REFERENCES medicamento_precio(id)
);

-- ============================================================
--  DATOS INICIALES
-- ============================================================

INSERT INTO tipo_comprobante (nombre) VALUES ('Boleta'), ('Factura');

INSERT INTO presentacion (nombre) VALUES ('Pastilla'), ('Jarabe'), ('Inyectable'), ('Crema'), ('Cápsula'), ('Solución');

INSERT INTO unidad_venta (nombre) VALUES ('Unidad'), ('Blíster'), ('Caja'), ('Frasco'), ('Ampolla');

INSERT INTO categoria (nombre, descripcion) VALUES
    ('Antibióticos',    'Medicamentos para combatir infecciones bacterianas'),
    ('Cuidado Personal','Productos de higiene y cuidado corporal'),
    ('Analgésicos',     'Medicamentos para el dolor'),
    ('Antiinflamatorios','Medicamentos para reducir inflamación'),
    ('Vitaminas',       'Suplementos vitamínicos y minerales');

INSERT INTO cargo (nombre) VALUES ('Administrador'), ('Farmacéutico'), ('Cajero');