import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';

// Componentes temporales (Placeholders) para las vistas que crearemos en los pasos 3 y 4
const ExerciseList = () => <div><h2>Lista de Ejercicios</h2></div>;
const ExerciseForm = () => <div><h2>Formulario de Ejercicio</h2></div>;
const RoutineList = () => <div><h2>Lista de Rutinas</h2></div>;
const RoutineForm = () => <div><h2>Formulario de Rutina</h2></div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            {/* Todas las rutas protegidas comparten el MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ejercicios" element={<ExerciseList />} />
              <Route path="/ejercicios/nuevo" element={<ExerciseForm />} />
              <Route path="/ejercicios/editar/:id" element={<ExerciseForm />} />
              <Route path="/rutinas" element={<RoutineList />} />
              <Route path="/rutinas/nuevo" element={<RoutineForm />} />
              <Route path="/rutinas/editar/:id" element={<RoutineForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
