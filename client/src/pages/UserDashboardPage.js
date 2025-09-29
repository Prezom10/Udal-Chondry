
import React, { useState, useEffect, useContext } from 'react';
import bookingService from '../services/bookingService';
import AuthContext from '../context/AuthContext';
import { Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';

const UserDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (token) {
        try {
          const response = await bookingService.getMyBookings(token);
          setBookings(response.data);
        } catch (err) {
          setError('আপনার বুকিংগুলো লোড করা সম্ভব হয়নি।');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        আমার বুকিংসমূহ
      </Typography>
      {bookings.length === 0 ? (
        <Typography>আপনি এখনো কোনো ট্যুর বুক করেননি।</Typography>
      ) : (
        <Paper elevation={3}>
          <List>
            {bookings.map((booking, index) => (
              <React.Fragment key={booking._id}>
                <ListItem>
                  <ListItemText 
                    primary={booking.tour.title}
                    secondary={`অবস্থান: ${booking.tour.location} | মূল্য: ৳${booking.tour.price} | স্ট্যাটাস: ${booking.status}`}
                  />
                </ListItem>
                {index < bookings.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default UserDashboardPage;
