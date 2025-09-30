import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Alert, 
  Grid,
  Paper,
  Fade,
  useTheme,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon,
  Login as LoginIcon 
} from '@mui/icons-material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      setError(err.response?.data?.msg || 'লগইন ব্যর্থ হয়েছে। ইমেইল অথবা পাসওয়ার্ড ভুল।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        p: 2
      }}
    >
      <Container maxWidth="xs">
        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: theme.shadows[12],
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
              }
            }}
          >
            {/* Logo/Icon Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <IconButton
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <LoginIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>

            <Typography 
              component="h1" 
              variant="h4" 
              align="center"
              sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              লগইন করুন
            </Typography>

            <Typography 
              variant="body1" 
              align="center"
              sx={{ 
                mb: 3,
                color: theme.palette.text.secondary,
                fontSize: '1.1rem'
              }}
            >
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    width: '100%', 
                    mb: 2,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: theme.palette.error.main
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="ইমেইল অ্যাড্রেস"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                      borderColor: theme.palette.primary.main
                    },
                    '&.Mui-focused': {
                      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      borderColor: theme.palette.primary.main
                    }
                  }
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="পাসওয়ার্ড"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                      borderColor: theme.palette.primary.main
                    },
                    '&.Mui-focused': {
                      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                      borderColor: theme.palette.primary.main
                    }
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  mt: 1, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8]
                  },
                  '&:disabled': {
                    background: theme.palette.action.disabledBackground,
                    transform: 'none'
                  }
                }}
              >
                {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link 
                    to="/register" 
                    style={{ 
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: '500',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    অ্যাকাউন্ট নেই? রেজিস্টার করুন
                  </Link>
                </Grid>
              </Grid>

              {/* Forgot Password Link (Optional Enhancement) */}
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Link 
                    to="/forgot-password" 
                    style={{ 
                      textDecoration: 'none',
                      color: theme.palette.text.secondary,
                      fontSize: '0.9rem',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default LoginPage;