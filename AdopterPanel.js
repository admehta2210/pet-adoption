import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function AdopterPanel() {
  const [pets, setPets] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsRes, appsRes] = await Promise.all([
          axios.get('http://localhost:3001/pets?status=available'),
          axios.get('http://localhost:3001/applications')
        ]);
        setPets(petsRes.data);
        setApplications(appsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (petId) => {
    try {
      const response = await axios.post('http://localhost:3001/applications', {
        petId,
        status: 'pending',
        date: new Date().toISOString()
      });
      setApplications([...applications, response.data]);
      setSuccess('Application submitted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'approved':
        return <Chip icon={<CheckCircleIcon />} label="Approved" color="success" />;
      case 'rejected':
        return <Chip icon={<CancelIcon />} label="Rejected" color="error" />;
      default:
        return <Chip label="Pending" color="warning" />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        <HowToRegIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Adopter Dashboard
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                <PetsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Available Pets
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Breed</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pets.map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell>{pet.name}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            disabled={applications.some(a => a.petId === pet.id)}
                            onClick={() => handleSubmit(pet.id)}
                            startIcon={<AssignmentTurnedInIcon />}
                          >
                            {applications.some(a => a.petId === pet.id) ? 'Applied' : 'Apply'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Your Applications
              </Typography>
              {applications.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No applications submitted yet.
                </Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Pet</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>
                            {pets.find(p => p.id === app.petId)?.name || 'Unknown'}
                          </TableCell>
                          <TableCell>
                            {getStatusChip(app.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default AdopterPanel;