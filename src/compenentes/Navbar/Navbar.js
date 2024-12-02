import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useState } from "react";
import Draggable from "../Dialog"; 

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    const [openDialog, setOpenDialog] = useState(false); 

    const handleLogoutClick = () => {
        setOpenDialog(true); 
    };

    const handleConfirmLogout = () => {
        logout(); 
        setOpenDialog(false); 
    };

    const handleCancelLogout = () => {
        setOpenDialog(false); 
    };

    return (
        <>
        
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brad}>
                Pet <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Início</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
                        </li>
                    </>
                )}
                        {user && (
                             <li>
                             <NavLink to="/account" className={({ isActive }) => (isActive ? styles.active : "")}>Minha conta</NavLink>
                         </li>
                        )}
                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>Novo post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>Dasboard</NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>Sobre</NavLink>
                </li>
                
                {user && (
                    <li>
                        <button onClick={handleLogoutClick}>Sair</button>
                    </li>
                )}
            </ul>

        </nav>
            <Draggable
                open={openDialog} 
                title="Confirmar Logout"
                message="Você tem certeza que deseja sair?"
                onConfirm={handleConfirmLogout} 
                onCancel={handleCancelLogout} 
            />
        </>
    );
};

export default Navbar;
