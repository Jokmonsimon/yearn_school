const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String },
  subject: { type: String },
  weight: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  status: {
    type: String,
    enum: ['Project not started', 'Ongoing project', 'Project over'],
  },
  progress: { type: String },
  reviewType: { type: String },
  autoQAReview: { type: String },
  mandatoryScore: { type: String },
  advancedScore: { type: String },
  totalScore: { type: String },
  concepts: { type: String },
  description: { type: String },
  tasks: { type: String },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
