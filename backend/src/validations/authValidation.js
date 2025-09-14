const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required',
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm password must match password',
      'any.required': 'Confirm password is required',
    }),
  role: Joi.string()
    .valid('admin', 'student')
    .default('student')
    .messages({
      'any.only': 'Role must be either admin or student',
    }),
  course: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .allow('')
    .when('role', {
      is: 'student',
      then: Joi.required().disallow(''),
      otherwise: Joi.optional().allow(''),
    })
    .messages({
      'string.min': 'Course name must be at least 2 characters',
      'string.max': 'Course name cannot exceed 100 characters',
      'any.required': 'Course is required for students',
    }),
  // courseCode: Joi.string()
  //   .min(2)
  //   .max(20)
  //   .trim()
  //   .uppercase()
  //   .when('role', {
  //     is: 'student',
  //     then: Joi.required(),
  //     otherwise: Joi.optional(),
  //   })
  //   .messages({
  //     'string.min': 'Course code must be at least 2 characters',
  //     'string.max': 'Course code cannot exceed 20 characters',
  //     'any.required': 'Course code is required for students',
  //   }),
  // enrollmentDate: Joi.date()
  //   .iso()
  //   .when('role', {
  //     is: 'student',
  //     then: Joi.required(),
  //     otherwise: Joi.optional(),
  //   })
  //   .messages({
  //     'date.format': 'Enrollment date must be a valid date',
  //     'any.required': 'Enrollment date is required for students',
  //   }),
  // semester: Joi.string()
  //   .valid('Fall', 'Spring', 'Summer', 'Winter')
  //   .when('role', {
  //     is: 'student',
  //     then: Joi.required(),
  //     otherwise: Joi.optional(),
  //   })
  //   .messages({
  //     'any.only': 'Semester must be Fall, Spring, Summer, or Winter',
  //     'any.required': 'Semester is required for students',
  //   }),
  // year: Joi.number()
  //   .integer()
  //   .min(2020)
  //   .max(2030)
  //   .when('role', {
  //     is: 'student',
  //     then: Joi.required(),
  //     otherwise: Joi.optional(),
  //   })
  //   .messages({
  //     'number.base': 'Year must be a number',
  //     'number.min': 'Year must be at least 2020',
  //     'number.max': 'Year cannot exceed 2030',
  //     'any.required': 'Year is required for students',
  //   }),
  // credits: Joi.number()
  //   .integer()
  //   .min(1)
  //   .max(6)
  //   .when('role', {
  //     is: 'student',
  //     then: Joi.required(),
  //     otherwise: Joi.optional(),
  //   })
  //   .messages({
  //     'number.base': 'Credits must be a number',
  //     'number.min': 'Credits must be at least 1',
  //     'number.max': 'Credits cannot exceed 6',
  //     'any.required': 'Credits is required for students',
  //   }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
    }),
});

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message),
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message),
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
