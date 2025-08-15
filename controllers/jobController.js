
const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.render('index', { jobs });
};

exports.addJob = async (req, res) => {
  try {
    const { company, position, deadline, link, category, status } = req.body;
    const job = new Job({
      company,
      position,
      deadline: deadline ? new Date(deadline) : undefined,
      link,
      category,
      status: status || 'Applied',
    });

    if (req.file) job.cvPath = req.file.path;

    // Initial history entry
    job.history = job.history || [];
    job.history.push({
      status: job.status,
      note: 'Job created',
      date: new Date(),
    });

    await job.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error adding job:', err);
    res.status(500).send('Error adding job');
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).send('Error deleting job');
  }
};

// NEW: update status and append to history timeline
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;
    const job = await Job.findById(id);
    if (!job) return res.status(404).send('Job not found');

    // Only allow valid statuses
    const allowed = ['Applied', 'Interview', 'Follow-up'];
    const nextStatus = allowed.includes(status) ? status : 'Applied';

    job.status = nextStatus;
    job.history.push({
      status: nextStatus,
      note: note || '',
      date: new Date(),
    });

    await job.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).send('Error updating status');
  }
};
