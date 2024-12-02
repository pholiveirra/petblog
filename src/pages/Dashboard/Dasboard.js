import React, { useState } from 'react';
import styles from "./Dasboard.module.css";
import { Link } from "react-router-dom";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

// dialog
import Draggable from "../../compenentes/Dialog";

const Dasboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null); // Armazena o ID do post a ser excluído

  const { deleteDocument } = useDeleteDocument("posts");

  const handleDeleteClick = (postId) => {
    setPostIdToDelete(postId); // Armazena o ID do post a ser excluído
    setOpenDialog(true); // Abre o diálogo de confirmação
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete) {
      deleteDocument(postIdToDelete); // Exclui o post
    }
    setOpenDialog(false); // Fecha o diálogo
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Fecha o diálogo sem excluir
  };

  const { user } = useAuthValue();
  const uid = user.uid;

  // posts do usuário
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  if (loading) {
    return <p>Carregando...</p>;
  }

  // Verifique se posts está presente e é um array
  if (!posts) {
    return <p>Não há posts disponíveis.</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">Faça uma postagem</Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts.map((post) => (
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>

                <button
                  onClick={() => handleDeleteClick(post.id)}
                  className="btn btn-outline btn btn-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {/* Dialog de confirmação de exclusão */}
          <Draggable
            open={openDialog}
            title="Confirmar Exclusão"
            message="Você tem certeza que deseja apagar este post?"
            onConfirm={handleConfirmDelete} // Chama a função de confirmação de exclusão
            onCancel={handleCancelDelete} // Fecha o diálogo sem excluir
          />
        </>
      )}
    </div>
  );
};

export default Dasboard;
