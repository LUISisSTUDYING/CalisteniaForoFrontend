import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const RoutineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [exercises, setExercises] = useState([]);

  const [formData, setFormData] = useState({
    nombre: '',
    objetivo: 'Hipertrofia',
    ejercicio_id: '',
    esquema_series_reps: '',
    notas: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar lista de ejercicios para el select
        const exercisesRes = await api.get('/ejercicios');
        setExercises(exercisesRes.data);
        
        // Asignar primer ejercicio por defecto si estamos creando
        if (!isEditing && exercisesRes.data.length > 0) {
          setFormData(prev => ({ ...prev, ejercicio_id: exercisesRes.data[0].id }));
        }

        // Cargar datos de la rutina si es edición
        if (isEditing) {
          const routineRes = await api.get(`/rutinas/${id}`);
          setFormData({
            nombre: routineRes.data.nombre || '',
            objetivo: routineRes.data.objetivo || 'Hipertrofia',
            ejercicio_id: routineRes.data.ejercicio_id || '',
            esquema_series_reps: routineRes.data.esquema_series_reps || '',
            notas: routineRes.data.notas || ''
          });
        }
      } catch (error) {
        console.error("Error", error);
        setError('No se pudieron cargar los datos necesarios.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
        await api.put(`/rutinas/${id}`, formData);
      } else {
        await api.post('/rutinas', formData);
      }
      navigate('/rutinas');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar la rutina');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-success" role="status"></div></div>;

  return (
    <section className="row justify-content-center fade-in">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border-0 bg-dark">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 text-white m-0 fw-bold">{isEditing ? 'Editar Rutina' : 'Nueva Rutina'}</h2>
              <Link to="/rutinas" className="btn btn-sm btn-outline-secondary">Cancelar</Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre de la Rutina</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="objetivo" className="form-label">Objetivo</label>
                  <select className="form-select" id="objetivo" name="objetivo" value={formData.objetivo} onChange={handleChange}>
                    <option value="Hipertrofia">Hipertrofia</option>
                    <option value="Fuerza">Fuerza</option>
                    <option value="Resistencia">Resistencia</option>
                    <option value="Movilidad">Movilidad</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label htmlFor="ejercicio_id" className="form-label">Ejercicio Base</label>
                  <select className="form-select" id="ejercicio_id" name="ejercicio_id" value={formData.ejercicio_id} onChange={handleChange} required>
                    {exercises.length === 0 && <option value="">Sin ejercicios (crea uno primero)</option>}
                    {exercises.map(ex => (
                      <option key={ex.id} value={ex.id}>{ex.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="esquema_series_reps" className="form-label">Series y Repeticiones</label>
                <input type="text" className="form-control" id="esquema_series_reps" name="esquema_series_reps" placeholder="Ej: 4 series x 12 repeticiones" value={formData.esquema_series_reps} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <label htmlFor="notas" className="form-label">Notas o Instrucciones (Opcional)</label>
                <textarea className="form-control" id="notas" name="notas" rows="3" value={formData.notas} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100 py-2 shadow-sm text-white" disabled={saving || exercises.length === 0}>
                {saving ? 'Guardando...' : 'Guardar Rutina'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutineForm;
