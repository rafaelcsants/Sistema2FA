create database mfa;
use mfa;

create table pessoa (pessoa_id int not null auto_increment,
					 pessoa_nome varchar(60) not null,
					 pessoa_email varchar(30) not null,
                     pessoa_pass varchar(30) not null,
					 pessoa_secret varchar(200) UNIQUE,
					 pessoa_token varchar (200),
					 primary key (pessoa_id));
  
