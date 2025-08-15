// models/job.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  note: String,
  status: { type: String, enum: ['Applied', 'Interview', 'Follow-up'] }
}, { _id: false });

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  deadline: Date,
  link: String,
  category: { type: String, enum: ['Full-time', 'Part-time', 'Internship'] },
  cvPath: String,
  status: { type: String, enum: ['Applied', 'Interview', 'Follow-up'], default: 'Applied' },
  history: [historySchema]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
