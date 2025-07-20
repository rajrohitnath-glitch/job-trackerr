const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.render('index', { jobs });
};

exports.addJob = async (req, res) => {
  const job = new Job(req.body);
  if (req.file) job.cvPath = req.file.path;
  await job.save();
  res.redirect('/');
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
