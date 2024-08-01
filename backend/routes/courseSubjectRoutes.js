const express = require('express');
const router = express.Router();
const courseSubjectController = require('../controllers/courseSubjectsController');


router.get('/', courseSubjectController.getAllCourseSubjects);
router.post('/', courseSubjectController.createCourseSubject);
router.get('/:id', courseSubjectController.getCourseSubjectById);
router.put('/:id', courseSubjectController.updateCourseSubject);
router.delete('/:id', courseSubjectController.deleteCourseSubject);

module.exports = router;