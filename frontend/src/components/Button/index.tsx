import { ButtonHTMLAttributes } from 'react';

import './style.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(buttonProps: ButtonProps) {
    return(
        <button {...buttonProps}>
            Salvar
        </button>
    )
}