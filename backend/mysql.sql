-- CREACIÓN DE LA TABLA "TIPO_USUARIO"
CREATE TABLE tipo_usuario (
    id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- CREACIÓN DE LA TABLA "USUARIO"
CREATE TABLE usuario (
    correo VARCHAR(100) PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    id_tipo_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario)
);

-- CREACIÓN DE LA TABLA "DIRECCION"
CREATE TABLE direccion (
    id_direccion INT AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR(255) NOT NULL,
    correo_usuario VARCHAR(100) NOT NULL,
    FOREIGN KEY (correo_usuario) REFERENCES usuario(correo)
);

-- CREACIÓN DE LA TABLA "CARRO"
CREATE TABLE carro (
    id_carro INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10, 2) DEFAULT 0,
    estatus ENUM('activo', 'inactivo') DEFAULT 'activo',
    correo_usuario VARCHAR(100) NOT NULL,
    FOREIGN KEY (correo_usuario) REFERENCES usuario(correo)
);

-- CREACIÓN DE LA TABLA "PRODUCTO"
CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    precio_m2 INT NOT NULL,
    ancho DECIMAL(10, 2) NOT NULL,
    alto DECIMAL(10, 2) NOT NULL,
    espesor DECIMAL(10, 2) NOT NULL,
    peso_m2 DECIMAL(10, 2) NOT NULL,
    foto VARCHAR(255)
);

-- CREACIÓN DE LA TABLA "CARRO_PROD"
CREATE TABLE carro_prod (
    id_carro_prod INT AUTO_INCREMENT PRIMARY KEY,
    id_carro INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    subtotal INT NOT NULL,
    FOREIGN KEY (id_carro) REFERENCES carro(id_carro),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- CREACIÓN DE LA TABLA "CONTACTO"
CREATE TABLE contacto (
    id_contact INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    asunto VARCHAR(255) NOT NULL
);
