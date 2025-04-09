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
  Select,
  MenuItem
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PetsIcon from '@mui/icons-material/Pets';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';

function StaffPanel() {
  const [applications, setApplications] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, petsRes] = await Promise.all([
          axios.get('http://localhost:3001/applications'),
          axios.get('http://localhost:3001/pets')
        ]);
        setApplications(appsRes.data);
        setPets(petsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateApplication = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3001/applications/${id}`, { status });
      setApplications(applications.map(app => 
        app.id === id ? {...app, status} : app
      ));
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const updatePetStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3001/pets/${id}`, { status });
      setPets(pets.map(pet => 
        pet.id === id ? {...pet, status} : pet
      ));
    } catch (error) {
      console.error('Error updating pet status:', error);
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
        <GroupIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Staff Dashboard
      </Typography>

      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                <PetsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Pet Management
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Breed</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pets.map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell>{pet.name}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell>
                          <Select
                            value={pet.status}
                            onChange={(e) => updatePetStatus(pet.id, e.target.value)}
                            size="small"
                          >
                            <MenuItem value="available">Available</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="adopted">Adopted</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                <AssignmentIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Adoption Applications
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Pet</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
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
                        <TableCell align="right">
                          <Button
                            size="small"
                            color="success"
                            disabled={app.status === 'approved'}
                            onClick={() => updateApplication(app.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            disabled={app.status === 'rejected'}
                            onClick={() => updateApplication(app.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default StaffPanel;