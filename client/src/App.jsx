import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
    
    // Check URL for /admin route
    if (window.location.pathname === '/admin') {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, []);

  const handleLogin = (status) => {
    setIsAdmin(status);
    if (status) {
      window.location.href = '/';
    }
  };

  // Show login page if URL is /admin
  if (window.location.pathname === '/admin') {
    return <Login onLogin={handleLogin} />;
  }

  // Show home page for all other routes
  return <Home />;
}

export default App;