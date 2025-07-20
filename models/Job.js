const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: String,
  position: String,
  deadline: Date,
  link: String,
  category: { type: String, enum: ['Full-time', 'Part-time', 'Internship'] },
  cvPath: String,
});

module.exports = mongoose.model('Job', jobSchema);
