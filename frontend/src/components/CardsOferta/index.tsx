import cinema from '../../assets/cinema.jpg';
import { Button } from '../Button';

import './style.css';
import { useEffect, useState } from 'react';

export interface Oferta {
  id: number;
  nome: String;
  valor: number;
}

interface OfertaItemProps {
  oferta: Oferta;
  fcompra: Function;
}

export function CardsOferta({ oferta, fcompra }: OfertaItemProps) {
  const [toogle, setToogle] = useState(true);
  const [cor, setCor] = useState('#c3c3c3');

  useEffect(() => {
    setCor(state => (toogle ? '#c3c3c3' : '#04d361'));
  }, [toogle]);

  return (
    <div id="content">
      <div id="profissional-content">
        <div className="profissional-datas">
          <footer>
            <img src={cinema} alt="Profissional" />
            <div>
              <h2>{oferta.nome}</h2>
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

          <button
            className="btn-comprar"
            onClick={e => {
              fcompra(oferta, toogle);
              setToogle(state => !state);
            }}
            style={{
              backgroundColor: cor,
            }}
          >
            {toogle ? 'Selecionar oferta' : 'Selecionada'}
          </button>
        </div>
      </div>
    </div>
  );
}
