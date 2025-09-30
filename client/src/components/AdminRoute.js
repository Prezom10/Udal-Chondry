import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const AdminRoute = ({ children }) => { // 👈 children prop receive করুন
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (user && user.role === 'admin') {
    return children; // 👈 Outlet নয় — children render করুন
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;