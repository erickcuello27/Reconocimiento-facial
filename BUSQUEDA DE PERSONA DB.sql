create database busqueda_persona;
use busqueda_persona ;
create table  usuario (
idusuario int not null auto_increment,
nombre varchar (25) not null,
email varchar (255) not null,
password varchar (48) not null,
fecha_registro datetime not null,
primary key (idusuario)
) engine= InnoDB;


