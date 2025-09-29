import React, { useState, useEffect } from 'react';
import tourService from '../services/tourService';
import { Grid, Card, CardContent, Typography, CardMedia, CircularProgress, Alert, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        আমাদের সকল ট্যুর প্যাকেজ
      </Typography>
      {tours.length === 0 ? (
        <Typography>আপাতত কোনো ট্যুর প্যাকেজ নেই।</Typography>
      ) : (
        <Grid container spacing={4}>
          {tours.map((tour) => (
            <Grid item key={tour._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={tour.images && tour.images[0] ? tour.images[0] : 'https://via.placeholder.com/300'} // Placeholder image
                  alt={tour.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {tour.title}
                  </Typography>
                  <Typography>
                    {tour.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    মূল্য: ৳{tour.price}
                  </Typography>
                  <Typography color="text.secondary">
                    সময়কাল: {tour.duration}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                    <Button component={Link} to={`/tours/${tour._id}`} variant="contained" fullWidth>
                        বিস্তারিত দেখুন
                    </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ToursPage;