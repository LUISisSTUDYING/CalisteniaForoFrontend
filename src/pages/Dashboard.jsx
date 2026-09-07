import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api'; // Lo descomentaremos cuando el endpoint exista

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [stats, setStats] = useState({ exercises: 0, routines: 0, athletes: 0 });
  // const [loading, setLoading] = useState(true);

  /* 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  */

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="fade-in">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
          <h1 className="display-6 fw-bold mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Resumen general de tu plataforma.</p>
        </div>
        
        {/* Botón de logout extra explícito en el dashboard, solicitado por el usuario */}
        <button onClick={handleLogout} className="btn btn-danger px-4 shadow-sm d-md-none">
          <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
        </button>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-4">
          <article className="card shadow-sm h-100" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <div className="card-body p-4">
              <h5 className="card-title text-muted fs-6 text-uppercase fw-bold tracking-wide">Total Ejercicios</h5>
              <p className="display-4 fw-bold text-primary mb-0 mt-2">15</p>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="card shadow-sm h-100" style={{ borderLeft: '4px solid #10b981' }}>
            <div className="card-body p-4">
              <h5 className="card-title text-muted fs-6 text-uppercase fw-bold tracking-wide">Total Rutinas</h5>
              <p className="display-4 fw-bold mb-0 mt-2" style={{ color: '#10b981' }}>8</p>
            </div>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="card shadow-sm h-100" style={{ borderLeft: '4px solid #0ea5e9' }}>
            <div className="card-body p-4">
              <h5 className="card-title text-muted fs-6 text-uppercase fw-bold tracking-wide">Atletas Activos</h5>
              <p className="display-4 fw-bold mb-0 mt-2" style={{ color: '#0ea5e9' }}>42</p>
            </div>
          </article>
        </div>
      </div>

      <h2 className="h4 mb-4 fw-bold border-bottom border-secondary pb-2">Accesos Rápidos</h2>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100 border-0 position-relative overflow-hidden group" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3) !important' }}>
            <div className="card-body d-flex flex-column p-5 position-relative z-1">
              <h3 className="h4 mb-3 text-primary">Gestión de Ejercicios</h3>
              <p className="text-light mb-4">Añade, edita o elimina ejercicios de calistenia del catálogo global.</p>
              <button onClick={() => navigate('/ejercicios')} className="btn btn-primary mt-auto align-self-start">
                Ir a Ejercicios
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100 border-0 position-relative overflow-hidden group" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3) !important' }}>
            <div className="card-body d-flex flex-column p-5 position-relative z-1">
              <h3 className="h4 mb-3 text-success">Gestión de Rutinas</h3>
              <p className="text-light mb-4">Crea y vincula rutinas de entrenamiento a los ejercicios existentes.</p>
              <button onClick={() => navigate('/rutinas')} className="btn btn-success mt-auto align-self-start text-white">
                Ir a Rutinas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
