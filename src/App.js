import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// hooks
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthentication } from './hooks/useAuthentication';

// context
import { AuthProvider } from './context/AuthContext';

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from './compenentes/Navbar/Navbar';
import Footer from './compenentes/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dasboard from './pages/Dashboard/Dasboard';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

// components
import Loading from './compenentes/Loading'; // Importe o componente Loading
import Account from './pages/Account/Account';

function App() {
  const [user, setUser] = useState(undefined); // Estado do usuário
  const { auth } = useAuthentication();

  // Verifica se o estado de autenticação foi alterado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (user === undefined) {
    return <Loading />; 
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />

              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

              <Route
                path="/account"
                element={user ? <Account /> : <Navigate to="/login" />}
              />


              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/login" />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path='/dashboard' element={user ? <Dasboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
