import api from '../../services/api';
import atencaoIcon from '../../assets/atencao.svg';
import Switch from '@mui/material/Switch';
import './style.css';
import { Button } from '../Button';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

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
        <input
          type="text"
          id="Ator"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
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
