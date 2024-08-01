const express = require('express');
const router = express.Router();

const courseRouter = require('./courseRoutes')
const subjectRouter = require('./subjectRoutes')
const courseSubjectRouter = require('./courseSubjectRoutes');
const teacherRouter = require('./teacherRoutes');
const teacherSubjectRouter = require('./teacherSubjectRoutes');
const timeSlotRouter = require('./timeSlotRoutes');
const timeTableRouter = require('./timeTableRoutes')

router.use('/courses', courseRouter);
router.use('/subjects', subjectRouter);
router.use('/course-subjects', courseSubjectRouter);
router.use('/teachers', teacherRouter);
router.use('/teacher-teaches-subjects', teacherSubjectRouter);
router.use('/time-slots', timeSlotRouter);
router.use('/timetables', timeTableRouter);

module.exports = router;
