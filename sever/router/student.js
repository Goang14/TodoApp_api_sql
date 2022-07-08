const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/student', studentController.getall);
router.post('/student/create', studentController.create)
router.put('/student/:id', studentController.edit)
router.delete('/student/:id', studentController.delete)

module.exports = router;