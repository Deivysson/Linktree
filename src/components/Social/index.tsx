import { ReactNode } from "react";

interface SocialProps{
    url: string;
    children:ReactNode; //tipo JSX para receber o icone.
}

export function Social({url, children}: SocialProps){
    return(
        <a
        href={url}
        rel="noopener noreferrer" //Para falar que é uma url externa.
        target="_blank" //abrir em uma aba a mais.
        >
        {children}
        </a>
    )
}