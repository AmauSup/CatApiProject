
import { NavLink } from 'react-router-dom';
import sunIcon from '../assets/sun-icon.png';
import moonIcon from '../assets/moon-icon.png';
import './Navbar.css';

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <h1 className="navbar-title">Cat API Project</h1>
        <nav className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'navbar-link active' : 'navbar-link'
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? 'navbar-link active' : 'navbar-link'
            }
          >
            Recherche
          </NavLink>

          <NavLink
            to="/tournoi"
            className={({ isActive }) =>
              isActive ? 'navbar-link active' : 'navbar-link'
            }
          >
            Tournoi
          </NavLink>
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