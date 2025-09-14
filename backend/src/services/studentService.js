const Student = require('../models/Student');
const User = require('../models/User');
const { ROLES } = require('../constants/roles');
const MESSAGES = require('../constants/messages');

class StudentService {
  async getAllStudents(page = 1, limit = 10, search = '') {
    try {
      const query = {};
      
      // Add search functionality
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { course: { $regex: search, $options: 'i' } },
        ];
      }

      const students = await Student.find(query)
        .populate('userId', 'name email role isActive lastLogin')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Student.countDocuments(query);

      return {
        students,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(studentId) {
    try {
      const student = await Student.findById(studentId).populate('userId', 'name email role isActive lastLogin');
      
      if (!student) {
        throw new Error(MESSAGES.STUDENT.NOT_FOUND);
      }

      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByUserId(userId) {
    try {
      const student = await Student.findOne({ userId }).populate('userId', 'name email role isActive lastLogin');
      
      if (!student) {
        throw new Error(MESSAGES.STUDENT.NOT_FOUND);
      }

      return student;
    } catch (error) {
      throw error;
    }
  }

  async createStudent(studentData, adminUserId) {
    try {
      // Check if student already exists
      const existingStudent = await Student.findOne({ email: studentData.email });
      if (existingStudent) {
        throw new Error(MESSAGES.USER.EMAIL_EXISTS);
      }

      // Create user account for the student
      const user = new User({
        name: studentData.name,
        email: studentData.email,
        password: 'tempPassword123', // Will be changed on first login
        role: ROLES.STUDENT,
      });
      await user.save();

      // Create student record
      const student = new Student({
        ...studentData,
        userId: user._id,
      });
      await student.save();

      return student.populate('userId', 'name email role isActive lastLogin');
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(studentId, updateData) {
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        throw new Error(MESSAGES.STUDENT.NOT_FOUND);
      }

      // Update student data
      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          student[key] = updateData[key];
        }
      });

      await student.save();

      // Update corresponding user data
      const user = await User.findById(student.userId);
      if (user) {
        if (updateData.name) user.name = updateData.name;
        if (updateData.email) user.email = updateData.email;
        await user.save();
      }

      return student.populate('userId', 'name email role isActive lastLogin');
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(studentId) {
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        throw new Error(MESSAGES.STUDENT.NOT_FOUND);
      }

      // Delete user account
      await User.findByIdAndDelete(student.userId);
      
      // Delete student record
      await Student.findByIdAndDelete(studentId);

      return { message: MESSAGES.STUDENT.DELETED };
    } catch (error) {
      throw error;
    }
  }

  async getStudentStats() {
    try {
      const totalStudents = await Student.countDocuments();
      const activeStudents = await Student.countDocuments({ isActive: true });
      const courses = await Student.distinct('course');
      const courseStats = await Student.aggregate([
        {
          $group: {
            _id: '$course',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]);

      return {
        totalStudents,
        activeStudents,
        inactiveStudents: totalStudents - activeStudents,
        totalCourses: courses.length,
        courseStats,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new StudentService();
