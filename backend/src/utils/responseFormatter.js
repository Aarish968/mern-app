const responseFormatter = {
  success: (res, data = null, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (res, message = 'Error', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  },

  validationError: (res, errors) => {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return res.status(401).json({
      success: false,
      message,
    });
  },

  forbidden: (res, message = 'Forbidden') => {
    return res.status(403).json({
      success: false,
      message,
    });
  },

  notFound: (res, message = 'Not found') => {
    return res.status(404).json({
      success: false,
      message,
    });
  },
};

module.exports = responseFormatter;
