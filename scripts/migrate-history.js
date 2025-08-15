
const mongoose = require('mongoose');
const Job = require('../models/Job');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/jobtracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const jobs = await Job.find({});
    for (const job of jobs) {
      let changed = false;
      if (!job.status) {
        job.status = 'Applied';
        changed = true;
      }
      if (!job.history || job.history.length === 0) {
        job.history = [{
          status: job.status,
          note: 'Backfilled initial status',
          date: new Date(),
        }];
        changed = true;
      }
      if (changed) {
        await job.save();
        console.log('Updated job', job._id.toString());
      }
    }
    console.log('Done.');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
