import api from '../../services/api';
import Select from 'react-select';
import atencaoIcon from '../../assets/atencao.svg';
import Switch from '@mui/material/Switch';
import './style.css';
import { Button } from '../Button';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import MultiValue from 'react-select/dist/declarations/src/components/MultiValue';

export function FormFilme() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthday, setBirthday] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [isEstreia, setIsEstreia] = useState(true);

  const handleEstreia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEstreia(event.target.checked);
  };
  const handleAtores = (event: any) => {
    console.log(event);
  };

  interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  const navigation = useNavigate();

  function handleCreateFilme(e: FormEvent) {
    e.preventDefault();

    api
      .post('professionals', {
        name,
        cpf,
        birthday,
        whatsapp,
        profession,
        bio,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');

        navigation('/');
      })
      .catch(() => {
        alert('Erro no cadastro, tente novamente!');
      });
  }

  return (
    <div className="container-form">
      <h1>Dados do Filme</h1>
      <div className="separator"></div>
      <form onSubmit={handleCreateFilme}>
        <label htmlFor="Name">Nome</label>
        <input
          type="text"
          id="Name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="Ator">Atores principais</label>
        <Select
          defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          name="colors"
          options={colourOptions}
          onChange={e => {
            handleAtores(e);
          }}
          className="basic-multi-select select-atores"
          classNamePrefix="select"
        />
        <label htmlFor="Genero">Genero</label>
        <input
          type="text"
          id="Genero"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="Censura">Censura</label>
        <input
          type="text"
          id="Censura"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="Duracao">Duracao</label>
        <input
          type="text"
          id="Duracao"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="Empresa">Empresa</label>
        <input
          type="text"
          id="Empresa"
          value={name}
          onChange={e => {
            setName(e.target.value);
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
