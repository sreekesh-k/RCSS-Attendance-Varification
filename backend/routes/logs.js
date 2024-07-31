const express = require('express');
const router = express.Router();
const Log = require('../models/Logs');
// routes/logs.js
router.post('/', async (req, res) => {
  try {
    const { date, courseName, teacherName, students, semester } = req.body;
    if (!date || !courseName || !teacherName || !students || semester === undefined) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newLog = new Log({
      date,
      courseName,
      teacherName,
      students,
      semester, // Include semester when creating a new log
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});




router.route('/all').get((req, res) => {
  const { startDate, endDate } = req.query;

  let query = {};

  if (startDate && endDate) {
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    query.date = {
      $gte: start,
      $lte: end
    };
  }

  Log.find(query)
    .then(logs => res.json(logs))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
