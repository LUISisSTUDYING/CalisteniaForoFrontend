import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const ExerciseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    grupo_muscular: 'Pecho',
    dificultad: 'Principiante',
    descripcion: ''
  });

  useEffect(() => {
    if (isEditing) {
      const fetchExercise = async () => {
        try {
          const response = await api.get(`/ejercicios/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error", error);
          setError('No se pudo cargar el ejercicio.');
        } finally {
          setLoading(false);
        }
      };
      fetchExercise();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      if (isEditing) {
        await api.put(`/ejercicios/${id}`, formData);
      } else {
        await api.post('/ejercicios', formData);
      }
      navigate('/ejercicios');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar el ejercicio');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;

  return (
    <section className="row justify-content-center fade-in">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border-0 bg-dark">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 text-white m-0 fw-bold">{isEditing ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}</h2>
              <Link to="/ejercicios" className="btn btn-sm btn-outline-secondary">Cancelar</Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del Ejercicio</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="grupo_muscular" className="form-label">Grupo Muscular</label>
                  <select className="form-select" id="grupo_muscular" name="grupo_muscular" value={formData.grupo_muscular} onChange={handleChange}>
                    <option value="Pecho">Pecho</option>
                    <option value="Espalda">Espalda</option>
                    <option value="Piernas">Piernas</option>
                    <option value="Brazos">Brazos</option>
                    <option value="Core">Core</option>
                    <option value="Full Body">Full Body</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label htmlFor="dificultad" className="form-label">Dificultad</label>
                  <select className="form-select" id="dificultad" name="dificultad" value={formData.dificultad} onChange={handleChange}>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="descripcion" className="form-label">Descripción / Instrucciones</label>
                <textarea className="form-control" id="descripcion" name="descripcion" rows="4" value={formData.descripcion} onChange={handleChange} required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar Ejercicio'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExerciseForm;
