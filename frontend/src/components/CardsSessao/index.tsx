import cinema from '../../assets/cinema.jpg';
import { Button } from '../Button';

import './style.css';
import { useEffect, useState } from 'react';

export interface Sessao {
  id_sessao: number;
  sala: String;
  filme: String;
  atoresPrincipais: String;
  dataInicio: String;
  horario: String;
}

interface SessaoItemProps {
  sessao: Sessao;
  fcompra: Function;
}

export function CardSessao({ sessao, fcompra }: SessaoItemProps) {
  return (
    <div id="content">
      <div id="profissional-content">
        <div className="profissional-datas">
          <footer>
            <img src={cinema} alt="Profissional" />
            <div>
              <h2>{sessao.filme}</h2>
              <h3>{sessao.atoresPrincipais}</h3>
            </div>
          </footer>
        </div>
        <div className="bio">
          <p>Sala: {sessao.sala}</p>
          <p>Horario: {sessao.horario}</p>
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
              fcompra(sessao.id_sessao);
            }}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
