import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const RoutineList = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const [routines, setRoutines] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRoutines = async (page = 1, search = searchTerm) => {
    try {
      setLoading(true);
      const url = search 
        ? `/rutinas?page=${page}&search=${encodeURIComponent(search)}`
        : `/rutinas?page=${page}`;
      const response = await api.get(url);
      setRoutines(response.data.data || response.data);
      if (response.data.current_page) {
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
        });
      }
    } catch (error) {
      console.error("Error cargando rutinas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta rutina?')) {
      try {
        await api.delete(`/rutinas/${id}`);
        setRoutines(routines.filter(r => r.id !== id));
      } catch (error) {
        console.error("Error eliminando", error);
        alert('Hubo un error al eliminar la rutina.');
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRoutines(1, searchTerm);
  };

  return (
    <section className="fade-in">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="h3 fw-bold m-0">Rutinas de Entrenamiento</h2>
        <div className="d-flex gap-3">
          <form onSubmit={handleSearch} className="d-flex">
            <input 
              type="text" 
              className="form-control form-control-sm bg-dark text-light border-secondary shadow-sm" 
              placeholder="Buscar rutina..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '200px' }}
            />
            <button type="submit" className="btn btn-sm btn-outline-success ms-2 shadow-sm">
              Buscar
            </button>
          </form>
          {isAdmin && (
            <Link to="/rutinas/nuevo" className="btn btn-sm btn-success shadow-sm text-white text-nowrap d-flex align-items-center">
              + Nueva
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status"></div>
        </div>
      ) : routines.length === 0 ? (
        <div className="alert alert-dark text-center py-4 border-secondary">
          <p className="mb-0 text-muted">No hay rutinas registradas. ¡Crea la primera!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle border-secondary shadow-sm">
            <thead>
              <tr className="text-muted">
                <th>Rutina</th>
                <th>Objetivo</th>
                <th>Ejercicio Base</th>
                <th>Series / Repeticiones</th>
                {isAdmin && <th className="text-end">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {routines.map(rutina => (
                <tr key={rutina.id}>
                  <td className="fw-semibold">{rutina.nombre}</td>
                  <td><span className="badge bg-secondary bg-opacity-25 text-light border border-secondary">{rutina.objetivo}</span></td>
                  <td className="text-info">{rutina.ejercicio?.nombre || 'N/A'}</td>
                  <td>{rutina.esquema_series_reps}</td>
                  {isAdmin && (
                    <td className="text-end">
                      <Link to={`/rutinas/editar/${rutina.id}`} className="btn btn-sm btn-outline-info me-2 px-3">Editar</Link>
                      <button onClick={() => handleDelete(rutina.id)} className="btn btn-sm btn-outline-danger px-3">Eliminar</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination && pagination.last_page > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Navegación de páginas">
            <ul className="pagination mb-0">
              <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link bg-dark text-success border-secondary" 
                  onClick={() => fetchRoutines(pagination.current_page - 1)}
                >
                  Anterior
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link bg-dark text-light border-secondary">
                  Página {pagination.current_page} de {pagination.last_page}
                </span>
              </li>
              <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                <button 
                  className="page-link bg-dark text-success border-secondary" 
                  onClick={() => fetchRoutines(pagination.current_page + 1)}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
};

export default RoutineList;
