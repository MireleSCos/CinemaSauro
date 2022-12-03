import cinema from '../../assets/cinema.jpg';
import { Button } from '../Button';

import './style.css';
import { useEffect, useState } from 'react';
import { Filme } from '../CardsFilme';

export interface Sessao {
  id: number;
  filmeid: number;
  salaid: number;
  data: Date;
  hora: String;
  valor: number;
}

interface SessaoItemProps {
  sessao: Sessao;
  filme: Filme;
  fcompra: Function;
}

export function CardSessao({ sessao, filme, fcompra }: SessaoItemProps) {
  return (
    <div id="content">
      <div id="profissional-content">
        <div className="profissional-datas">
          <footer>
            <img src={cinema} alt="Profissional" />
            <div>
              <h2>{filme.nome}</h2>
              <h3>Sala {sessao.salaid}</h3>
            </div>
          </footer>
        </div>
        <div className="bio">
          <p>Data: {sessao.data}</p>
          <p>Horario: {sessao.hora}</p>
        </div>
      </div>
      <div id="submit">
        <div id="content-submit">
          <div>
            <p>
              Preço
              <span className="valor">R$ {sessao.valor}</span>
            </p>
          </div>

          <button
            className="btn-comprar"
            onClick={e => {
              fcompra(sessao);
            }}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
