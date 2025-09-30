import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  Sphere, 
  Stars,
  Environment,
  Cloud,
  Float
} from '@react-three/drei';
import { 
  Box, 
  Typography, 
  Button,
  useTheme,
  Fade,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { 
  Flight as FlightIcon,
  Explore as ExploreIcon,
  Place as PlaceIcon,
  BeachAccess as BeachIcon,
  Terrain as MountainIcon
} from '@mui/icons-material';

// Enhanced 3D Globe (made more visible with brighter materials and lights)
function Globe({ rotationSpeed = 0.5 }) {
  return (
    <>
      {/* Stars/Galaxy Background (made more visible but subtle) */}
      <Stars
        radius={100} // Balanced size
        depth={50}
        count={3000} // Moderate count for visibility without lag
        factor={4}
        saturation={1}
        fade
        speed={0.4}
      />
      
      {/* Nebula particles (increased visibility) */}
      <points>
        <sphereGeometry args={[70, 32, 32]} />
        <pointsMaterial
          color="#00bfff"
          size={0.4}
          transparent
          opacity={0.15} // Slightly more visible
          sizeAttenuation={true}
        />
      </points>

      {/* Globe (brighter and more visible) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
        <Sphere args={[1.8, 48, 48]} position={[0, 0, 0]}> {/* Slightly larger for visibility: 1.8 */}
          <meshStandardMaterial 
            color="#0077be"
            emissive="#0056a0" // Brighter emissive
            emissiveIntensity={0.4} // Increased glow
            roughness={0.2}
            metalness={0.6}
            envMapIntensity={2} // Higher reflection
          />
        </Sphere>
      </Float>

      {/* Equator Ring (more visible) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.9, 0.025, 16, 100]} />
        <meshStandardMaterial 
          color="#00bfff" 
          emissive="#00aaff" // Brighter
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Clouds (more visible) */}
      <Cloud position={[-1.2, 0.4, 0]} speed={0.1} opacity={0.6} />
      <Cloud position={[1.2, -0.4, 0]} speed={0.15} opacity={0.5} />
      <Cloud position={[0, 1, 0.8]} speed={0.12} opacity={0.7} />

      {/* 3D Text (more visible) */}
      <Float speed={0.6} rotationIntensity={0.2}>
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.45}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={1} // Fully opaque
          outlineColor="#0077be"
          outlineWidth={0.015}
        >
          Travel World
        </Text>
      </Float>

      {/* Orbit Path (more visible) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.3, 64]} />
        <meshBasicMaterial 
          color="#00bfff" 
          transparent 
          opacity={0.3} // Increased visibility
          side={2}
        />
      </mesh>
    </>
  );
}

// Scene Elements (made more visible)
function SceneElements() {
  return (
    <>
      {/* Floating Markers (brighter and larger) */}
      <Float speed={0.8} position={[3, 0.6, 1.8]}>
        <Sphere args={[0.2, 16, 16]}>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff4757" emissiveIntensity={0.6} />
        </Sphere>
        <Text position={[0.4, 0, 0]} fontSize={0.25} color="#ff6b6b" material-opacity={1}>
          Beach
        </Text>
      </Float>

      <Float speed={0.7} position={[-2.5, 0.4, -0.8]}>
        <Sphere args={[0.2, 16, 16]}>
          <meshStandardMaterial color="#4ecdc4" emissive="#45b7d1" emissiveIntensity={0.6} />
        </Sphere>
        <Text position={[-0.4, 0, 0]} fontSize={0.25} color="#4ecdc4" material-opacity={1}>
          Mountain
        </Text>
      </Float>

      {/* Ambient Particles (more visible) */}
      <points position={[0, 0, -4]}>
        <sphereGeometry args={[2, 24, 24]} />
        <pointsMaterial color="#ffffff" size={0.015} transparent opacity={0.6} />
      </points>
    </>
  );
}

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        // Made background even more transparent to let 3D shine through
        background: 'linear-gradient(135deg, rgba(10, 14, 46, 0.4) 0%, rgba(26, 31, 74, 0.3) 50%, rgba(12, 20, 69, 0.4) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Full Page 3D Canvas (ensured visibility) */}
      <Box
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none' // Keeps header clickable
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 65 }} // Closer camera (z=6) for better visibility, smaller fov
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: 'ACESA',
            outputEncoding: 'sRGBEncoding',
            physicallyCorrectLights: true // Better lighting
          }}
          style={{ 
            background: 'transparent',
            pointerEvents: 'none'
          }}
          shadows
        >
          {/* Enhanced Lighting for visibility */}
          <ambientLight intensity={0.4} color="#ffffff" /> {/* Brighter ambient */}
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" /> {/* Brighter point */}
          <pointLight position={[-10, -10, -10]} intensity={1} color="#00bfff" /> {/* Brighter blue */}
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" /> {/* Stronger directional */}
          <hemisphereLight intensity={0.3} skyColor="#ffffff" groundColor="#444444" /> {/* Hemisphere for even lighting */}
          
          <Suspense fallback={null}>
            <Environment preset="sunset" /> {/* Changed to sunset for warmer, more visible lighting */}
            <Globe />
            <SceneElements />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </Box>

      {/* Hero Content (made more transparent to show 3D better) */}
      <Container maxWidth="lg" sx={{ zIndex: 1, position: 'relative', py: 4 }}>
        <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
          <Paper
            elevation={6} // Reduced for subtlety
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: 'center',
              color: 'white',
              background: 'rgba(0, 0, 0, 0.15)', // Even more transparent
              backdropFilter: 'blur(10px)', // Reduced blur to see 3D through
              borderRadius: 3,
              border: `1px solid rgba(255, 255, 255, 0.08)`,
              boxShadow: theme.shadows[6],
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -1,
                left: -1,
                right: -1,
                bottom: -1,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                borderRadius: 'inherit',
                zIndex: -1,
                filter: 'blur(5px)'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.03)',
                borderRadius: 'inherit',
                zIndex: -1
              }
            }}
          >
            {/* Brand Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <IconButton
                sx={{ 
                  width: 70,
                  height: 70,
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  color: theme.palette.primary.main,
                  borderRadius: '50%',
                  boxShadow: theme.shadows[3],
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <ExploreIcon sx={{ fontSize: 35 }} />
              </IconButton>
            </Box>

            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: '800',
                mb: 2,
                background: `linear-gradient(45deg, #ffffff, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              উঁডাল চণ্ডী
            </Typography>

            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4,
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: 600,
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.4)'
              }}
            >
              যেখানে পথ চুমে নেয় তোমার কল্পনাকে। বাংলাদেশের সবচেয়ে সুন্দর এবং উত্তেজনাপূর্ণ স্থানগুলো ঘুরে দেখুন আমাদের সাথে।
            </Typography>

            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              component={Link} 
              to="/tours"
              sx={{
                minWidth: 220,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                boxShadow: theme.shadows[4],
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[6]
                }
              }}
              startIcon={<FlightIcon />}
            >
              অ্যাডভেঞ্চারের স্বাদ নিন
            </Button>

            <Typography 
              variant="body2" 
              sx={{ 
                mt: 3, 
                color: 'rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic'
              }}
            >
              ১০০+ সন্তুষ্ট ট্রাভেলারের সাথে যোগ দিন
            </Typography>
          </Paper>
        </Fade>
      </Container>

      {/* Quick Preview Cards (more transparent) */}
      <Box sx={{ zIndex: 1, width: '100%', mt: 5, pb: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Card 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.04)', // Very transparent
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  color: 'white',
                  '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <BeachIcon sx={{ fontSize: 36, color: '#ff6b6b', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>সমুদ্র সৈকত</Typography>
                  <Typography variant="body2">কক্সবাজারের মোহনা</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  color: 'white',
                  '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <MountainIcon sx={{ fontSize: 36, color: '#4ecdc4', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>পাহাড়ি অঞ্চল</Typography>
                  <Typography variant="body2">সিলেটের চা বাগান</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  color: 'white',
                  '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s ease' }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <PlaceIcon sx={{ fontSize: 36, color: '#ffe66d', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ঐতিহাসিক স্থান</Typography>
                  <Typography variant="body2">ঢাকার লালবাগ কেল্লা</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;