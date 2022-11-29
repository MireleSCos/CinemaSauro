import { ProfileProfessional } from '../components/EditProfessional';
import { Header } from '../components/Header';

import '../styles/editProfessional.css';

export function EditProfessional() {
    return (
        <div id="edit-professional">
            <Header>
                <h1>Que incrível que você
                    quer ajudar.
                </h1>
            </Header>
            <ProfileProfessional />
        </div>
    )
}