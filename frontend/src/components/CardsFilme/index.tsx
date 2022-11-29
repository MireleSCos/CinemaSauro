import { Link } from 'react-router-dom';
import cinema from '../../assets/cinema.jpg';
import editImg from '../../assets/edit.svg';

import './style.css';
import { useEffect, useState } from 'react';

export interface Filme {
  id_filme: number;
  nome: String;
  is_nacional: boolean;
  atores_principais: String;
  censura: number;
  categoria: String;
  is_estreia: boolean;
  duracao: number;
  empresa: String;
}

interface FilmeItemProps {
  filme: Filme;
}

export function CardsFilmes({ filme }: FilmeItemProps) {
  return (
    <div id="content">
      <div id="profissional-content">
        <div className="profissional-datas">
          <footer>
            <img src={cinema} alt="Profissional" />
            <div>
              <h2>{filme.nome}</h2>
              <h3>{filme.atores_principais}</h3>
            </div>
          </footer>
          {/* <div className="actions">
            <Link to={`/professional/edit/${filme.id_filme}`}>
              <img src={editImg} alt="Editar" />
            </Link>
          </div> */}
        </div>
        <div className="bio">
          <p>Censura: {filme.censura}</p>
          <p>Categora: {filme.categoria}</p>
          <p>Duração: {filme.duracao}</p>
          <p>empresa: {filme.empresa}</p>
        </div>
      </div>
    </div>
  );
}
