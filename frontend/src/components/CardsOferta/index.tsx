import cinema from '../../assets/cinema.jpg';
import { Button } from '../Button';

import './style.css';
import { useEffect, useState } from 'react';

export interface Oferta {
  id_oferta: number;
  name: String;
  valor: String;
}

interface OfertaItemProps {
  oferta: Oferta;
}

export function CardsOferta({ oferta }: OfertaItemProps) {
  return (
    <div id="content">
      <div id="profissional-content">
        <div className="profissional-datas">
          <footer>
            <img src={cinema} alt="Profissional" />
            <div>
              <h2>{oferta.name}</h2>
            </div>
          </footer>
        </div>
      </div>
      <div id="submit">
        <div id="content-submit">
          <div>
            <p>
              Preço
              <span className="valor">R$ {oferta.valor}</span>
            </p>
          </div>

          <button className="btn-comprar">Selecionar oferta</button>
        </div>
      </div>
    </div>
  );
}
