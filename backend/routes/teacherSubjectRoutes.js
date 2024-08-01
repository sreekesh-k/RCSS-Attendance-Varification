const express = require('express');
const router = express.Router();
const teacherSubjectController = require('../controllers/teacherSubjectController');


router.get('/', teacherSubjectController.getAllTeacherSubjects);
router.post('/', teacherSubjectController.createTeacherSubject);
router.get('/:id',teacherSubjectController.getTeacherSubjectById);
router.put('/:id', teacherSubjectController.updateTeacherSubject);
router.delete('/:id',teacherSubjectController.deleteTeacherSubject);
