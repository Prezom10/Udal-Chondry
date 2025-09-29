import React, { useState, useEffect, useContext } from 'react';
import adminService from '../../services/adminService';
import AuthContext from '../../context/AuthContext';
import { 
    Typography, 
    Box, 
    CircularProgress, 
    Alert, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Select,
    MenuItem
} from '@mui/material';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await adminService.getAllBookings(token);
      setBookings(response.data);
    } catch (err) {
      setError('বুকিংগুলো লোড করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminService.updateBookingStatus(id, newStatus, token);
      setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      setError('স্ট্যাটাস আপডেট করা সম্ভব হয়নি।');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>বুকিং ম্যানেজমেন্ট</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ট্যুরের নাম</TableCell>
              <TableCell>ব্যবহারকারী</TableCell>
              <TableCell>ইমেইল</TableCell>
              <TableCell>ফোন</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>বুকিংয়ের তারিখ</TableCell>
              <TableCell>স্ট্যাটাস</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.tour?.title || 'N/A'}</TableCell>
                <TableCell>{booking.user?.username || 'N/A'}</TableCell>
                <TableCell>{booking.user?.email || 'N/A'}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{booking.user?.phone || 'N/A'}</TableCell>
                <TableCell>{booking.user?.password || 'N/A'}</TableCell>
                <TableCell>{new Date(booking.bookingDate).toLocaleDateString('bn-BD')}</TableCell>
                <TableCell>
                  <Select 
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageBookings;
