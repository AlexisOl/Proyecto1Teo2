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

--* ESTADO
-- Creación de la tabla publicacion
CREATE TABLE estado (
    id INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(300) NOT NULL,
    PRIMARY KEY (id)
);

--*publicacion
CREATE TABLE publicacion (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(300) NOT NULL,
    fecha DATE NOT NULL,
    descripcion VARCHAR(3000),
    identificador_usuario INT(11) NOT NULL,
    identificador_producto INT(11) NOT NULL,
    estado int(2) NOT NULL,
    FOREIGN KEY (identificador_usuario) REFERENCES usuario(id),
    FOREIGN KEY (identificador_producto) REFERENCES producto(id),
    FOREIGN KEY (estado) REFERENCES estado(id)

);

--*articulos por publicacion
---tabla de publicacion y productos en esta
CREATE TABLE articulosporPublicacion (
    id INT NOT NULL AUTO_INCREMENT,
    cantidadProducto int NOT NULL,
    precioProducto decimal NOT NULL,
    identificador_publicacion INT NOT NULL,
    --! quita este 
    identificador_producto INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (identificador_publicacion) REFERENCES publicacion(id),
    FOREIGN KEY (identificador_producto) REFERENCES producto(id)
);

--*comentarios 
  CREATE TABLE comentarios(
    id INT NOT NULL AUTO_INCREMENT,
    fecha DATE NOT NULL,
    mensaje varchar(3000) NOT NULL,
    id_publicacion INT NOT NULL,
    id_usuarioPregunta INT NOT NULL,
    respuestaUsuarioOriginal boolean NOT null,
    PRIMARY KEY(id),
    FOREIGN KEY (id_publicacion) REFERENCES publicacion(id),
    FOREIGN KEY (id_usuarioPregunta) REFERENCES usuario(id)
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


insert into estado (tipo) values ('En espera'), ('Cancelado'), ('Vendido'), ('En venta'), ('Reportado');