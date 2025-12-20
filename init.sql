drop database if exists PeriferiaSocial;

create database PeriferiaSocial;

CREATE TABLE Roles(
    id SERIAL PRIMARY KEY,
    name varchar(250)  NOT NULL,
    created timestamp default current_timestamp,
    updated timestamp default current_timestamp
);

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    email varchar(250) UNIQUE NOT NULL,
    phone varchar(20) NOT NULL,
    role_id int NOT NULL,
    created timestamp default current_timestamp,
    updated timestamp default current_timestamp
);

ALTER TABLE Users ADD CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES Roles(id);

INSERT INTO Roles(name)
VALUES('EMPLOYEE'),
      ('CUSTOMER'),
      ('ADMIN');
