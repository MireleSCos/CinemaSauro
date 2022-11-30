import cinema from '../../assets/cinema.jpg';
import { Button } from '../Button';

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
  fcompra: Function;
}

export function CardsFilmes({ filme, fcompra }: FilmeItemProps) {
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
        </div>
        <div className="bio">
          <p>Censura: {filme.censura}</p>
          <p>Categora: {filme.categoria}</p>
          <p>Duração: {filme.duracao}</p>
          <p>empresa: {filme.empresa}</p>
        </div>
      </div>
      <div id="submit">
        <div id="content-submit">
          <div>
            <p>
              Preço
              <span className="valor">R$ 20,00</span>
            </p>
          </div>

          <button
            className="btn-comprar"
            onClick={e => {
              fcompra(filme.id_filme);
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
