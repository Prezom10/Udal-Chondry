import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tourService from '../services/tourService';
import bookingService from '../services/bookingService'; // Import the booking service
import AuthContext from '../context/AuthContext';
import { Box, Typography, CircularProgress, Alert, Container, Button, Card, CardMedia, CardContent } from '@mui/material';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext); // Get token from context

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
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!tour) {
    return <Typography>কোনো ট্যুর পাওয়া যায়নি।</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={tour.images && tour.images[0] ? tour.images[0] : 'https://via.placeholder.com/1200x400'}
          alt={tour.title}
        />
        <CardContent>
          <Typography variant="h3" component="h1" gutterBottom>
            {tour.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            অবস্থান: {tour.location}
          </Typography>
          <Typography variant="body1" sx={{ my: 3 }}>
            {tour.description}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            মূল্য: ৳{tour.price} প্রতি জন
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            সময়কাল: {tour.duration}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, color: tour.availableSeats > 0 ? 'green' : 'red' }}>
            আসন সংখ্যা: {tour.availableSeats > 0 ? `${tour.availableSeats} টি খালি আছে` : 'খালি নেই'}
          </Typography>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {bookingError && <Alert severity="error" sx={{ mb: 2 }}>{bookingError}</Alert>}
            {bookingMessage && <Alert severity="success" sx={{ mb: 2 }}>{bookingMessage}</Alert>}
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleBooking} 
              disabled={tour.availableSeats <= 0 || bookingMessage}
            >
              {tour.availableSeats <= 0 ? 'আসন পূর্ণ' : 'এখনই বুক করুন'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TourDetailPage;