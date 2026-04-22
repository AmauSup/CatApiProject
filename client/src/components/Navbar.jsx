
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';

import sunIcon from '../assets/sun-icon.png';
import moonIcon from '../assets/moon-icon.png';
import './Navbar.css';

function Navbar({ theme, onToggleTheme }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <h1 className="navbar-title">Cat API Project</h1>
        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Accueil</NavLink>
          <NavLink to="/search" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Recherche</NavLink>
          <NavLink to="/tournoi" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Tournoi</NavLink>
          <NavLink to="/favoris" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Favoris</NavLink>
          {user ? (
            <>
              <span className="navbar-user">👤 {user.username}</span>
              <button className="navbar-link" onClick={logout} style={{marginLeft:8}}>Déconnexion</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Connexion</NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Créer un compte</NavLink>
            </>
          )}
        </nav>
        <button 
          className="theme-toggle" 
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? (
            <img src={moonIcon} alt="Moon" className="theme-icon" />
          ) : (
            <img src={sunIcon} alt="Sun" className="theme-icon" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;