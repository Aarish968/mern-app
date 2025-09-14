const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
    minlength: [2, 'Course name must be at least 2 characters'],
    maxlength: [100, 'Course name cannot exceed 100 characters'],
  },
  enrollmentDate: {
    type: Date,
    required: [true, 'Enrollment date is required'],
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Enrollment date cannot be in the future',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Reference to the user account
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ userId: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ enrollmentDate: 1 });

// Virtual for formatted enrollment date
studentSchema.virtual('formattedEnrollmentDate').get(function() {
  return this.enrollmentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Ensure virtual fields are serialized
studentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Student', studentSchema);
