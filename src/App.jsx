import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import ExerciseList from './pages/exercises/ExerciseList';
import ExerciseForm from './pages/exercises/ExerciseForm';
import RoutineList from './pages/routines/RoutineList';
import RoutineForm from './pages/routines/RoutineForm';

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
