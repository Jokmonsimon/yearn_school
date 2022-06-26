const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  duration: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Declined'],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
});

module.exports = mongoose.model('Course', CourseSchema);
