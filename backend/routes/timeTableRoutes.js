const express = require('express');
const router = express.Router();
const timeTableController = require('../controllers/timeTableController')


router.get('/', timeTableController.getAllTimeTables);
router.get('/:id', timeTableController.getTimeTableById);
router.put('/:id', timeTableController.updateTimeTable);
router.post('/', timeTableController.createTimeTable);
router.delete('/:id', timeTableController.deleteTimeTable);

module.exports = router;