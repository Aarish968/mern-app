const authService = require('../services/authService');
const responseFormatter = require('../utils/responseFormatter');
const MESSAGES = require('../constants/messages');

class AuthController {
  async register(req, res, next) {
    console.log("Registering user");
    try {
      console.log('Registration request body:', req.body);
      const result = await authService.register(req.body);
      console.log('Registration result:', result);
      responseFormatter.success(
        res,
        result,
        MESSAGES.AUTH.REGISTER_SUCCESS,
        201
      );
    } catch (error) {
      console.error('Registration error:', error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      responseFormatter.success(
        res,
        result,
        MESSAGES.AUTH.LOGIN_SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const result = await authService.getProfile(req.user._id);
      
      responseFormatter.success(
        res,
        result,
        MESSAGES.GENERAL.SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const result = await authService.updateProfile(req.user._id, req.body);
      
      responseFormatter.success(
        res,
        result,
        MESSAGES.USER.UPDATED
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      // In a JWT-based system, logout is typically handled on the client side
      // by removing the token. However, we can implement token blacklisting
      // or other server-side logout mechanisms if needed.
      
      responseFormatter.success(
        res,
        null,
        MESSAGES.AUTH.LOGOUT_SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
