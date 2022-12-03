import api from '../../services/api';
import './style.css';

import atencaoIcon from '../../assets/atencao.svg';
import Select from 'react-select';
import Switch from '@mui/material/Switch';
import { Button } from '../Button';
import { Filme } from '../CardsFilme';

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export function FormFilme() {
  const navigation = useNavigate();

  const [nome, setNome] = useState('');
  const [censura, setCensura] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [isNacional, setIsNacional] = useState(false);
  const [isEstreia, setIsEstreia] = useState(false);
  const [atores, setAtores] = useState<Array<String>>([]);

  const handleEstreia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEstreia(event.target.checked);
  };
  const handleNacional = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNacional(event.target.checked);
  };
  const handleAtores = (event: any) => {
    var atoresInformados: Array<String> = [];
    atoresInformados = event.split(',');
    setAtores(atoresInformados);
    /* event.map((ator: AtoresOption) => {
      atoresInformados.push(ator.value);
    });
     */
  };

  function handleCreateFilme(e: FormEvent) {
    e.preventDefault();

    api
      .post('filme', {
        nome,
        censura,
        duracao,
        categoria,
        empresa,
        isNacional,
        isEstreia,
        atores,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');

        navigation('/');
      })
      .catch(() => {
        alert('Erro no cadastro, tente novamente!');
      });
  }

  interface AtoresOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
  }
  const AtoresOptions: readonly AtoresOption[] = [
    { value: 'Elizabeth Olsen', label: 'Elizabeth Olsen', color: '#00B8D9' },
    {
      value: 'Robert Downey Jr.',
      label: 'Robert Downey Jr.',
      color: '#0052CC',
    },
    { value: 'Mark Ruffalo', label: 'Mark Ruffalo', color: '#5243AA' },
    {
      value: 'Scarlett Johansson',
      label: 'Scarlett Johansson',
      color: '#FF5630',
    },
    { value: 'Henry Cavill', label: 'Henry Cavill', color: '#FF8B00' },
  ];

  return (
    <div className="container-form">
      <h1>Dados do Filme</h1>
      <div className="separator"></div>
      <form onSubmit={handleCreateFilme}>
        <label htmlFor="Nome">Nome</label>
        <input
          type="text"
          id="Nome"
          value={nome}
          onChange={e => {
            setNome(e.target.value);
          }}
        />
        <label htmlFor="Ator">Atores principais</label>
        <input
          type="text"
          id="Ator"
          onChange={e => {
            handleAtores(e.target.value);
          }}
        />
        {/* <Select
          defaultValue={[AtoresOptions[2], AtoresOptions[3]]}
          isMulti
          name="colors"
          options={AtoresOptions}
          onChange={e => {
            handleAtores(e);
          }}
          className="basic-multi-select select-atores"
          classNamePrefix="select"
        /> */}
        <label htmlFor="categoria">Categoria</label>
        <input
          type="text"
          id="categoria"
          value={categoria}
          onChange={e => {
            setCategoria(e.target.value);
          }}
        />
        <label htmlFor="Censura">Censura</label>
        <input
          type="number"
          id="Censura"
          value={censura}
          onChange={e => {
            setCensura(e.target.valueAsNumber);
          }}
        />
        <label htmlFor="Duracao">Duracao</label>
        <input
          type="number"
          id="Duracao"
          value={duracao}
          onChange={e => {
            setDuracao(e.target.valueAsNumber);
          }}
        />
        <label htmlFor="Empresa">Empresa</label>
        <input
          type="text"
          id="Empresa"
          value={empresa}
          onChange={e => {
            setEmpresa(e.target.value);
          }}
        />
        <label htmlFor="Estreia">Estreia</label>
        <Switch
          id="Estreia"
          className="input-switch"
          checked={isEstreia}
          onChange={handleEstreia}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <label htmlFor="Nacional">Nacional</label>
        <Switch
          id="Nacional"
          className="input-switch"
          checked={isNacional}
          onChange={handleNacional}
          inputProps={{ 'aria-label': 'controlled' }}
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
