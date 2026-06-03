// const mongoose = require('mongoose');

// const agreementSchema = new mongoose.Schema({
//   borrower_name: {
//     type: String,
//     required: [true, 'Borrower name is required']
//   },
//   borrower_email: {
//     type: String,
//     required: [true, 'Borrower email is required'],
//     lowercase: true
//   },
//   borrower_phone: {
//     type: String,
//     required: [true, 'Phone number is required']
//   },
//   borrower_address: {
//     type: String,
//     default: ''
//   },
//   borrower_photo: {
//     type: String,  // Base64 or URL
//     required: [true, 'Borrower photo is required']
//   },
//   borrower_photo_url: {
//     type: String,
//     default: ''
//   },
//   principal_amount: {
//     type: Number,
//     required: [true, 'Principal amount is required']
//   },
//   repayment_amount: {
//     type: Number,
//     required: [true, 'Repayment amount is required']
//   },
//   interest_rate: {
//     type: Number,
//     default: 0
//   },
//   loan_term_months: {
//     type: Number,
//     required: [true, 'Loan term is required']
//   },
//   digital_signature: {
//     type: String,  // Base64 of signature
//     required: [true, 'Digital signature is required']
//   },
//   signature_date: {
//     type: Date,
//     default: Date.now
//   },
//   agreement_id: {
//     type: String,
//     unique: true,
//     default: () => 'FIN-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
//   },
//   status: {
//     type: String,
//     enum: ['draft', 'pending', 'signed', 'active', 'completed', 'defaulted'],
//     default: 'pending'
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   },
//   signed_at: {
//     type: Date,
//     default: null
//   },
//   notes: {
//     type: String,
//     default: ''
//   }
// });

// module.exports = mongoose.model('Agreement', agreementSchema);


const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
  borrower_name: {
    type: String,
    required: [true, 'Borrower name is required']
  },
  borrower_email: {
    type: String,
    required: [true, 'Borrower email is required'],
    lowercase: true
  },
  borrower_phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  borrower_address: {
    type: String,
    default: ''
  },
  borrower_photo: {
    type: String,
    default: ''
  },
  borrower_photo_url: {
    type: String,
    default: ''
  },
  principal_amount: {
    type: Number,
    required: [true, 'Principal amount is required']
  },
  repayment_amount: {
    type: Number,
    required: [true, 'Repayment amount is required']
  },
  interest_rate: {
    type: Number,
    default: 0
  },
  loan_term: {
    type: String,
    required: [true, 'Loan term is required']
  },
  loan_term_days: {
    type: Number,
    default: 0
  },
  digital_signature: {
    type: String,
    default: ''
  },
  signature_date: {
    type: Date,
    default: Date.now
  },
  agreement_id: {
    type: String,
    unique: true,
    default: () => 'FIN-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'signed', 'active', 'completed', 'defaulted'],
    default: 'pending'
  },
  currency: {
    type: String,
    default: 'EUR'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  signed_at: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Agreement', agreementSchema);