import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps{
    children: ReactNode;
}


export function Private ({ children }: PrivateProps): any{ //any pq eu nao falo o que vai retornar.
    const [loading, setLoading] = useState(true) //true pq vai começar carregando.
    const [signed, setSigned] = useState(false) // false pq nao tem usuario logado.

    useEffect(() => { //para verificar se o usuario está logado.

        const unsub = onAuthStateChanged(auth, (user) => { //monitorar os usuarios.
           if(user){
            const userData = {
                uid: user?.uid,
                email: user?.email
            }

            localStorage.setItem("@linktree", JSON.stringify(userData)) // para salvar os dados (id, email...) no localstorage.
            setLoading(false); //parar o carregamento.
            setSigned(true); //usuario logado.

           }else{
            setLoading(false);
            setSigned(false); //nao tem usuario logado.
           }
        })

        return () => { //parar o monitoramento para nao atrapalhar a perfomance.
            unsub();
        }

    }, [])

    //rederizar depois do controle.
    if(loading){ //estiver carregando.
        return <div></div>
    }

    if(!signed){ //não estiver logado e estiver tentando acessar.
        return <Navigate to="/login"/>
    }

    return children;
}