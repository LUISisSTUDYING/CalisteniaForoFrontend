import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const ExerciseList = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const [exercises, setExercises] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchExercises = async (page = 1, search = searchTerm) => {
    try {
      setLoading(true);
      const url = search 
        ? `/ejercicios?page=${page}&search=${encodeURIComponent(search)}`
        : `/ejercicios?page=${page}`;
      const response = await api.get(url);
      setExercises(response.data.data || response.data);
      if (response.data.current_page) {
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
        });
      }
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExercises(1, searchTerm); // Al buscar, siempre reiniciamos a la página 1
  };

  return (
    <section className="fade-in">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="h3 fw-bold m-0">Catálogo de Ejercicios</h2>
        <div className="d-flex gap-3">
          <form onSubmit={handleSearch} className="d-flex">
            <input 
              type="text" 
              className="form-control form-control-sm bg-dark text-light border-secondary shadow-sm" 
              placeholder="Buscar ejercicio..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '200px' }}
            />
            <button type="submit" className="btn btn-sm btn-outline-primary ms-2 shadow-sm">
              Buscar
            </button>
          </form>
          {isAdmin && (
            <Link to="/ejercicios/nuevo" className="btn btn-sm btn-primary shadow-sm text-nowrap d-flex align-items-center">
              + Nuevo
            </Link>
          )}
        </div>
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

      {pagination && pagination.last_page > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Navegación de páginas">
            <ul className="pagination mb-0">
              <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link bg-dark text-primary border-secondary" 
                  onClick={() => fetchExercises(pagination.current_page - 1)}
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
                  className="page-link bg-dark text-primary border-secondary" 
                  onClick={() => fetchExercises(pagination.current_page + 1)}
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

export default ExerciseList;
