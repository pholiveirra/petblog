import styles from "./CreatePost.module.css"

import { useState } from "react"
import {useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"


const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const {insertDocumente, response} = useInsertDocument("posts");


    const navigate = useNavigate();
    const {user} = useAuthValue();

    

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")

        //validate image URL
         try {
             new URL(image);              
            
         } catch (error) {
            setFormError("A imagem precisa ser uma URL.")
            
         }

        //criar o array de targs
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
        
        // checar todos os valores
        if(!title || !image || !body || tags) {
            setFormError("Por favor, preecha todos os campos!")
        }
        
        if(formError) return;

        insertDocumente({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        
        })

        //redirect to home page
        navigate("/");


    };

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>
            <p>Nos conte sua experiência e compatirlhe sua história com seu pet!</p>
            <form onSubmit={handleSubmit}
            >
                <label>
                    <span>Título:</span>
                    <input type="text" name="title" required placeholder="Pense num bom título..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    <span>URL da imagem:</span>
                    <input type="text" name="image" placeholder="Insira uma imagem do seu pet" required value={image} onChange={(e) => setImage(e.target.value)} />
                </label>
                <label>
                    <span>Conteudo:</span>
                    <textarea name="body" required placeholder="Nos conte sua história" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                </label>

                <label>
                    <span>Tags:</span>
                    <input type="text" name="tags" placeholder="Insira as tags separadas pro vígurla" required value={tags} onChange={(e) => setTags(e.target.value)} />
                </label>
                <button className="btn" disabled={response.loading}>
                    {response.loading ? "Aguarde..." : "Postar"}
                </button> 
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}

            </form>

        </div>
    )
}

export default CreatePost