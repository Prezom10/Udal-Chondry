import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminRoute from './components/AdminRoute'; // Import the new component
import { CssBaseline, Container } from '@mui/material';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* User Routes */}
          <Route path="/dashboard" element={<UserDashboardPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="" element={<AdminDashboardPage />} />
          </Route>

        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;