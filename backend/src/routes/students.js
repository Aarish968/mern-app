const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudent, validateUpdateStudent } = require('../validations/studentValidation');
const { authenticate, authorize } = require('../middlewares/auth');
const { ROLES } = require('../constants/roles');

// All routes require authentication
router.use(authenticate);

// Admin-only routes
router.get('/admin/all', authorize(ROLES.ADMIN), studentController.getAllStudents);
router.get('/admin/stats', authorize(ROLES.ADMIN), studentController.getStudentStats);
router.get('/admin/:id', authorize(ROLES.ADMIN), studentController.getStudentById);
router.post('/admin/create', authorize(ROLES.ADMIN), validateStudent, studentController.createStudent);
router.put('/admin/:id', authorize(ROLES.ADMIN), validateUpdateStudent, studentController.updateStudent);
router.delete('/admin/:id', authorize(ROLES.ADMIN), studentController.deleteStudent);

// Student routes
router.get('/profile', authorize(ROLES.STUDENT), studentController.getMyProfile);
router.put('/profile', authorize(ROLES.STUDENT), validateUpdateStudent, studentController.updateMyProfile);

module.exports = router;
