import React, { useState, useEffect } from 'react';
import tourService from '../services/tourService';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  CircularProgress, 
  Alert, 
  Box, 
  Button,
  CardActions,
  Chip,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Place as PlaceIcon, 
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon 
} from '@mui/icons-material';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await tourService.getAllTours();
        setTours(response.data);
      } catch (err) {
        setError('ট্যুরগুলো লোড করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

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
      <Box sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
        <Alert severity="error" variant="filled" icon={false}>
          <Typography variant="h6" color="inherit">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      mt: { xs: 2, md: 4 }, 
      px: { xs: 2, sm: 0 },
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        position: 'relative'
      }}>
        <Fade in timeout={800}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            আমাদের সকল ট্যুর প্যাকেজ
          </Typography>
        </Fade>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: 'auto',
            mt: 1
          }}
        >
          অসাধারণ অভিজ্ঞতার জন্য আমাদের ট্যুর প্যাকেজগুলো অন্বেষণ করুন
        </Typography>
      </Box>

      {tours.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          color: theme.palette.text.secondary
        }}>
          <Typography variant="h6" gutterBottom>
            আপাতত কোনো ট্যুর প্যাকেজ নেই।
          </Typography>
          <Typography variant="body2">
            শীঘ্রই নতুন ট্যুর যুক্ত হবে। আপডেটের জন্য সংযোগে থাকুন!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="center">
          {tours.map((tour, index) => (
            <Grid item key={tour._id} xs={12} sm={6} md={4} lg={3}>
              <Fade in timeout={600 + (index * 200)} style={{ transitionDelay: `${index * 200}ms` }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: theme.shadows[4],
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                      backgroundColor: theme.palette.background.paper
                    },
                    background: 'linear-gradient(145deg, #ffffff, #f0f4f8)'
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? 180 : 220}
                    image={tour.images && tour.images[0] ? tour.images[0] : 'https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=ট্যুর+ছবি'}
                    alt={tour.title}
                    sx={{
                      objectFit: 'cover',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30%',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
                      }
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h2"
                      sx={{ 
                        fontWeight: '600',
                        color: theme.palette.text.primary,
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {tour.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 2,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {tour.description}
                    </Typography>
                    
                    {/* Duration Chip */}
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={`সময়কাল: ${tour.duration}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ mb: 1, mr: 1 }}
                    />
                    
                    {/* Price Highlight */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AttachMoneyIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: 20 }} />
                      <Typography 
                        variant="h5" 
                        color="success" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}
                      >
                        ৳{tour.price}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      component={Link} 
                      to={`/tours/${tour._id}`} 
                      variant="contained" 
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        py: 1.2,
                        fontWeight: '600',
                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                        boxShadow: theme.shadows[2],
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                          transform: 'scale(1.02)',
                          boxShadow: theme.shadows[6]
                        }
                      }}
                    >
                      বিস্তারিত দেখুন
                    </Button>
                  </CardActions>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Footer-like section for empty state or additional info */}
      {tours.length > 0 && (
        <Box sx={{ mt: 8, textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            আরও ট্যুরের জন্য আমাদের সাথে যোগাযোগ করুন
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ToursPage;