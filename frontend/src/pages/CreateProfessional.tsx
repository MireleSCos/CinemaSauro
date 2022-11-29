import { Link } from 'react-router-dom';

import backIcon from '../assets/back.svg';
import { FormProfessional } from '../components/FormProfessional';
import { Header } from '../components/Header';

import '../styles/createProfessional.css';

export function CreateProfessional() {
    return (
        <div id="create-professional">
            <Header>
                <h1>
                    Que incrível que você quer ajudar
                    </h1>
                <h2>
                    O primeiro passo, é preencher esse
                    formulário de inscrição.
                </h2>
            </Header>
            <FormProfessional />
        </div>
    )
}