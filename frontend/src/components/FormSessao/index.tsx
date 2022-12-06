import api from '../../services/api';
import atencaoIcon from '../../assets/atencao.svg';
import './style.css';
import { Button } from '../Button';
import { Filme } from '../CardsFilme';
import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export interface Sala {
  id: number;
  capacidade: number;
}

interface formProps {
  fback: Function;
}

export function FormSessao({ fback }: formProps) {
  const [salaId, setSalaId] = useState(1);
  const [filmeId, setFilmeId] = useState(1);
  const [valor, setValor] = useState(0);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const [filmes, setFilmes] = useState<any[]>([]);
  const [salas, setSalas] = useState<any[]>([]);

  const navigation = useNavigate();
  useEffect(() => {
    api
      .get('filme')
      .then(response => {
        setFilmes(response.data);
        if (response.data?.length > 0) {
          setFilmeId(response.data[0].id);
        }
      })
      .catch(() => {
        alert('Erro ao listar profissionais.');
      });
    api
      .get('room')
      .then(response => {
        setSalas(response.data);
        if (response.data?.length > 0) {
          setSalaId(response.data[0].id);
        }
      })
      .catch(() => {
        alert('Erro ao listar profissionais.');
      });
  }, []);

  function handleSalaId(value: string) {
    setSalaId(parseInt(value));
  }
  function handleFilmeID(value: string) {
    setFilmeId(parseInt(value));
  }
  function handleCreateFilme(e: FormEvent) {
    e.preventDefault();

    api
      .post('sessao', {
        salaId,
        filmeId,
        valor,
        data,
        hora,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        fback(1);
        navigation('/');
      })
      .catch(err => {
        if (err.response.status == 300) {
          alert(
            'A sessão não pode ser cadastrada pois entra em conflito com outras sessões na mesma sala, teste outro horário ou data'
          );
        } else {
          alert('Erro');
        }
      });
  }

  return (
    <div className="container-form">
      <h1>Dados da Sessão</h1>
      <div className="separator"></div>
      <form onSubmit={handleCreateFilme}>
        <label htmlFor="Sala">Sala</label>
        <select
          id="Sala"
          onChange={e => {
            handleSalaId(e.target.value);
          }}
        >
          {salas.map((sala: Sala, index) => {
            return (
              <option key={sala.id} value={sala.id}>
                Sala {sala.id}
              </option>
            );
          })}
        </select>

        <label htmlFor="Filme">Filme</label>
        <select
          id="Filme"
          onChange={e => {
            handleFilmeID(e.target.value);
          }}
        >
          {filmes.map((filme: Filme) => {
            return (
              <option key={filme.id} value={filme.id}>
                {filme.nome}
              </option>
            );
          })}
        </select>

        <label htmlFor="data_inicio">Data</label>
        <input
          type="date"
          id="data_inicio"
          min={new Date().toISOString().split('T')[0]}
          value={data}
          onChange={e => {
            setData(e.target.value);
          }}
        />
        <label htmlFor="Horario">Hora</label>
        <input
          type="time"
          id="Horario"
          value={hora}
          onChange={e => {
            setHora(e.target.value);
          }}
        />
        <label htmlFor="Valor">Valor</label>
        <input
          type="number"
          id="Valor"
          value={valor}
          onChange={e => {
            setValor(e.target.valueAsNumber);
          }}
        />
        <div id="submit">
          <div id="content-submit">
            <div>
              <img src={atencaoIcon} alt="Atenção" />
              <p>
                Importante! <br />
                Preencha todos os dados
              </p>
            </div>

            <Button type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
