import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardsFilmes, Filme } from '../components/CardsFilme';
import { Header } from '../components/Header';
import api from '../services/api';
import '../styles/home.css';

export function Home() {
  const [filmes, setFilmes] = useState<any[]>([]);

  const navigate = useNavigate();

  async function handleCreateProfissional() {
    navigate('/professional/new');
  }

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
          onClick={handleCreateProfissional}
        >
          Estreias
        </button>
        <button
          className="button-create-profissional"
          onClick={handleCreateProfissional}
        >
          Filmes
        </button>
        <button
          className="button-create-profissional"
          onClick={handleCreateProfissional}
        >
          Cadastrar Filme
        </button>
        <button
          className="button-create-profissional"
          onClick={handleCreateProfissional}
        >
          Cadastrar Sessão
        </button>
      </div>

      <main className="list-profissional">
        {filmes.length === 0 ? (
          <p className="no-profissional">Nenhum filme cadastrado.</p>
        ) : (
          <>
            {filmes.map((filme: Filme) => {
              return <CardsFilmes filme={filme} key={filme.id_filme} />;
            })}
          </>
        )}
      </main>
    </div>
  );
}
