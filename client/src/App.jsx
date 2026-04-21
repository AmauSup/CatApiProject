<<<<<<< HEAD
=======
// import { Navigate, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomePage from './pages/HomePage';
// import SearchPage from './pages/SearchPage';
// import Tournois from './pages/Tournois';
// import './App.css';

// function App() {
//   return (
//     <div className="app">
//       <Navbar />
//       <main className="app-content">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/search" element={<SearchPage />} />
//           <Route path="/tournoi" element={<Tournois />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;


>>>>>>> da535854ca5bc46f8aa8e7444cb55e3b8125741e
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import Tournois from './pages/Tournois';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tournoi" element={<Tournois />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;