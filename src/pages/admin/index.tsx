import { FormEvent, useState, useEffect } from "react"
import { Header } from "../../components/Header/header"
import { Input } from "../../components/Input"
import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"

import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore"
// addDoc - Adicionar documento na coleçao, gera ID automatico.
//Query para fazer busca personalizada ou fazer uma ordenação.
//orderBy para ordenar.

interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin(){
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

    const [links, setLinks] = useState <LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links"); //Olhar banco de dados.
        const queryRef = query(linksRef, orderBy("created", "asc")); //asc ordem crescente.

        const unsub = onSnapshot(queryRef, (snapshot) => { // tirar uma foto do banco, um retorno do banco, em tempo real.

            let lista = [] as LinkProps[]; // Para dizer que aqui dentro vai receber uma lista de objetos(array).

            snapshot.forEach((doc) => { //percorrer o array.
              lista.push({
                id: doc.id,
                name: doc.data().name,
                url: doc.data().url,
                bg: doc.data().bg,
                color: doc.data().color
              })  
            })

            setLinks(lista);

        })

        return () => { //parar as buscas.
            unsub();
        }

    }, [])

    function handleRegister(e: FormEvent){
        e.preventDefault();

       if(nameInput === "" || urlInput === ""){ //validando os dados
        alert("Preencha os campos")
        return;
       }

       addDoc(collection(db, "links"), { //depois da validação. collection é do banco de dados.
        name: nameInput,
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
        created: new Date() // criar a data de criação.
       })
       .then(() => { // para zerar o campo depois de adicionar.
        setNameInput("")
        setUrlInput("")
       })
       .catch((error) => {
        console.log("Error" + error)
       })
    }

    async function handleDeleteLink(id: string){
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
    }

    return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
    <Header />

    <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input 
        placeholder="Digite seu link..."
        value={nameInput}
        onChange={ (e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Nome da URL</label>
        <Input 
        placeholder="Digite sua URL..."
        value={urlInput}
        onChange={ (e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
            <div className="flex gap-2">
                <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
                <input 
                type="color"
                value={backgroundColorInput}
                onChange={(e) => setBackgroundColorInput(e.target.value)}
                />
            </div>

            <div className="flex gap-2">    
                <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
                <input 
                type="color"
                value={textColorInput}
                onChange={(e) => setTextColorInput(e.target.value)}
                />
            </div>
        </section>

        {nameInput !== '' && ( // So aparecer depois que tiver dados digitados.
            <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
            <article
            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
            >
            <p style={{color: textColorInput}}> {nameInput} </p>
            </article>
        </div>
        )}

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
            Cadastrar
        </button>

    </form>

    <h2 className="font-bold text-white mb-4 text-2xl">
        Meus Links
    </h2>

    {links.map( (link)=> ( //parenteses porque quero retornar algo JSX.
        <article
        key={link.id}
        className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
        style={{ backgroundColor: link.bg, color: link.color}}
        >
        <p>{link.name}</p>
        <div>
            <button
            className="border border-dashed p-1 rounded bg-neutral-900"
            onClick={() => handleDeleteLink(link.id) }
            >
            <FiTrash size={18} color="#fff"/>
            </button>
        </div>
        </article>
    ))}

    </div>
    )
}