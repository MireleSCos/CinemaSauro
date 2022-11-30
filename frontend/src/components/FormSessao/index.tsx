import api from '../../services/api';
import atencaoIcon from '../../assets/atencao.svg';
import './style.css';
import { Button } from '../Button';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export function FormSessao() {
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
      <h1>Dados da Sessão</h1>
      <div className="separator"></div>
      <form onSubmit={handleCreateFilme}>
        <label htmlFor="Sala">Sala</label>
        <select
          id="Sala"
          onChange={e => {
            setName(e.target.value);
          }}
        >
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>

        <label htmlFor="Filme">Filme</label>
        <select
          id="Filme"
          onChange={e => {
            setName(e.target.value);
          }}
        >
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>

        <label htmlFor="data_inicio">Data inicio</label>
        <input
          type="text"
          id="data_inicio"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="Horario">Horario</label>
        <input
          type="text"
          id="Horario"
          value={name}
          onChange={e => {
            setName(e.target.value);
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
