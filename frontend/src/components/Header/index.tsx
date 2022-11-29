import { Link } from 'react-router-dom';

import backIcon from '../../assets/back.svg';

import './style.css';

type Props = {
    children: any;
    isHome?: boolean;
}

export function Header({children, isHome}: Props) {
    return (
        <header className="header-professional">
            {isHome ? (
                <div>
                    {children}
                </div>
            ) : (
                <>
                    <Link to="/">
                        <img src={backIcon} alt="Voltar" />
                    </Link>
                    <div>
                        {children}
                    </div>
                </>
            )}

        </header>
    )
}