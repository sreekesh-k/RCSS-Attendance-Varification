const express = require('express');
const router = express.Router();

const courseRouter = require('./courseRoutes')
const subjectRouter = require('./subjectRoutes')
const teacherRouter = require('./teacherRoutes');
const timeSlotRouter = require('./timeSlotRoutes');
const timeTableRouter = require('./timeTableRoutes')

router.use('/courses', courseRouter);
router.use('/subjects', subjectRouter);
router.use('/teachers', teacherRouter);
router.use('/timeslots', timeSlotRouter);
router.use('/timetables', timeTableRouter);

module.exports = router;
