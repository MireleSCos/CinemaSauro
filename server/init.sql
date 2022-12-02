CREATE DATABASE cinemasauro;

\c cinemasauro

CREATE TABLE filme (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(60) NOT NULL,
  censura INTEGER NOT NULL,
  duracao INTEGER NOT NULL,
  categoria VARCHAR(30) NOT NULL,
  empresa VARCHAR(20) NOT NULL,
  isNacional BOOLEAN NOT NULL,
  isEstreia BOOLEAN DEFAULT false
);

INSERT INTO
    filme (nome, censura, duracao, categoria, empresa, isNacional, isEstreia)
VALUES
    ('Pantera Negra: Wakanda Para Sempre',14,161,'Ação/Aventura','Marvel Studios',false,true), 
    ('Vingadores: Ultimato',12,182,'Ação/Ficção científica','Marvel Studios',false,false), 
    ('Minha Mãe é Uma Peça',12,84,'Comédia','Telecine Productions',true,false);
