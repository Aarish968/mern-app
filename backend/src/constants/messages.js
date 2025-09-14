const MESSAGES = {
  // Authentication messages
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Invalid email or password',
    REGISTER_SUCCESS: 'Registration successful',
    REGISTER_FAILED: 'Registration failed',
    LOGOUT_SUCCESS: 'Logout successful',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    TOKEN_EXPIRED: 'Token expired',
    TOKEN_INVALID: 'Invalid token',
  },
  
  // User messages
  USER: {
    CREATED: 'User created successfully',
    UPDATED: 'User updated successfully',
    DELETED: 'User deleted successfully',
    NOT_FOUND: 'User not found',
    EMAIL_EXISTS: 'Email already exists',
    INVALID_EMAIL: 'Invalid email format',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  },
  
  // Student messages
  STUDENT: {
    CREATED: 'Student created successfully',
    UPDATED: 'Student updated successfully',
    DELETED: 'Student deleted successfully',
    NOT_FOUND: 'Student not found',
    ENROLLMENT_DATE_INVALID: 'Invalid enrollment date',
  },
  
  // General messages
  GENERAL: {
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
    SUCCESS: 'Operation successful',
    FAILED: 'Operation failed',
  },
};

module.exports = MESSAGES;
