// import { useState } from 'react';

// function Login({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ username, password })
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Set localStorage
//         localStorage.setItem('isAdmin', 'true');
//         localStorage.setItem('adminUsername', data.admin.username);
//         // Call the onLogin callback
//         onLogin(true);
//         // Redirect to home
//         window.location.href = '/';
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (err) {
//       setError('Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       padding: '20px'
//     }}>
//       <div style={{
//         background: 'white',
//         borderRadius: '20px',
//         padding: '40px',
//         width: '100%',
//         maxWidth: '400px',
//         boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
//       }}>
//         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//           <div style={{ fontSize: '60px', marginBottom: '10px' }}>💰</div>
//           <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '5px' }}>Anny Finance</h1>
//           <p style={{ color: '#666' }}>Admin Portal</p>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               placeholder="Enter username"
//               style={{
//                 width: '100%',
//                 padding: '12px 15px',
//                 border: '2px solid #e0e0e0',
//                 borderRadius: '10px',
//                 fontSize: '16px'
//               }}
//             />
//           </div>
          
//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter password"
//               style={{
//                 width: '100%',
//                 padding: '12px 15px',
//                 border: '2px solid #e0e0e0',
//                 borderRadius: '10px',
//                 fontSize: '16px'
//               }}
//             />
//           </div>
          
//           {error && (
//             <div style={{
//               background: '#fee',
//               color: '#c33',
//               padding: '10px',
//               borderRadius: '8px',
//               marginBottom: '20px',
//               textAlign: 'center'
//             }}>
//               {error}
//             </div>
//           )}
          
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: '100%',
//               padding: '12px',
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               fontSize: '16px',
//               fontWeight: '600',
//               cursor: 'pointer'
//             }}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
        
//         <div style={{
//           marginTop: '25px',
//           padding: '15px',
//           background: '#f8f9fa',
//           borderRadius: '10px',
//           fontSize: '12px',
//           textAlign: 'center'
//         }}>
//           <p>Demo Credentials:</p>
//           <p>Username: <strong>anny_admin</strong></p>
//           <p>Password: <strong>Admin123!</strong></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUsername', data.admin.username);
        onLogin(true);
        window.location.href = '/';
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>💰</div>
          <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '5px' }}>Anny Finance</h1>
          <p style={{ color: '#666' }}>Admin Portal</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '16px'
              }}
            />
          </div>
          
          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;