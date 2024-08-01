const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const subjectController = require('../controllers/subjectController');
const courseSubjectController = require('../controllers/courseSubjectsController');
const teacherController = require('../controllers/teacherController');
const teacherSubjectController = require('../controllers/teacherSubjectController');
const timeSlotController = require('../controllers/timeSlotController');
const timeTableController = require('../controllers/timeTableController')

const prisma = new PrismaClient();

router.get('/courses', courseController.getAllCourses);
router.post('/courses', courseController.createCourse);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);


router.get('/subjects', subjectController.getAllSubjects);
router.post('/subjects', subjectController.createSubject);
router.get('/subjects/:id', subjectController.getSubjectById);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);


router.get('/course-subjects', courseSubjectController.getAllCourseSubjects);
router.post('/course-subjects', courseSubjectController.createCourseSubject);
router.get('/course-subjects/:id', courseSubjectController.getCourseSubjectById);
router.put('/course-subjects/:id', courseSubjectController.updateCourseSubject);
router.delete('/course-subjects/:id', courseSubjectController.deleteCourseSubject);

router.get('/teachers', teacherController.getAllTeachers);
router.post('/teachers', teacherController.createTeacher);
router.get('/teachers/:id',teacherController.getTeacherById);
router.put('/teachers/:id', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);


router.get('/teacher-teaches-subjects', teacherSubjectController.getAllTeacherSubjects);
router.post('/teacher-teaches-subjects', teacherSubjectController.createTeacherSubject);
router.get('/teacher-teaches-subjects/:id',teacherSubjectController.getTeacherSubjectById);
router.put('/teacher-teaches-subjects/:id', teacherSubjectController.updateTeacherSubject);
router.delete('/teacher-teaches-subjects/:id',teacherSubjectController.deleteTeacherSubject);

router.get('/time-slots', timeSlotController.getAllTimeSlots);
router.get('/time-slots/:id',timeSlotController.getTimeSlotById);
router.post('/time-slots', timeSlotController.createTimeSlot);
router.put('/time-slots/:id', timeSlotController.updateTimeSlot);
router.delete('/time-slots/:id',timeSlotController.deleteTimeSlot);

router.get('/timetables', timeTableController.getAllTimeTables);
router.get('/timetables/:id', timeTableController.getTimeTableById);
router.put('/timetables/:id', timeTableController.updateTimeTable);
router.post('/timetables',timeTableController.createTimeTable);
router.delete('/timetables/:id',timeTableController.deleteTimeTable);






module.exports = router;
