const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  dateOfBirth: { type: String },
  address: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  nationality: { type: String },
  education: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Declined'],
  },
});

module.exports = mongoose.model('Instructor', InstructorSchema);