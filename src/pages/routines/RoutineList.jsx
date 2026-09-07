import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const RoutineList = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutines = async () => {
    try {
      const response = await api.get('/rutinas');
      setRoutines(response.data);
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

  return (
    <section className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold m-0">Rutinas de Entrenamiento</h2>
        {isAdmin && (
          <Link to="/rutinas/nuevo" className="btn btn-success shadow-sm text-white">
            + Nueva
          </Link>
        )}
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
    </section>
  );
};

export default RoutineList;
