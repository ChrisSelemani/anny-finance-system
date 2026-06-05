// // const express = require('express');
// // const jwt = require('jsonwebtoken');
// // const Admin = require('../models/Admin');
// // const authMiddleware = require('../middleware/auth');

// // const router = express.Router();
// // const JWT_SECRET = process.env.JWT_SECRET || 'anny_finance_super_secret_key_2024';

// // // Create default admin (run once)
// // const createDefaultAdmin = async () => {
// //   try {
// //     const existingAdmin = await Admin.findOne({ username: 'anny_admin' });
// //     if (!existingAdmin) {
// //       const admin = new Admin({
// //         username: 'anny_admin',
// //         email: 'admin@annyfinance.com',
// //         password: 'Admin123!'
// //       });
// //       await admin.save();
// //       console.log('✅ Default admin created: username: anny_admin, password: Admin123!');
// //     }
// //   } catch (error) {
// //     console.error('Admin creation error:', error.message);
// //   }
// // };
// // createDefaultAdmin();

// // // Login route
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { username, password } = req.body;
    
// //     const admin = await Admin.findOne({ username });
// //     if (!admin) {
// //       return res.status(401).json({ success: false, error: 'Invalid credentials' });
// //     }
    
// //     const isValid = await admin.comparePassword(password);
// //     if (!isValid) {
// //       return res.status(401).json({ success: false, error: 'Invalid credentials' });
// //     }
    
// //     const token = jwt.sign(
// //       { id: admin._id, username: admin.username, role: admin.role },
// //       JWT_SECRET,
// //       { expiresIn: '24h' }
// //     );
    
// //     res.cookie('token', token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'lax',
// //       maxAge: 24 * 60 * 60 * 1000
// //     });
    
// //     res.json({
// //       success: true,
// //       message: 'Login successful',
// //       admin: { id: admin._id, username: admin.username, email: admin.email }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // });

// // // Logout route
// // router.post('/logout', (req, res) => {
// //   res.clearCookie('token');
// //   res.json({ success: true, message: 'Logged out successfully' });
// // });

// // // Check auth status
// // router.get('/me', authMiddleware, async (req, res) => {
// //   try {
// //     const admin = await Admin.findById(req.admin.id).select('-password');
// //     res.json({ success: true, admin });
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const Admin = require('../models/Admin');
// const authMiddleware = require('../middleware/auth');

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'anny_finance_super_secret_key_2024';

// // Create default admin (run once)
// const createDefaultAdmin = async () => {
//   try {
//     const existingAdmin = await Admin.findOne({ username: 'anny_admin' });
//     if (!existingAdmin) {
//       const admin = new Admin({
//         username: 'anny_admin',
//         email: 'admin@annyfinance.com',
//         password: 'Admin123!'
//       });
//       await admin.save();
//       console.log('✅ Default admin created');
//     } else {
//       console.log('✅ Admin already exists');
//     }
//   } catch (error) {
//     console.error('Admin creation error:', error.message);
//   }
// };
// createDefaultAdmin();

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }
    
//     const isValid = await admin.comparePassword(password);
//     if (!isValid) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }
    
//     const token = jwt.sign(
//       { id: admin._id, username: admin.username, role: admin.role },
//       JWT_SECRET,
//       { expiresIn: '24h' }
//     );
    
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 24 * 60 * 60 * 1000
//     });
    
//     res.json({
//       success: true,
//       message: 'Login successful',
//       admin: { id: admin._id, username: admin.username, email: admin.email }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Logout route
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ success: true, message: 'Logged out successfully' });
// });

// // Check auth status
// router.get('/me', authMiddleware, async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.admin.id).select('-password');
//     res.json({ success: true, admin });
//   } catch (error) {
//     console.error('Auth check error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Change password route
// router.post('/change-password', async (req, res) => {
//   try {
//     const { username, oldPassword, newPassword } = req.body;
    
//     console.log('Change password request for:', username);
    
//     // Validate new password length
//     if (!newPassword || newPassword.length < 6) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'New password must be at least 6 characters long' 
//       });
//     }
    
//     // Find admin
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(404).json({ success: false, error: 'Admin not found' });
//     }
    
//     // Verify old password
//     const isValid = await admin.comparePassword(oldPassword);
//     if (!isValid) {
//       return res.status(401).json({ success: false, error: 'Current password is incorrect' });
//     }
    
//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
    
//     // Update password
//     admin.password = hashedPassword;
//     await admin.save();
    
//     console.log('Password changed successfully for:', username);
    
//     // Clear existing session to force re-login
//     res.clearCookie('token');
    
//     res.json({ 
//       success: true, 
//       message: 'Password changed successfully. Please login with your new password.' 
//     });
//   } catch (error) {
//     console.error('Change password error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;



const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'anny_finance_super_secret_key_2024';

// Create default admin (run once)
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'anny_admin' });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'anny_admin',
        email: 'admin@annyfinance.com',
        password: 'Admin123!'
      });
      await admin.save();
      console.log('✅ Default admin created');
    } else {
      console.log('✅ Admin already exists');
    }
  } catch (error) {
    console.error('Admin creation error:', error.message);
  }
};
createDefaultAdmin();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Updated cookie settings for cross-domain (Vercel + Render)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.json({
      success: true,
      message: 'Login successful',
      admin: { id: admin._id, username: admin.username, email: admin.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Check auth status
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json({ success: true, admin });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Change password route
router.post('/change-password', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    
    console.log('Change password request for:', username);
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'New password must be at least 6 characters long' 
      });
    }
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }
    
    const isValid = await admin.comparePassword(oldPassword);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    
    console.log('Password changed successfully for:', username);
    
    res.clearCookie('token');
    
    res.json({ 
      success: true, 
      message: 'Password changed successfully. Please login with your new password.' 
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;