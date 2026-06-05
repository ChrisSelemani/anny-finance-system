// import { useState, useEffect } from 'react';
// import Home from './pages/Home';
// import Login from './pages/Login';

// function App() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     checkAdminStatus();
//   }, []);

//   const checkAdminStatus = async () => {
//     try {
//       const localAdmin = localStorage.getItem('isAdmin');
      
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
//         credentials: 'include'
//       });
      
//       if (response.status === 200) {
//         const data = await response.json();
//         if (data.success) {
//           setIsAdmin(true);
//           localStorage.setItem('isAdmin', 'true');
//         } else {
//           setIsAdmin(false);
//           localStorage.removeItem('isAdmin');
//         }
//       } else {
//         setIsAdmin(false);
//         localStorage.removeItem('isAdmin');
//       }
//     } catch (error) {
//       console.error('Check admin error:', error);
//       setIsAdmin(false);
//       localStorage.removeItem('isAdmin');
//     } finally {
//       setIsChecking(false);
//     }
//   };

//   const handleLogin = (status) => {
//     setIsAdmin(status);
//     if (status) {
//       localStorage.setItem('isAdmin', 'true');
//     }
//   };

//   const handleLogout = () => {
//     setIsAdmin(false);
//     localStorage.removeItem('isAdmin');
//   };

//   const isAdminRoute = window.location.pathname === '/admin';

//   if (isChecking) {
//     return <div style={{ 
//       minHeight: '100vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       color: 'white',
//       fontSize: '20px'
//     }}>Loading...</div>;
//   }

//   if (isAdminRoute) {
//     return <Login onLogin={handleLogin} />;
//   }

//   return <Home isAdmin={isAdmin} onLogout={handleLogout} />;
// }

// export default App;



import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include'
      });
      
      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
        } else {
          setIsAdmin(false);
          localStorage.removeItem('isAdmin');
        }
      } else {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
      }
    } catch (error) {
      console.error('Check admin error:', error);
      setIsAdmin(false);
      localStorage.removeItem('isAdmin');
    } finally {
      setIsChecking(false);
    }
  };

  const handleLogin = (status) => {
    setIsAdmin(status);
    if (status) {
      localStorage.setItem('isAdmin', 'true');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const isAdminRoute = window.location.pathname === '/admin';

  if (isChecking) {
    return <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '20px'
    }}>Loading...</div>;
  }

  if (isAdminRoute) {
    return <Login onLogin={handleLogin} />;
  }

  return <Home isAdmin={isAdmin} onLogout={handleLogout} />;
}

export default App;