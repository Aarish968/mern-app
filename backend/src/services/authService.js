const User = require('../models/User');
const Student = require('../models/Student');
const { generateToken } = require('../config/jwt');
const { ROLES } = require('../constants/roles');
const MESSAGES = require('../constants/messages');

class AuthService {
  async register(userData) {
    console.log("Registering user in AuthService");
    try {
      console.log('AuthService register - userData:', userData);
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error(MESSAGES.USER.EMAIL_EXISTS);
      }

      // Create user
      const user = new User(userData);
      console.log('Creating user:', user);
      await user.save();

      // If user is a student, create student record
      if (user.role === ROLES.STUDENT) {
        const student = new Student({
          name: user.name,
          email: user.email,
          course: userData.course || 'General Studies',
          enrollmentDate: userData.enrollmentDate || new Date(),
          userId: user._id,
        });
        await student.save();
      }

      // Generate token
      const token = generateToken({ id: user._id, role: user.role });

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Find user and include password for comparison
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || !user.isActive) {
        throw new Error(MESSAGES.AUTH.LOGIN_FAILED);
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error(MESSAGES.AUTH.LOGIN_FAILED);
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken({ id: user._id, role: user.role });

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(MESSAGES.USER.NOT_FOUND);
      }

      // If user is a student, get student details
      if (user.role === ROLES.STUDENT) {
        const student = await Student.findOne({ userId });
        return {
          user: user.toJSON(),
          student: student ? student.toJSON() : null,
        };
      }

      return {
        user: user.toJSON(),
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId, updateData) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(MESSAGES.USER.NOT_FOUND);
      }

      // Update user data
      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined && key !== 'password') {
          user[key] = updateData[key];
        }
      });

      await user.save();

      // If user is a student, update student record
      if (user.role === ROLES.STUDENT) {
        const student = await Student.findOne({ userId });
        if (student) {
          Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined && ['name', 'email', 'course', 'enrollmentDate'].includes(key)) {
              student[key] = updateData[key];
            }
          });
          await student.save();
        }
      }

      return user.toJSON();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
