import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Paper,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const features = [
  {
    icon: <PetsIcon fontSize="large" />,
    title: "Find Your Perfect Pet",
    description: "Browse our wide selection of adorable pets waiting for their forever homes."
  },
  {
    icon: <FamilyRestroomIcon fontSize="large" />,
    title: "Easy Adoption Process",
    description: "Our streamlined process makes it simple to adopt your new family member."
  },
  {
    icon: <VolunteerActivismIcon fontSize="large" />,
    title: "Support Animal Welfare",
    description: "Every adoption helps support our mission to rescue and care for animals in need."
  }
];

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to petAdopt
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Connecting loving homes with pets in need
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              component={Link} 
              to="/login"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large" 
              component={Link} 
              to="/login"
            >
              Sign Up
            </Button>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Adopt With Us?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', mb: 2, width: 60, height: 60 }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography align="center">
                    {feature.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" color="primary">1</Typography>
                <Typography variant="h6">Browse Pets</Typography>
                <Typography>
                  View our available pets and find your perfect match
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" color="primary">2</Typography>
                <Typography variant="h6">Submit Application</Typography>
                <Typography>
                  Complete our simple online adoption form
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" color="primary">3</Typography>
                <Typography variant="h6">Bring Home Your Pet</Typography>
                <Typography>
                  Finalize the adoption and welcome your new family member
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <HowToRegIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Ready to Find Your New Best Friend?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Join our community of pet lovers and give an animal a second chance at happiness.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          component={Link} 
          to="/login"
          sx={{ px: 6, py: 2 }}
        >
          Get Started
        </Button>
      </Container>

      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                petAdopt
              </Typography>
              <Typography>
                Dedicated to finding loving homes for pets in need.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" gutterBottom>
                Links
              </Typography>
              <Typography component={Link} to="/" color="inherit" display="block">
                Home
              </Typography>
              <Typography component={Link} to="/login" color="inherit" display="block">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" gutterBottom>
                Contact
              </Typography>
              <Typography>123 Pet Lane</Typography>
              <Typography>Anytown, USA</Typography>
              <Typography>info@happypaws.com</Typography>
            </Grid>
          </Grid>
          <Typography align="center" sx={{ mt: 4 }}>
            © {new Date().getFullYear()} petAdopt Center
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;