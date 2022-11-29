import api from '../../services/api';
import InputMask from 'react-input-mask';

import fileIcon from '../../assets/file.svg';
import atencaoIcon from '../../assets/atencao.svg';

import './style.css';
import { Button } from '../Button';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export function FormProfessional() {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthday, setBirthday] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [profession, setProfession] = useState('');
    const [bio, setBio] = useState('');

    const navigation = useNavigate();

    function handleCreateProfessional(e: FormEvent) {
        e.preventDefault();

        api.post('professionals', {
            name,
            cpf,
            birthday,
            whatsapp,
            profession,
            bio
        }).then(() => {
            alert("Cadastro realizado com sucesso!");

            navigation("/");
        }).catch(() => {
            alert("Erro no cadastro, tente novamente!");
        })
    }

    return (
        <div className="container-form">
            <h1>Dados Pessoais</h1>
            <div className="separator"></div>
            <form onSubmit={handleCreateProfessional}>
                <label htmlFor="Name">Nome Completo</label>
                <input 
                    type="text" 
                    id="Name" 
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <label htmlFor="Cpf">CPF</label>
                <InputMask 
                    mask="999.999.999-99" 
                    id="Cpf"
                    value={cpf}
                    onChange={(e) => {setCpf(e.target.value)}}
                />
                <label htmlFor="Birthday">Data de nascimento</label>
                <InputMask 
                    mask="99/99/9999" 
                    id="Birthday" 
                    value={birthday}
                    onChange={(e) => {setBirthday(e.target.value)}}
                />
                <label htmlFor="Whats">Whatsapp</label>
                <InputMask 
                    mask="(99)99999-9999" 
                    id="Whats" 
                    value={whatsapp}
                    onChange={(e) => {setWhatsapp(e.target.value)}}
                />
                <label htmlFor="Photo" id="file">
                    <p>Link da sua foto</p>
                    <div>
                        <img src={fileIcon} />
                    </div>
                </label>
                <input type="file" id="Photo" />
                <label htmlFor="Profession">Profissão</label>
                <input 
                    type="text" 
                    id="Profession" 
                    value={profession}
                    onChange={(e) => {setProfession(e.target.value)}}
                />
                <label htmlFor="Bio">Biografia</label>
                <textarea 
                    id="Bio"
                    value={bio}
                    onChange={(e) => {setBio(e.target.value)}}
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

                        <Button type="submit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}