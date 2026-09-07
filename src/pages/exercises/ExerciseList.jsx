import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const ExerciseList = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExercises = async () => {
    try {
      const response = await api.get('/ejercicios');
      setExercises(response.data);
    } catch (error) {
      console.error("Error cargando ejercicios", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este ejercicio?')) {
      try {
        await api.delete(`/ejercicios/${id}`);
        setExercises(exercises.filter(e => e.id !== id));
      } catch (error) {
        console.error("Error eliminando", error);
        alert('Hubo un error al eliminar el ejercicio.');
      }
    }
  };

  return (
    <section className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold m-0">Catálogo de Ejercicios</h2>
        {isAdmin && (
          <Link to="/ejercicios/nuevo" className="btn btn-primary shadow-sm">
            + Nuevo
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : exercises.length === 0 ? (
        <div className="alert alert-dark text-center py-4 border-secondary">
          <p className="mb-0 text-muted">No hay ejercicios registrados en el catálogo.</p>
        </div>
      ) : (
        <div className="row g-4">
          {exercises.map(ex => (
            <div key={ex.id} className="col-12 col-md-6 col-lg-4">
              <article className="card shadow-sm h-100 border-0 bg-dark position-relative">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title text-white fw-bold mb-0">{ex.nombre}</h5>
                    <span className="badge bg-secondary bg-opacity-25 text-light border border-secondary">{ex.dificultad}</span>
                  </div>
                  <h6 className="card-subtitle mb-3 text-primary">{ex.grupo_muscular}</h6>
                  <p className="card-text text-light opacity-75 small">{ex.descripcion}</p>
                </div>
                {isAdmin && (
                  <div className="card-footer bg-transparent border-top border-secondary d-flex justify-content-end gap-2 p-3">
                    <Link to={`/ejercicios/editar/${ex.id}`} className="btn btn-sm btn-outline-info px-3">Editar</Link>
                    <button onClick={() => handleDelete(ex.id)} className="btn btn-sm btn-outline-danger px-3">Eliminar</button>
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExerciseList;
