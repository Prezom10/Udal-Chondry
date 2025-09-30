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
  PersonAdd as PersonAddIcon, 
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon 
} from '@mui/icons-material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(username, email, phone, password);
      navigate('/'); // Redirect to home page after successful registration
    } catch (err) {
      setError(err.response?.data?.msg || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
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
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
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
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }
            }}
          >
            {/* Logo/Icon Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <IconButton
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: 'white',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    bgcolor: theme.palette.secondary.dark,
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <PersonAddIcon sx={{ fontSize: 40 }} />
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
                background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
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
              আপনার তথ্য দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন
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
                id="username"
                label="ইউজারনেম"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: theme.palette.primary.main }} />
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
                id="email"
                label="ইমেইল অ্যাড্রেস"
                name="email"
                autoComplete="email"
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
                fullWidth
                name="phone"
                label="ফোন নম্বর"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: theme.palette.primary.main }} />
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
                autoComplete="new-password"
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
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8]
                  },
                  '&:disabled': {
                    background: theme.palette.action.disabledBackground,
                    transform: 'none'
                  }
                }}
              >
                {loading ? 'রেজিস্টার হচ্ছে...' : 'রেজিস্টার'}
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link 
                    to="/login" 
                    style={{ 
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: '500',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    আপনার অ্যাকাউন্ট আছে? লগইন করুন
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

export default RegisterPage;