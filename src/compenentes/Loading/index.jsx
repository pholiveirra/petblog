import React from "react";
import styles from "./index.module.css";
import pawIcon from "./img/pets.png"; // Certifique-se de salvar a imagem da pata como `pets.png` no mesmo diretório.

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.pawSpinner}>
                <img src={pawIcon} alt="Loading" className={styles.pawIcon} />
            </div>
            <div className={styles.loadingTextContainer}>
                <p className={styles.loadingText}>Carregando...</p>
            </div>
        </div>
    );
};

export default Loading;
