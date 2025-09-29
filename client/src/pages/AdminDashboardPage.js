import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import ManageTours from '../components/admin/ManageTours';
import ManageBookings from '../components/admin/ManageBookings';
import ManageUsers from '../components/admin/ManageUsers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboardPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        অ্যাডমিন ড্যাশবোর্ড
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin dashboard tabs">
          <Tab label="ট্যুর ম্যানেজ করুন" id="admin-tab-0" />
          <Tab label="বুকিং ম্যানেজ করুন" id="admin-tab-1" />
          <Tab label="ব্যবহারকারী ম্যানেজ করুন" id="admin-tab-2" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ManageTours />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ManageBookings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ManageUsers />
      </TabPanel>
    </Box>
  );
};

export default AdminDashboardPage;