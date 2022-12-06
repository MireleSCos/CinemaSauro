import cinema from '../../assets/cinema.jpg';
import { Button } from '../Button';

import './style.css';
import { useEffect, useState } from 'react';

export interface Filme {
  id: number;
  nome: String;
  censura: number;
  duracao: number;
  categoria: String;
  empresa: String;
  isnacional: Boolean;
  isestreia: Boolean;
  atores: Array<String>;
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
              <h3>{filme.atores.join(', ')}</h3>
            </div>
            {filme.isestreia && <p className="text-is-estreia">Estreia</p>}
          </footer>
        </div>
        <div className="bio">
          <p>Censura: {filme.censura}</p>
          <p>Categora: {filme.categoria}</p>
          <p>Duração: {filme.duracao}</p>
          <p>Empresa: {filme.empresa}</p>
          {filme.isnacional && <p>Nacional</p>}
        </div>
      </div>
      <div id="submit">
        <div id="content-submit">
          <div>
            <p>
              {/* Preço */}
              {/*  <span className="valor">R$ 20,00</span> */}
            </p>
          </div>

          <button
            className="btn-comprar"
            onClick={e => {
              fcompra(filme);
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
