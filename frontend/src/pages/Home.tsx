import { useEffect, useState } from 'react';

import { CardsFilmes, Filme } from '../components/CardsFilme';
import { FormFilme } from '../components/FormFilme';
import { FormSessao } from '../components/FormSessao';
import { CardSessao, Sessao } from '../components/CardsSessao';
import { Header } from '../components/Header';
import api from '../services/api';
import '../styles/home.css';

export function Home() {
  const [filmes, setFilmes] = useState<any[]>([]);
  const [sessoes, setSessoes] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

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
        let tfilme2 = {
          id_filme: 44,
          nome: 'Nome do Filme',
          is_nacional: true,
          atores_principais: 'Atores principais',
          censura: 22,
          categoria: 'Drama',
          is_estreia: true,
          duracao: 22,
          empresa: 'Pixar',
        };
        setFilmes([tfilme1, tfilme2]);

        /* alert('Erro ao listar profissionais.'); */
        let tsessao = {
          id_sessao: 22,
          sala: 'Sala 101',
          filme: 'Nome do Filme',
          atoresPrincipais: 'Atores principais',
          dataInicio: '22/11/1111',
          horario: '12:30',
        };
        setSessoes([tsessao]);
      });
  }, []);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const opComprarFilmeListSessions = (id_filme: number) => {
    console.log('id do filme:', id_filme);
    handleListItemClick(5);
  };
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
            handleListItemClick(3);
          }}
        >
          Cadastrar Filme
        </button>
        <button
          className="button-create-profissional"
          onClick={() => {
            handleListItemClick(4);
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
                return (
                  <CardsFilmes
                    filme={filme}
                    fcompra={opComprarFilmeListSessions}
                    key={filme.id_filme}
                  />
                );
              })}
            </>
          ))}
        {selectedIndex === 3 && <FormFilme />}
        {selectedIndex === 4 && <FormSessao />}
        {selectedIndex === 5 &&
          (sessoes.length === 0 ? (
            <p className="no-profissional">Nenhuma sessao cadastrado.</p>
          ) : (
            <>
              {sessoes.map((sessao: Sessao) => {
                return <CardSessao sessao={sessao} key={sessao.id_sessao} />;
              })}
            </>
          ))}
      </main>
    </div>
  );
}
