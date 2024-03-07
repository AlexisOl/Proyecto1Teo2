CREATE DATABASE IF NOT EXISTS 'ecommercegt';
USE ecommercegt;


--- tablas-----
--- tabla de rol
CREATE TABLE rol(
    id INT NOT NULL AUTO_INCREMENT,
    tipoRol varchar(20) NOT NULL,
    PRIMARY KEY (id)
);

--- tabla de usuarios
CREATE TABLE usuario(
    id INT NOT NULL AUTO_INCREMENT, 
    user varchar(75) NOT NULL, 
    password varchar(200) NOT NULL,
    idRol int NOT NULL,
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


------ script de incersion
--- para rol
INSERT INTO rol (tipoRol) values("Administrador"),("Usuario");
---- para usuarios
INSERT INTO usuario (user, password, idRol) values("juan123", "hola123", 1),("Usuario", "simon", 2),("pepito99", "adios", 2);