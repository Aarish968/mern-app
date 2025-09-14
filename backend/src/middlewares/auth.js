const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../config/jwt');
const responseFormatter = require('../utils/responseFormatter');
const MESSAGES = require('../constants/messages');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return responseFormatter.unauthorized(res, MESSAGES.AUTH.UNAUTHORIZED);
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return responseFormatter.unauthorized(res, MESSAGES.AUTH.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return responseFormatter.unauthorized(res, MESSAGES.AUTH.TOKEN_INVALID);
    }
    if (error.name === 'TokenExpiredError') {
      return responseFormatter.unauthorized(res, MESSAGES.AUTH.TOKEN_EXPIRED);
    }
    return responseFormatter.error(res, MESSAGES.GENERAL.SERVER_ERROR);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return responseFormatter.unauthorized(res, MESSAGES.AUTH.UNAUTHORIZED);
    }

    if (!roles.includes(req.user.role)) {
      return responseFormatter.forbidden(res, MESSAGES.AUTH.FORBIDDEN);
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
