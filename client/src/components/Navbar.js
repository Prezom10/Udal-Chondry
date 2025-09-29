import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgba(0, 20, 40, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0, 119, 190, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height: '72px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
        {/* LEFT SECTION: Logo + Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
           {/* Logo — Now using public/logo.svg */}
  <Typography
    variant="h6"
    component={Link}
    to="/"
    sx={{
      fontWeight: 700,
      fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' },
      color: '#00aaff',
      textDecoration: 'none',
      fontFamily: "'Playfair Display', serif",
      textShadow: '0 1px 4px rgba(0, 119, 190, 0.3)',
      letterSpacing: '-0.3px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        color: '#00ccff',
        textShadow: '0 2px 8px rgba(0, 119, 190, 0.4)',
        transition: 'all 0.3s ease',
      },
    }}
  >
    <img 
      src="/logo192.png" 
      alt="উঁড়াল চণ্ডী" 
      style={{ 
        width: 32, 
        height: 32, 
        marginRight: 8,
        filter: 'drop-shadow(0 1px 5px rgba(0, 119, 190, 0.3))',
        // স্কেলিং সঠিক রাখতে নিচের কোডটি অপশনাল — কিন্তু আপনি চাইলে কমেন্ট করে রাখুন:
        // objectFit: 'contain',
      }} 
    />
    উঁড়াল চণ্ডী
  </Typography>

          {/* Navigation Links (হোম, ট্যুরস) */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                letterSpacing: '0.5px',
                color: 'rgba(255, 255, 255, 0.85)',
                px: 1.5,
                py: 0.7,
                borderRadius: 20,
                '&:hover': {
                  color: '#00aaff',
                  backgroundColor: 'rgba(0, 119, 190, 0.1)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              হোম
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/tours"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                letterSpacing: '0.5px',
                color: 'rgba(255, 255, 255, 0.85)',
                px: 1.5,
                py: 0.7,
                borderRadius: 20,
                '&:hover': {
                  color: '#00aaff',
                  backgroundColor: 'rgba(0, 119, 190, 0.1)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              ট্যুরস
            </Button>
          </Box>
        </Box>

        {/* RIGHT SECTION: User Actions (Login/Register/Dashboard/Logout) */}
        {!loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 } }}>
            {user ? (
              <>
                {/* Dashboard */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.5px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    px: 1.5,
                    py: 0.7,
                    borderRadius: 20,
                    '&:hover': {
                      color: '#00aaff',
                      backgroundColor: 'rgba(0, 119, 190, 0.1)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  ড্যাশবোর্ড
                </Button>

                {/* Admin (if admin) */}
                {user.role === 'admin' && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/admin"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      letterSpacing: '0.5px',
                      color: '#ff9900',
                      px: 1.5,
                      py: 0.7,
                      borderRadius: 20,
                      border: '1px solid rgba(255, 153, 0, 0.3)',
                      '&:hover': {
                        color: '#ffbb33',
                        backgroundColor: 'rgba(255, 153, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    অ্যাডমিন
                  </Button>
                )}

                {/* Welcome Tag */}
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.9)',
                    px: 1.8,
                    py: 0.6,
                    backgroundColor: 'rgba(0, 119, 190, 0.15)',
                    borderRadius: 20,
                    border: '1px solid rgba(0, 119, 190, 0.3)',
                  }}
                >
                  স্বাগতম, {user.username}
                </Typography>

                {/* Logout */}
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#ff4444',
                    px: 2,
                    py: 0.7,
                    borderRadius: 20,
                    border: '1px solid rgba(255, 68, 68, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 68, 68, 0.1)',
                      color: '#ff6666',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s ease',
                    },
                  }}
                >
                  লগআউট
                </Button>
              </>
            ) : (
              <>
                {/* Login */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: '#00aaff',
                    px: 2,
                    py: 0.7,
                    borderRadius: 20,
                    border: '1px solid rgba(0, 119, 190, 0.4)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 119, 190, 0.15)',
                      color: '#00ccff',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s ease',
                    },
                  }}
                >
                  লগইন
                </Button>

                {/* Register */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: '#ffffff',
                    px: 2,
                    py: 0.7,
                    borderRadius: 20,
                    backgroundColor: 'rgba(0, 119, 190, 0.4)',
                    border: '1px solid rgba(0, 119, 190, 0.6)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 119, 190, 0.6)',
                      color: '#ffffff',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s ease',
                    },
                  }}
                >
                  রেজিস্টার
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>

      {/* Subtle divider under navbar */}
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', mx: 0 }} />
    </AppBar>
  );
};

export default Navbar;