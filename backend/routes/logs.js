const express = require('express');
const router = express.Router();
const Log = require('../models/Logs');

router.post('/', async (req, res) => {
  try {
    const { dateFilledByUser, courseName, teacherName, students } = req.body;
    if (!dateFilledByUser || !courseName || !teacherName || !students) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newLog = new Log({
      dateFilledByUser,
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

module.exports = router;
