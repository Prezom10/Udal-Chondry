import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tourService from '../services/tourService';
import bookingService from '../services/bookingService';
import AuthContext from '../context/AuthContext';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Container, 
  Button, 
  Card, 
  CardMedia, 
  CardContent,
  Grid,
  Paper,
  Fade,
  useTheme,
  Chip,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Place as PlaceIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  EventSeat as EventSeatIcon,
  Login as LoginIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const theme = useTheme();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await tourService.getTourById(id);
        setTour(response.data);
      } catch (err) {
        setError('ট্যুরটি লোড করা সম্ভব হয়নি।');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setBookingError('');
    setBookingMessage('');
    try {
      await bookingService.createBooking(id, token);
      setBookingMessage('আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে! আপনার ড্যাশবোর্ডে বিস্তারিত দেখুন।');
      // Refresh tour data to show updated seat count
      const response = await tourService.getTourById(id);
      setTour(response.data);
    } catch (err) {
      setBookingError(err.response?.data?.msg || 'বুকিং ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '50vh',
          mt: 4 
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
        <Alert severity="error" variant="filled" icon={<ErrorIcon />}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!tour) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          কোনো ট্যুর পাওয়া যায়নি।
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
        pt: 2
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: theme.shadows[4],
              background: 'white'
            }}
          >
            {/* Hero Image Section */}
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height={{ xs: 250, md: 400 }}
                image={tour.images && tour.images[0] ? tour.images[0] : 'https://via.placeholder.com/1200x400/4A90E2/FFFFFF?text=ট্যুর+ছবি'}
                alt={tour.title}
                sx={{
                  objectFit: 'cover',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                  }
                }}
              />
              {/* Overlay Title */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: 16, md: 32 },
                  left: { xs: 16, md: 32 },
                  right: { xs: 16, md: 32 },
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                <Typography 
                  variant="h2" 
                  component="h1"
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 1,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 1,
                    px: 2,
                    py: 0.5,
                    display: 'inline-block'
                  }}
                >
                  {tour.title}
                </Typography>
                <Chip
                  icon={<PlaceIcon />}
                  label={tour.location}
                  color="primary"
                  variant="filled"
                  sx={{ 
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </Box>
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {/* Description Section */}
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 2,
                    color: theme.palette.text.primary,
                    fontWeight: '600'
                  }}
                >
                  ট্যুরের বিবরণ
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.8,
                    color: theme.palette.text.secondary,
                    textAlign: 'justify'
                  }}
                >
                  {tour.description}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Details Grid */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      height: '100%',
                      background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                      color: 'white',
                      borderRadius: 2,
                      '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
                    }}
                  >
                    <AttachMoneyIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      ৳{tour.price}
                    </Typography>
                    <Typography variant="h6">প্রতি জন</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      height: '100%',
                      background: `linear-gradient(45deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`,
                      color: 'white',
                      borderRadius: 2,
                      '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {tour.duration}
                    </Typography>
                    <Typography variant="body2">সময়কাল</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      height: '100%',
                      borderRadius: 2,
                      background: tour.availableSeats > 0 ? 
                        `linear-gradient(45deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)` :
                        `linear-gradient(45deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
                      color: 'white',
                      '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
                    }}
                  >
                    <EventSeatIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {tour.availableSeats}
                    </Typography>
                    <Typography variant="body2">
                      {tour.availableSeats > 0 ? 'খালি আসন' : 'আসন পূর্ণ'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Booking Section */}
              <Box sx={{ 
                textAlign: 'center', 
                p: 4, 
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: 3,
                border: `2px solid ${theme.palette.primary.light}`,
                mt: 4
              }}>
                {bookingError && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 2, borderRadius: 2 }}
                    icon={<ErrorIcon />}
                  >
                    {bookingError}
                  </Alert>
                )}
                {bookingMessage && (
                  <Alert 
                    severity="success" 
                    sx={{ mb: 2, borderRadius: 2 }}
                    icon={<CheckCircleIcon />}
                  >
                    {bookingMessage}
                  </Alert>
                )}
                
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={handleBooking} 
                  disabled={tour.availableSeats <= 0 || bookingMessage}
                  sx={{ 
                    minWidth: 200,
                    py: 2,
                    px: 4,
                    borderRadius: 2,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    background: tour.availableSeats > 0 ? 
                      `linear-gradient(45deg, ${theme.palette.success.main} 30%, ${theme.palette.success.dark} 90%)` :
                      theme.palette.action.disabledBackground,
                    color: 'white',
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                      background: tour.availableSeats > 0 ? 
                        `linear-gradient(45deg, ${theme.palette.success.dark} 30%, ${theme.palette.success.main} 90%)` :
                        theme.palette.action.disabledBackground,
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8]
                    },
                    '&:disabled': {
                      transform: 'none',
                      background: theme.palette.action.disabledBackground
                    }
                  }}
                >
                  {tour.availableSeats <= 0 ? 'আসন পূর্ণ' : (user ? 'এখনই বুক করুন' : 'লগইন করুন')}
                  {user ? null : <LoginIcon sx={{ ml: 1, fontSize: 20 }} />}
                </Button>

                {!user && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 2, 
                      color: theme.palette.text.secondary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.5
                    }}
                  >
                    <LoginIcon sx={{ fontSize: 16 }} />
                    বুকিং করতে প্রথমে লগইন করুন
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default TourDetailPage;