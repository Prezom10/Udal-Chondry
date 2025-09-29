
import React, { useState, useEffect, useContext } from 'react';
import tourService from '../../services/tourService';
import AuthContext from '../../context/AuthContext';
import TourForm from './TourForm'; // Import the form
import { 
    Typography, 
    Box, 
    CircularProgress, 
    Alert, 
    Button, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // State for dialog
  const [editingTour, setEditingTour] = useState(null); // State for tour being edited
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await tourService.getAllTours();
      setTours(response.data);
    } catch (err) {
      setError('ট্যুরগুলো লোড করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (tour = null) => {
    setEditingTour(tour);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTour(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTour) {
        await tourService.updateTour(editingTour._id, formData, token);
      } else {
        await tourService.createTour(formData, token);
      }
      fetchTours();
      handleClose();
    } catch (err) {
      setError('অপারেশন ব্যর্থ হয়েছে।');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই ট্যুরটি মুছে ফেলতে চান?')) {
      try {
        await tourService.deleteTour(id, token);
        fetchTours();
      } catch (err) {
        setError('ট্যুরটি মুছে ফেলা সম্ভব হয়নি।');
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">ট্যুর ম্যানেজমেন্ট</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>নতুন ট্যুর যোগ করুন</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>শিরোনাম</TableCell>
              <TableCell>মূল্য</TableCell>
              <TableCell>আসন</TableCell>
              <TableCell align="right">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour._id}>
                <TableCell>{tour.title}</TableCell>
                <TableCell>৳{tour.price}</TableCell>
                <TableCell>{tour.availableSeats}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(tour)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(tour._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingTour ? 'ট্যুর সম্পাদনা করুন' : 'নতুন ট্যুর তৈরি করুন'}</DialogTitle>
        <DialogContent>
          <TourForm tour={editingTour} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageTours;
