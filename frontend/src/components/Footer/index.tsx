import { Link } from 'react-router-dom';

import backIcon from '../../assets/back.svg';

import './style.css';

type Props = {
  valorTotal: Number;
  fcomprar: Function;
};

export function Footer({ valorTotal, fcomprar }: Props) {
  return (
    <footer className="preco">
      <div id="submit">
        <div id="content-submit">
          <div>
            <p>
              Preço
              <span className="valor">R$ {valorTotal}</span>
            </p>
          </div>

          <button
            className="btn-comprar"
            onClick={e => {
              fcomprar();
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </footer>
  );
}
