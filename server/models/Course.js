const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Declined'],
  },
});

module.exports = mongoose.model('Course', CourseSchema);
