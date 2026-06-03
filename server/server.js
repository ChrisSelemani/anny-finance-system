const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const Agreement = require('./models/Agreement');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Auth routes (public)
app.use('/api/auth', authRoutes);

// Test route (public)
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is running with MongoDB!',
    timestamp: new Date()
  });
});

// GET all agreements (public)
app.get('/api/agreements', async (req, res) => {
  try {
    const agreements = await Agreement.find().sort({ created_at: -1 });
    res.json({
      success: true,
      count: agreements.length,
      data: agreements
    });
  } catch (error) {
    console.error('Get agreements error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single agreement (public)
app.get('/api/agreements/:id', async (req, res) => {
  try {
    const agreement = await Agreement.findById(req.params.id);
    if (!agreement) {
      return res.status(404).json({ success: false, error: 'Agreement not found' });
    }
    res.json({ success: true, data: agreement });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// CREATE agreement (public - anyone can create)
app.post('/api/agreements', async (req, res) => {
  try {
    console.log('Creating agreement for:', req.body.borrower_name);
    
    const agreementData = {
      borrower_name: req.body.borrower_name,
      borrower_email: req.body.borrower_email,
      borrower_phone: req.body.borrower_phone || '000000000',
      borrower_address: req.body.borrower_address || '',
      borrower_photo: req.body.borrower_photo || '',
      principal_amount: parseFloat(req.body.principal_amount) || 0,
      repayment_amount: parseFloat(req.body.repayment_amount) || 0,
      interest_rate: parseFloat(req.body.interest_rate) || 0,
      loan_term: req.body.loan_term || '1 month',
      digital_signature: req.body.digital_signature || '',
      notes: req.body.notes || '',
      currency: 'EUR',
      status: 'pending'
    };
    
    const agreement = new Agreement(agreementData);
    await agreement.save();
    
    console.log('✅ Agreement created:', agreement._id);
    
    res.status(201).json({ 
      success: true, 
      data: agreement,
      message: 'Agreement created successfully'
    });
  } catch (error) {
    console.error('Create error:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message
    });
  }
});

// DELETE agreement (protected - admin only)
app.delete('/api/agreements/:id', authMiddleware, async (req, res) => {
  try {
    const agreement = await Agreement.findByIdAndDelete(req.params.id);
    if (!agreement) {
      return res.status(404).json({ success: false, error: 'Agreement not found' });
    }
    res.json({ success: true, message: 'Agreement deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(`🔐 Admin: anny_admin / Admin123!\n`);
});