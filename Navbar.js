import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

function Navbar({ user, logout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <PetsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          petAdopt
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1">
            {user.username} ({user.role})
          </Typography>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          {user.role === "admin" && (
            <Button color="inherit" component={Link} to="/admin">
              Admin Dashboard
            </Button>
          )}
          {user.role === "staff" && (
            <Button color="inherit" component={Link} to="/staff">
              Staff Dashboard
            </Button>
          )}
          {user.role === "adopter" && (
            <Button color="inherit" component={Link} to="/adopter">
              Adopter Dashboard
            </Button>
          )}
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
