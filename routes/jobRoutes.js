
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const jobController = require('../controllers/jobController');

router.get('/', jobController.getJobs);
router.post('/add', upload.single('cv'), jobController.addJob);
router.get('/delete/:id', jobController.deleteJob);

// NEW: update status + note (timeline)
router.post('/jobs/:id/status', jobController.updateStatus);

module.exports = router;
