const studentService = require('../services/studentService');
const responseFormatter = require('../utils/responseFormatter');
const MESSAGES = require('../constants/messages');

class StudentController {
  async getAllStudents(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      const result = await studentService.getAllStudents(page, limit, search);
      
      responseFormatter.success(
        res,
        result,
        MESSAGES.GENERAL.SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }

  async getStudentById(req, res, next) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      
      responseFormatter.success(
        res,
        student,
        MESSAGES.GENERAL.SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }

  async getMyProfile(req, res, next) {
    try {
      const student = await studentService.getStudentByUserId(req.user._id);
      
      responseFormatter.success(
        res,
        student,
        MESSAGES.GENERAL.SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }

  async createStudent(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body, req.user._id);
      
      responseFormatter.success(
        res,
        student,
        MESSAGES.STUDENT.CREATED,
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async updateStudent(req, res, next) {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      
      responseFormatter.success(
        res,
        student,
        MESSAGES.STUDENT.UPDATED
      );
    } catch (error) {
      next(error);
    }
  }

  async updateMyProfile(req, res, next) {
    try {
      const student = await studentService.getStudentByUserId(req.user._id);
      const updatedStudent = await studentService.updateStudent(student._id, req.body);
      
      responseFormatter.success(
        res,
        updatedStudent,
        MESSAGES.STUDENT.UPDATED
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteStudent(req, res, next) {
    try {
      const result = await studentService.deleteStudent(req.params.id);
      
      responseFormatter.success(
        res,
        result,
        MESSAGES.STUDENT.DELETED
      );
    } catch (error) {
      next(error);
    }
  }

  async getStudentStats(req, res, next) {
    try {
      const stats = await studentService.getStudentStats();
      
      responseFormatter.success(
        res,
        stats,
        MESSAGES.GENERAL.SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
