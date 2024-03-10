CREATE DATABASE IF NOT EXISTS 'ecommercegt';
USE ecommercegt;


--- tablas-----
--- tabla de rol LISTO
CREATE TABLE rol(
    id INT NOT NULL AUTO_INCREMENT,
    tipoRol varchar(20) NOT NULL,
    PRIMARY KEY (id)
);

--- tabla de usuarios LISTO
CREATE TABLE usuario(
    id INT NOT NULL AUTO_INCREMENT, 
    user varchar(75) NOT NULL, 
    password varchar(200) NOT NULL,
    idRol int NOT NULL,
    contacto varchar(300),
    cantidad_monedas decimal not null,
    PRIMARY KEY(id)
    
);

--- ingresod de forma unica
ALTER TABLE usuario
ADD UNIQUE KEY `userUnico`(`user`);

----ingreso de llaves foraneas

ALTER TABLE usuario
ADD KEY `fk_idRol` (`idRol`);


ALTER TABLE usuario
  ADD CONSTRAINT `fk_ID_ROL_union` FOREIGN KEY (`idRol`) REFERENCES rol (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


----------------------------
------------
--- para las ventas
----------------------------
----crecion de categoria LISTO
--- en categoria que si se permita el uso de todas
CREATE TABLE categoria(
  id int not null AUTO_INCREMENT,
  nombre varchar(200) not null,
  PRIMARY KEY(id)
);

ALTER TABLE categoria 
  ADD UNIQUE key  `nombreunico` (`nombre`);
-- Creación de la tabla producto
CREATE TABLE producto (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    descripcion VARCHAR(1500),
    imagen VARCHAR(1000),
    precio DECIMAL NOT NULL,
    identificador_usuario INT NOT NULL,
    identificador_categoria INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (identificador_usuario) REFERENCES usuario(id),
    FOREIGN KEY (identificador_categoria) REFERENCES categoria(id)
);

-- Creación de la tabla publicacion
CREATE TABLE publicacion (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(300) NOT NULL,
    fecha DATE NOT NULL,
    descripcion VARCHAR(3000),
    identificador_usuario INT NOT NULL,
    identificador_producto INT NOT NULL,
    estado VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (identificador_usuario) REFERENCES usuario(id),
    FOREIGN KEY (identificador_producto) REFERENCES producto(id)
);


----------------------
----------------------
----------------------
----------------------
------ script de incersion
--- para rol
INSERT INTO rol (tipoRol) values("Administrador"),("Usuario");
---- para usuarios
INSERT INTO usuario (user, password, idRol) values("juan123", "hola123", 1),("Usuario", "simon", 2),("pepito99", "adios", 2);