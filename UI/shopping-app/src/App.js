import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Button, Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { isAuthenticated, isAdmin } from './utils/auth';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Set dark mode based on user preference (optional)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Toggle theme and save user preference
  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Container>
          <Button onClick={toggleTheme} variant="contained" sx={{ marginTop: 2 }}>
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
          </Button>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                isAuthenticated() && isAdmin() ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
