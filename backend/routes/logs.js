const express = require('express');
const router = express.Router();
const Log = require('../models/Logs');


router.post('/', async (req, res) => {
  try {
    const { date, start_time, end_time, programme, sem, subject, faculty_Name, total_no_of_absenties, students } = req.body;


    if (!date || !start_time || !end_time || !programme || !sem || !subject || !faculty_Name || !total_no_of_absenties || !students) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newLog = new Log({
      date,
      start_time,
      end_time,
      programme,
      sem,
      subject,
      faculty_Name,
      total_no_of_absenties,
      students
    });


    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error creating log entry:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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
