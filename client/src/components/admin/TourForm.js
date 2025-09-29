
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TourForm = ({ tour, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    availableSeats: '',
    images: '' // For simplicity, handling as a comma-separated string
  });

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title || '',
        description: tour.description || '',
        price: tour.price || '',
        duration: tour.duration || '',
        location: tour.location || '',
        availableSeats: tour.availableSeats || '',
        images: tour.images ? tour.images.join(', ') : ''
      });
    }
  }, [tour]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
        ...formData,
        price: Number(formData.price),
        availableSeats: Number(formData.availableSeats),
        images: formData.images.split(',').map(item => item.trim()).filter(item => item)
    };
    onSubmit(finalData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField name="title" label="শিরোনাম" value={formData.title} onChange={handleChange} fullWidth required margin="normal" />
      <TextField name="description" label="বর্ণনা" value={formData.description} onChange={handleChange} fullWidth required margin="normal" multiline rows={4} />
      <TextField name="price" label="মূল্য" value={formData.price} onChange={handleChange} fullWidth required margin="normal" type="number" />
      <TextField name="duration" label="সময়কাল" value={formData.duration} onChange={handleChange} fullWidth required margin="normal" />
      <TextField name="location" label="অবস্থান" value={formData.location} onChange={handleChange} fullWidth required margin="normal" />
      <TextField name="availableSeats" label="আসন সংখ্যা" value={formData.availableSeats} onChange={handleChange} fullWidth required margin="normal" type="number" />
      <TextField name="images" label="ছবির লিংক (কমা দিয়ে আলাদা করুন)" value={formData.images} onChange={handleChange} fullWidth margin="normal" />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>{tour ? 'আপডেট করুন' : 'তৈরি করুন'}</Button>
    </Box>
  );
};

export default TourForm;
