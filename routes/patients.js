const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patient_controller');
const {auth} = require('../config/authMiddleware');

router.use(auth);

router.post('/register', patientController.register);
router.post('/:id/create_report', patientController.createReport);
router.get('/:id/all_reports', patientController.allReports);

module.exports = router;