import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MainLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 border-bottom border-secondary">
          <div className="container">
            <NavLink className="navbar-brand fw-bold text-primary" to="/dashboard">
              <span className="text-white">Calisthenics</span> Forum
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <NavLink className={({isActive}) => `nav-link ${isActive ? 'active text-primary fw-bold' : 'text-light'}`} to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => `nav-link ${isActive ? 'active text-primary fw-bold' : 'text-light'}`} to="/ejercicios">Ejercicios</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => `nav-link ${isActive ? 'active text-primary fw-bold' : 'text-light'}`} to="/rutinas">Rutinas</NavLink>
                </li>
              </ul>
              <div className="d-flex align-items-center mt-3 mt-lg-0">
                <span className="text-light me-4 d-none d-lg-block">
                  Hola, <span className="fw-semibold text-primary">{user?.name || 'Atleta'}</span>
                </span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm px-3 rounded-pill">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="container my-4 my-md-5 flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-dark text-center py-4 mt-auto border-top border-secondary">
        <div className="container">
          <small className="text-muted">&copy; {new Date().getFullYear()} Calisthenics Forum. SPA desarrollada en React.</small>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
