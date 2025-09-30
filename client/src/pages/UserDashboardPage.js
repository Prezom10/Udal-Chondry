import React, { useState, useEffect, useContext } from 'react';
import bookingService from '../services/bookingService';
import AuthContext from '../context/AuthContext';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip,
  Grid,
  useTheme,
} from '@mui/material';
import { AccessTime, LocationOn, MonetizationOn, CalendarToday } from '@mui/icons-material';

const UserDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const theme = useTheme();

  // স্ট্যাটাস অনুযায়ী রঙ নির্ধারণ
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // তারিখ ফরম্যাট করার জন্য
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('bn-BD', options);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await bookingService.getMyBookings(token);
        setBookings(response.data || []);
      } catch (err) {
        setError('আপনার বুকিংগুলো লোড করা সম্ভব হয়নি।');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        আমার বুকিংসমূহ
      </Typography>

      {bookings.length === 0 ? (
        <Paper
          elevation={2}
          sx={{
            p: 4,
            textAlign: 'center',
            mt: 4,
            backgroundColor: theme.palette.grey[50],
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            🌍 আপনি এখনো কোনো ট্যুর বুক করেননি।
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            নতুন ট্যুর অনুসন্ধান করে আপনার প্রথম বুকিং করুন!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {bookings.map((booking) => (
            <Grid xs={12} key={booking._id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {booking.tour.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexWrap: 'wrap', gap: 1 }}>
                        <Chip
                          icon={<CalendarToday />}
                          label={`বুকিং: ${formatDate(booking.bookingDate)}`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          icon={<AccessTime />}
                          label={`ট্রাভেল: ${formatDate(booking.travelDate)}`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      size="medium"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn color="primary" />
                      <Typography variant="body2" color="textSecondary">
                        {booking.tour.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MonetizationOn color="success" />
                      <Typography variant="body2" color="textSecondary">
                        মূল্য: ৳{booking.tour.price}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserDashboardPage;