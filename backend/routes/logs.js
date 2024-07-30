const express = require('express');
const router = express.Router();
const Log = require('../models/Logs');

router.post('/', async (req, res) => {
  try {
    const { date, courseName, teacherName, students } = req.body;
    if (!date || !courseName || !teacherName || !students) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newLog = new Log({
      date,
      courseName,
      teacherName,
      students,
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.route('/all').get((req, res) => {
  Log.find()
    .then(logs => res.json(logs))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
