import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Paper, 
  Fade, 
  useTheme,
  Container,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  DirectionsBus as TourIcon,
  ConfirmationNumber as BookingIcon,
  ManageAccounts as UsersIcon
} from '@mui/icons-material';
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
        <Fade in={value === index} timeout={500}>
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {children}
          </Box>
        </Fade>
      )}
    </div>
  );
}

const AdminDashboardPage = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabData = [
    { label: 'ট্যুর ম্যানেজ করুন', icon: <TourIcon />, index: 0 },
    { label: 'বুকিং ম্যানেজ করুন', icon: <BookingIcon />, index: 1 },
    { label: 'ব্যবহারকারী ম্যানেজ করুন', icon: <UsersIcon />, index: 2 }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
        pt: 2
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DashboardIcon 
              sx={{ 
                fontSize: 40, 
                color: theme.palette.primary.main, 
                mr: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                borderRadius: '50%',
                p: 1.5
              }} 
            />
            <Box>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                অ্যাডমিন ড্যাশবোর্ড
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  mt: 0.5,
                  fontWeight: 500
                }}
              >
                আপনার অ্যাপ্লিকেশন ম্যানেজ করুন
              </Typography>
            </Box>
          </Box>

          {/* Quick Stats Cards (Placeholder - আপনার data দিয়ে replace করুন) */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                color: 'white',
                borderRadius: 3,
                boxShadow: theme.shadows[4],
                '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <TourIcon sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    ২৫+
                  </Typography>
                  <Typography variant="body2">ট্যুর প্যাকেজ</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                background: `linear-gradient(45deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                color: 'white',
                borderRadius: 3,
                boxShadow: theme.shadows[4],
                '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <BookingIcon sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    ১২০+
                  </Typography>
                  <Typography variant="body2">বুকিং</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                background: `linear-gradient(45deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`,
                color: 'white',
                borderRadius: 3,
                boxShadow: theme.shadows[4],
                '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
              }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <UsersIcon sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    ৮৫+
                  </Typography>
                  <Typography variant="body2">ব্যবহারকারী</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs Section */}
        <Paper 
          elevation={4} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden',
            background: 'white',
            boxShadow: theme.shadows[6]
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 3 }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="admin dashboard tabs"
              variant="fullWidth"
              sx={{ 
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  minHeight: 56,
                  py: 2,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    background: `${theme.palette.primary.light}20`
                  }
                },
                '& .MuiTabs-indicator': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  height: 3,
                  borderRadius: '2px 2px 0 0'
                }
              }}
            >
              {tabData.map(({ label, icon, index }) => (
                <Tab
                  key={index}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {icon}
                      <Typography variant="body1">{label}</Typography>
                    </Box>
                  }
                  id={`admin-tab-${index}`}
                  aria-controls={`admin-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>

          <Divider />

          {/* Tab Panels */}
          <TabPanel value={value} index={0}>
            <ManageTours />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ManageBookings />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ManageUsers />
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboardPage;