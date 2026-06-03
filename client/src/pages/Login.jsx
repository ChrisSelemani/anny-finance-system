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
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ username, password })
//       });

//       const data = await response.json();

//       if (data.success) {
//         localStorage.setItem('isAdmin', 'true');
//         localStorage.setItem('adminUsername', data.admin.username);
//         onLogin(true);
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

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters');
      return;
    }

    setPasswordMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          username: 'anny_admin',
          oldPassword: password,
          newPassword: newPassword 
        })
      });

      const data = await response.json();

      if (data.success) {
        setPasswordMessage('✅ Password changed successfully! Please login with new password.');
        setShowChangePassword(false);
        setNewPassword('');
        setConfirmPassword('');
        setPassword('');
      } else {
        setPasswordMessage('❌ ' + data.error);
      }
    } catch (err) {
      setPasswordMessage('❌ Failed to change password');
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
        
        {!showChangePassword ? (
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
            
            <button
              type="button"
              onClick={() => setShowChangePassword(true)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'transparent',
                color: '#667eea',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '15px'
              }}
            >
              Forgot Password? Change Password
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Current Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '16px'
                }}
              />
            </div>
            
            {passwordMessage && (
              <div style={{
                background: passwordMessage.includes('✅') ? '#e8f5e9' : '#fee',
                color: passwordMessage.includes('✅') ? '#2e7d32' : '#c33',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
                fontSize: '14px'
              }}>
                {passwordMessage}
              </div>
            )}
            
            <button
              type="submit"
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
              Change Password
            </button>
            
            <button
              type="button"
              onClick={() => {
                setShowChangePassword(false);
                setPasswordMessage('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              style={{
                width: '100%',
                padding: '10px',
                background: 'transparent',
                color: '#666',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '15px'
              }}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;