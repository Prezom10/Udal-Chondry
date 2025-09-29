import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { Box, Typography, Button } from '@mui/material';

// Simple 3D Globe component
function Globe() {
  return (
    <Sphere args={[2, 32, 32]}>
      <meshStandardMaterial color="#0077be" wireframe />
    </Sphere>
  );
}

const HomePage = () => {
  return (
    <Box sx={{ height: '80vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* 3D Canvas Background */}
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* Overlay Content */}
      <Box sx={{ textAlign: 'center', color: 'white', p: 3, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          উঁডাল চণ্ডী
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          <p> যেখানে পথ চুমে নেয় তোমার কল্পনাকে।</p>
          বাংলাদেশের সবচেয়ে সুন্দর এবং উত্তেজনাপূর্ণ স্থানগুলো ঘুরে দেখুন আমাদের সাথে।
        </Typography>
        <Button variant="contained" color="primary" size="large" component={Link} to="/tours">
          অ্যাডভেঞ্চারের স্বাদ নিতে চান? প্যাকেজগুলো দেখুন।”
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;