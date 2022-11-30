import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardsFilmes, Filme } from '../components/CardsFilme';
import { FormFilme } from '../components/FormFilme';
import { FormSessao } from '../components/FormSessao';

import { Header } from '../components/Header';
import api from '../services/api';
import '../styles/home.css';

export function Home() {
  const [filmes, setFilmes] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const navigate = useNavigate();

  async function handleCreateProfissional() {
    navigate('/professional/new');
  }
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    api
      .get('filmes')
      .then(response => {
        setFilmes(response.data);
      })
      .catch(() => {
        /* alert('Erro ao listar profissionais.'); */
        let tfilme1 = {
          id_filme: 22,
          nome: 'Nome do Filme',
          is_nacional: true,
          atores_principais: 'Atores principais',
          censura: 22,
          categoria: 'Drama',
          is_estreia: true,
          duracao: 22,
          empresa: 'Pixar',
        };
        setFilmes([tfilme1]);
      });
  }, []);

  return (
    <div id="home">
      <Header isHome>
        <h1>Cinema Sauro</h1>
      </Header>

      <div className="container-buttons">
        <button
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(1);
          }}
        >
          Estreias
        </button>
        <button
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(1);
          }}
        >
          Filmes
        </button>
        <button
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(2);
          }}
        >
          Cadastrar Filme
        </button>
        <button
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(3);
          }}
        >
          Cadastrar Sessão
        </button>
      </div>

      <main className="content__container">
        {selectedIndex === 1 &&
          (filmes.length === 0 ? (
            <p className="no-profissional">Nenhum filme cadastrado.</p>
          ) : (
            <>
              {filmes.map((filme: Filme) => {
                return <CardsFilmes filme={filme} key={filme.id_filme} />;
              })}
            </>
          ))}
        {selectedIndex === 2 && <FormFilme />}
        {selectedIndex === 3 && <FormSessao />}
      </main>
    </div>
  );
}
