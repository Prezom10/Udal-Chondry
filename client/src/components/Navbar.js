import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { name: 'হোম', path: '/' },
    { name: 'ট্যুরস', path: '/tours' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgba(0, 20, 40, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0, 119, 190, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.7rem' },
            color: '#00aaff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="/logo192.png"
            alt="উঁড়াল চণ্ডী"
            style={{
              width: isMobile ? 28 : 32,
              height: isMobile ? 28 : 32,
              marginRight: 8,
            }}
          />
          উঁড়াল চণ্ডী
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.85)',
                  px: 2,
                  py: 0.7,
                  borderRadius: 2,
                  '&:hover': {
                    color: '#00aaff',
                    backgroundColor: 'rgba(0,119,190,0.1)',
                  },
                }}
              >
                {link.name}
              </Button>
            ))}

            {!loading && (
              <>
                {user ? (
                  <>
                    <Button component={Link} to="/dashboard" color="inherit" sx={{ textTransform: 'none' }}>ড্যাশবোর্ড</Button>
                    {user.role === 'admin' && (
                      <Button component={Link} to="/admin" color="inherit" sx={{ textTransform: 'none', color: '#ff9900' }}>অ্যাডমিন</Button>
                    )}
                    <Typography sx={{ px: 1.5, py: 0.5, backgroundColor: 'rgba(0,119,190,0.15)', borderRadius: 1 }}>
                      স্বাগতম, {user.username}
                    </Typography>
                    <Button onClick={handleLogout} color="inherit" sx={{ color: '#ff4444' }}>লগআউট</Button>
                  </>
                ) : (
                  <>
                    <Button component={Link} to="/login" color="inherit" sx={{ textTransform: 'none', color: '#00aaff' }}>লগইন</Button>
                    <Button component={Link} to="/register" color="inherit" sx={{ textTransform: 'none', color: '#ffffff', backgroundColor: 'rgba(0,119,190,0.4)' }}>রেজিস্টার</Button>
                  </>
                )}
              </>
            )}
          </Box>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <>
            <IconButton edge="end" color="inherit" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
              <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
                <List>
                  {navLinks.map((link) => (
                    <ListItem key={link.name} disablePadding>
                      <ListItemButton component={Link} to={link.path}>
                        <ListItemText primary={link.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {!loading && (
                    <>
                      {user ? (
                        <>
                          <ListItem disablePadding>
                            <ListItemButton component={Link} to="/dashboard">ড্যাশবোর্ড</ListItemButton>
                          </ListItem>
                          {user.role === 'admin' && (
                            <ListItem disablePadding>
                              <ListItemButton component={Link} to="/admin">অ্যাডমিন</ListItemButton>
                            </ListItem>
                          )}
                          <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>লগআউট</ListItemButton>
                          </ListItem>
                        </>
                      ) : (
                        <>
                          <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login">লগইন</ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton component={Link} to="/register">রেজিস্টার</ListItemButton>
                          </ListItem>
                        </>
                      )}
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
    </AppBar>
  );
};

export default Navbar;
