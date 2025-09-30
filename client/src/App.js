import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom'; // Added Link
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  Container, 
  Typography, 
  Button 
} from '@mui/material'; // Added missing MUI imports
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Now it will work after creating Footer.js
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminRoute from './components/AdminRoute';
import { AuthProvider } from './context/AuthContext';

// Custom Theme for consistent beautiful styling
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Blue for travel theme
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#ff9800', // Orange accent for energy
      light: '#ffb74d',
      dark: '#f57c00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12, // Rounded corners for modern look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Layout Component to wrap pages with consistent structure
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide Navbar on auth pages for better UX
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
          backgroundColor: 'background.default',
          pt: { xs: 2, md: 4 },
          pb: 4,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: { xs: 2, md: 4 } }}>
          {children}
        </Container>
      </Box>
      {!hideNavbar && <Footer />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <Layout>
                <HomePage />
              </Layout>
            } 
          />
          <Route 
            path="/tours" 
            element={
              <Layout>
                <ToursPage />
              </Layout>
            } 
          />
          <Route 
            path="/tours/:id" 
            element={
              <Layout>
                <TourDetailPage />
              </Layout>
            } 
          />
          
          {/* Auth Routes (no navbar/footer for clean look) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* User Routes */}
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <UserDashboardPage />
              </Layout>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <Layout>
                <AdminRoute>
                  <Routes>
                    <Route index element={<AdminDashboardPage />} />
                  </Routes>
                </AdminRoute>
              </Layout>
            } 
          />
          
          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <Layout>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h4" color="text.secondary" gutterBottom>
                    ৪০৪ - পেজ পাওয়া যায়নি
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    আপনি খুঁজে থাকা পেজটি পাওয়া যায়নি।
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/" 
                    size="large"
                    sx={{ borderRadius: 2 }}
                  >
                    হোম পেজে ফিরুন
                  </Button>
                </Box>
              </Layout>
            } 
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;