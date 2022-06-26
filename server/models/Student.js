const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  dateOfBirth: { type: String },
  emmergencyContactName: { type: String },
  emmergencyContactRelation: { type: String },
  emmergencyContactPhoneNumber: { type: String },
  street: { type: String },
  city: { type: String },
  zipcode: { type: String },
  state: { type: String },
  country: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  githubUsername: { type: String },
  twitterUsername: { type: String },
  linkedInURL: { type: String },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
});

module.exports = mongoose.model('Student', StudentSchema);
