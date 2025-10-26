const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['Owner', 'Manager', 'Member'],
    default: 'Member'
  },

  balance: {
    type: Number,
    default: 0
  },
  
  // Profile info
  companyName: { type: String, default: '' },
  contactPerson: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  // Company Address
  address: {
    country: { type: String, default: '' },
    provinceState: { type: String, default: '' },
    unitNumber: { type: String, default: '' },
    streetNumber: { type: String, default: '' },
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    postalCode: { type: String, default: '' }
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
