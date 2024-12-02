// CSS
import styles from "./Home.module.css"

// hooks
import { useNavigate, Link } from "react-router-dom"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// react
import { useState, useEffect } from "react"

// components
import PostDetail from "../../compenentes/PostDetail/PostDetail";
import Loading from "../../compenentes/Loading";

const Home = () => {
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(true); 

  const { documents: posts, error } = useFetchDocuments("posts");

  const navigate = useNavigate();

  useEffect(() => {
    if (posts || error) {
      setLoading(false);
    }
  }, [posts, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
          type="text" 
          placeholder="Ou busque por tags..." 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading ? (
          <Loading />
        ) : (
          posts && posts.length > 0 ? (
            posts.map((post) => <PostDetail key={post.id} post={post} />)
          ) : (
            <div className={styles.noposts}>
              <p>Não foram encontrar novas postagens</p>
              <Link to="/posts/create" className="btn">Criar primeiro post</Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
