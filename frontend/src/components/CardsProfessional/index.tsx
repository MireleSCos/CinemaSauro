import { Link } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import editImg from '../../assets/edit.svg';
import removeImg from '../../assets/remove.svg';
import whatsappImg from '../../assets/whatsapp.svg';

import './style.css';
import { useEffect, useState } from 'react';

export interface Professional {
    id: number;
    name: String;
    whatsapp: String;
    profession: String;
    bio: String;
    cpf: String;
}

interface ProfessionalItemProps {
    professional: Professional;
    handleDeleteProfessional: (cpf: String) => void;
}

export function CardsProfessional({professional, handleDeleteProfessional} : ProfessionalItemProps) {

    const [whats, setWhats] = useState(professional.whatsapp);

    useEffect(() => {
        const newWhats = professional.whatsapp.replaceAll('(','').replaceAll(')','').replaceAll('-','');
        setWhats(newWhats);
    }, [])
        
    return (
        <div id="content">
            <div id="profissional-content">
                <div className="profissional-datas">
                    <footer>
                        <img src={profile} alt="Profissional" />
                        <div>
                            <h2>{professional.name}</h2>
                            <h3>{professional.profession}</h3>
                        </div>
                    </footer>
                    <div className="actions">
                        <Link to={`/professional/edit/${professional.cpf}`}>
                            <img src={editImg} alt="Editar" />
                        </Link>
                        <img src={removeImg} alt="Remover" onClick={() => handleDeleteProfessional(professional.cpf)} />
                    </div>
                </div>
                <div className="bio">
                    <p>
                        {professional.bio}
                    </p>
                </div>
            </div>
            <div id="profissional-contact">
                <a
                    href={`https://wa.me/${whats}`}
                >
                    <img src={whatsappImg} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </div>
        </div>
    )
}