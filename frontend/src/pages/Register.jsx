import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Shield, AlertCircle, UserPlus } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const selectedRole = watch('role', 'student');

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      // Ensure role is set (default to student if not provided)
      const userData = {
        ...data,
        role: data.role || 'student'
      };
      
      await registerUser(userData);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      // Error is handled in the auth context
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-36 bg-indigo-500 rounded-full opacity-20 blur-xl animate-pulse delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-28 h-28 bg-violet-500 rounded-full opacity-20 blur-xl animate-pulse delay-6000"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          {/* Register Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20 p-10 transform transition-all duration-700 hover:scale-105">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl mb-6 animate-pulse">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Create your account
              </h2>
              <p className="text-white text-opacity-70">
                Or{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
                >
                  sign in to your existing account
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-sm font-medium text-white text-opacity-90">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <User className={`h-5 w-5 transition-colors duration-300 ${
                        errors.name ? 'text-red-400' : 'text-white text-opacity-50 group-hover:text-blue-400'
                      }`} />
                    </div>
                    <input
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                      type="text"
                      className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                        errors.name 
                          ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500' 
                          : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center animate-pulse">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-medium text-white text-opacity-90">
                    Email address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Mail className={`h-5 w-5 transition-colors duration-300 ${
                        errors.email ? 'text-red-400' : 'text-white text-opacity-50 group-hover:text-blue-400'
                      }`} />
                    </div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                        errors.email 
                          ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500' 
                          : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 flex items-center animate-pulse">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password and Confirm Password Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Field */}
                <div className="space-y-3">
                  <label htmlFor="password" className="block text-sm font-medium text-white text-opacity-90">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Lock className={`h-5 w-5 transition-colors duration-300 ${
                        errors.password ? 'text-red-400' : 'text-white text-opacity-50 group-hover:text-blue-400'
                      }`} />
                    </div>
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      type={showPassword ? 'text' : 'password'}
                      className={`w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                        errors.password 
                          ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500' 
                          : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-white text-opacity-50 hover:text-white transition-colors duration-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1 flex items-center animate-pulse">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-3">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white text-opacity-90">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Lock className={`h-5 w-5 transition-colors duration-300 ${
                        errors.confirmPassword ? 'text-red-400' : 'text-white text-opacity-50 group-hover:text-blue-400'
                      }`} />
                    </div>
                    <input
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                          value === password || 'Passwords do not match',
                      })}
                      type="password"
                      className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                        errors.confirmPassword 
                          ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500' 
                          : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                      }`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 flex items-center animate-pulse">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Role and Course Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <label htmlFor="role" className="block text-sm font-medium text-white text-opacity-90">
                    Account Type
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Shield className={`h-5 w-5 transition-colors duration-300 ${
                        errors.role ? 'text-red-400' : 'text-white text-opacity-50 group-hover:text-blue-400'
                      }`} />
                    </div>
                    <select
                      {...register('role')}
                      className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm appearance-none cursor-pointer ${
                        errors.role 
                          ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500' 
                          : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                      }`}
                    >
                      <option value="student" className="bg-gray-800 text-white">Student (Default)</option>
                      <option value="admin" className="bg-gray-800 text-white">Admin</option>
                    </select>
                  </div>
                  {errors.role && (
                    <p className="text-red-400 text-xs mt-1 flex items-center animate-pulse">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Course Field - Only show for students */}
                {selectedRole === 'student' && (
                  <div className="space-y-3">
                    <label htmlFor="course" className="block text-sm font-medium text-white text-opacity-90">
                      Course (Optional)
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <GraduationCap className="h-5 w-5 text-white text-opacity-50 group-hover:text-blue-400 transition-colors duration-300" />
                      </div>
                      <input
                        {...register('course')}
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30 backdrop-blur-sm"
                        placeholder="Enter your course (optional)"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Create account</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;