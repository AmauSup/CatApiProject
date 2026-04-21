
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
      </div>
    </header>
  );
}

export default Navbar;