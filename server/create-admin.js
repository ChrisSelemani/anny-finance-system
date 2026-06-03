const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Delete existing admin
    await Admin.deleteMany({ username: 'anny_admin' });
    
    // Create new admin
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    const admin = new Admin({
      username: 'anny_admin',
      email: 'admin@annyfinance.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('Username: anny_admin');
    console.log('Password: Admin123!');
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();