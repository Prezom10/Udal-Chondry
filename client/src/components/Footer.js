import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Divider, 
  IconButton,
  useTheme,
  Container,
  Fade,
  TextField,
  Button
} from '@mui/material';
import { 
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Explore as ExploreIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 6,
        py: 4,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)'
        }
      }}
    >
      <Container maxWidth="lg">
        {/* Fade with safe wrapper - Box to avoid children undefined issue */}
        <Fade in timeout={800}>
          <Box> {/* Added Box wrapper for safe rendering */}
            <Grid container spacing={3} justifyContent="space-between">
              {/* Company Info */}
              <Grid xs={12} md={4}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      mr: 1.5,
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' }
                    }}
                  >
                    <ExploreIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.25, fontSize: '1.25rem' }}>
                      উঁডাল চণ্ডী
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem' }}>
                      আপনার স্বপ্নের ভ্রমণের সঙ্গী
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.85, mb: 1.5, fontSize: '0.9rem' }}>
                  বাংলাদেশের সুন্দর স্থানগুলো আবিষ্কার করুন। নিরাপদ ভ্রমণের গ্যারান্টি।
                </Typography>
                {/* Compact Newsletter */}
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem' }}>
                    নিউজলেটার
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <TextField
                      variant="outlined"
                      placeholder="ইমেইল"
                      size="small"
                      sx={{
                        flex: 1,
                        minWidth: 150,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
                          height: 40,
                          '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                          '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                          '&.Mui-focused fieldset': { borderColor: 'white' }
                        },
                        '& .MuiInputBase-input': { color: 'white', py: 0.5 },
                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: 2,
                        background: theme.palette.secondary.main,
                        minWidth: 80,
                        height: 40,
                        fontSize: '0.8rem',
                        '&:hover': { background: theme.palette.secondary.dark }
                      }}
                    >
                      সাবস্ক্রাইব
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Quick Links */}
              <Grid xs={12} sm={6} md={2}>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
                  দ্রুত লিঙ্ক
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {[
                    { text: 'হোম', to: '/' },
                    { text: 'ট্যুর প্যাকেজ', to: '/tours' },
                    { text: 'বুকিং', to: '/bookings' },
                    { text: 'আমাদের সম্পর্কে', to: '/about' }
                  ].map((item) => (
                    <Box key={item.text} component="li" sx={{ mb: 1 }}>
                      <Link 
                        to={item.to} 
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.85)', 
                          textDecoration: 'none',
                          transition: 'color 0.3s ease',
                          fontSize: '0.9rem',
                          '&:hover': { color: 'white' }
                        }}
                      >
                        {item.text}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Contact Info */}
              <Grid xs={12} sm={6} md={3}>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
                  যোগাযোগ
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <IconButton sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white', mr: 1.5, minWidth: 36, height: 36 }}>
                      <LocationIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Box sx={{ fontSize: '0.9rem' }}>
                      <Typography variant="body2" sx={{ fontWeight: '500', mb: 0.25 }}>ঠিকানা</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85 }}>ঢাকা, বাংলাদেশ</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <IconButton sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white', mr: 1.5, minWidth: 36, height: 36 }}>
                      <PhoneIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Box sx={{ fontSize: '0.9rem' }}>
                      <Typography variant="body2" sx={{ fontWeight: '500', mb: 0.25 }}>ফোন</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85 }}>+880 1234 567890</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white', mr: 1.5, minWidth: 36, height: 36 }}>
                      <EmailIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Box sx={{ fontSize: '0.9rem' }}>
                      <Typography variant="body2" sx={{ fontWeight: '500', mb: 0.25 }}>ইমেইল</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85 }}>info@undalchondi.com</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Social Media */}
              <Grid xs={12} md={3}>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
                  সোশ্যাল মিডিয়া
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                  {[
                    { icon: FacebookIcon, color: '#3b5998', href: 'https://facebook.com' },
                    { icon: InstagramIcon, color: '#e4405f', href: 'https://instagram.com' },
                    { icon: TwitterIcon, color: '#1da1f2', href: 'https://twitter.com' }
                  ].map((social) => (
                    <IconButton
                      key={social.href}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        color: 'white',
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: social.color,
                          transform: 'scale(1.05)',
                          boxShadow: theme.shadows[3]
                        }
                      }}
                    >
                      <social.icon sx={{ fontSize: 20 }} />
                    </IconButton>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.85rem' }}>
                  সামাজিক যোগাযোগে সংযোগে থাকুন
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.15)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', pt: 1 }}>
          <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} উঁডাল চণ্ডী। সকল অধিকার সংরক্ষিত। | 
            <Link 
              to="/privacy" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.85)', 
                textDecoration: 'none', 
                ml: 0.5, 
                fontSize: '0.85rem',
                '&:hover': { textDecoration: 'underline' } 
              }}
            >
              প্রাইভেসি পলিসি
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;