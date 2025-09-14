const Joi = require('joi');

const studentSchema = Joi.object({
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
  course: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .required()
    .messages({
      'string.min': 'Course name must be at least 2 characters',
      'string.max': 'Course name cannot exceed 100 characters',
      'any.required': 'Course is required',
    }),
  enrollmentDate: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.max': 'Enrollment date cannot be in the future',
      'any.required': 'Enrollment date is required',
    }),
});

const updateStudentSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .messages({
      'string.email': 'Please enter a valid email',
    }),
  course: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .messages({
      'string.min': 'Course name must be at least 2 characters',
      'string.max': 'Course name cannot exceed 100 characters',
    }),
  enrollmentDate: Joi.date()
    .max('now')
    .messages({
      'date.max': 'Enrollment date cannot be in the future',
    }),
}).min(1); // At least one field must be provided

const validateStudent = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message),
    });
  }
  next();
};

const validateUpdateStudent = (req, res, next) => {
  const { error } = updateStudentSchema.validate(req.body);
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
  validateStudent,
  validateUpdateStudent,
};
