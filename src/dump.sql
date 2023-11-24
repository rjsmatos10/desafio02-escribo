CREATE DATABASE desafio02escribo

drop table if exists usuarios;


CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  telefones TEXT NOT NULL,
  data_criacao timestamp DEFAULT now(), 
  data_atualizacao timestamp DEFAULT now(),
  ultimo_login timestamp
);