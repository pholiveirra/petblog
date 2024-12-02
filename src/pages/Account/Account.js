import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuth } from "../../hooks/useAuth"; // Importando o novo hook
import styles from "./Account.module.css";
import { useState, useEffect } from "react";

const Account = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading, updateUser } = useAuthentication();
  const { currentUser: firebaseUser, loading: userLoading, error: userError } = useAuth(); // Usando o novo hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validação das senhas
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const user = {
      displayName,
      email,
      password,
    };

    const res = await createUser(user);
    console.log(res);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      displayName,
      email,
    };

    const res = await updateUser(updatedUser);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }

    // Atualiza os campos com as informações do usuário, caso o usuário esteja logado
    if (firebaseUser) {
      setDisplayName(firebaseUser.displayName || "");
      setEmail(firebaseUser.email || "");
    }
  }, [authError, firebaseUser]);

  if (userLoading) {
    return <p>Carregando...</p>;
  }

  if (userError) {
    return <p>Erro ao carregar dados do usuário: {userError}</p>;
  }

  return (
    <div className={styles.register}>
      <h1>Minha Conta</h1>
      <p>Crie seu usuário e compartilhe suas histórias com seu pet</p>

      {firebaseUser ? (
        <div>
          <h2>Olá, {firebaseUser.displayName}!</h2>
          <p>Email: {firebaseUser.email}</p>
          <form onSubmit={handleUpdate}>
            <label>
              <span>Nome:</span>
              <input
                type="text"
                name="displayName"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
            <label>
              <span>E-mail:</span>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="btn" disabled={loading}>
              {loading ? "Aguarde..." : "Atualizar"}
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="displayName"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nome do usuário"
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn" disabled={loading}>
            {loading ? "Aguarde..." : "Cadastrar"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Account;
