import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import StaffPanel from "./components/StaffPanel";
import AdopterPanel from "./components/AdopterPanel";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {user && <Navbar user={user} logout={logout} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              user ? <Navigate to={`/${user.role}`} /> : <Login login={login} />
            }
          />
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? <AdminPanel /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/staff"
            element={
              user?.role === "staff" ? <StaffPanel /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/adopter"
            element={
              user?.role === "adopter" ? (
                <AdopterPanel />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/home" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
