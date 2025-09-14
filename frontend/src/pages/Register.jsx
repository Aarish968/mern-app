import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Shield, AlertCircle, UserPlus, CheckCircle, Sparkles } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();

  const selectedRole = watch('role', 'student');
  const password = watch('password');

  const validateStep1 = async () => {
    const result = await trigger(['name', 'email']);
    if (result) {
      setFormStep(2);
    }
  };

  const validateStep2 = async () => {
    const result = await trigger(['password', 'confirmPassword']);
    if (result) {
      setFormStep(3);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSuccessMessage('Creating your account...');
      
      const userData = {
        ...data,
        role: data.role || 'student'
      };
      
      await registerUser(userData);
      setSuccessMessage('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);
    } catch (error) {
      setSuccessMessage('');
      console.error('Registration error:', error);
    }
  };

  const getStepIcon = (step) => {
    if (formStep > step) return <CheckCircle className="h-6 w-6" />;
    if (formStep === step) return <Sparkles className="h-6 w-6 animate-pulse" />;
    return <div className="h-6 w-6 rounded-full border-2 border-current" />;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Floating Orbs with Enhanced Animation */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-36 bg-indigo-500 rounded-full opacity-20 blur-xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-20 w-28 h-28 bg-violet-500 rounded-full opacity-20 blur-xl animate-float-fast"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-cyan-500 rounded-full opacity-15 blur-xl animate-float"></div>
        <div className="absolute top-10 right-1/2 w-20 h-20 bg-pink-500 rounded-full opacity-15 blur-xl animate-float-delayed"></div>
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-8 p-4 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 rounded-2xl backdrop-blur-sm animate-slide-down">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <p className="text-green-300 font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                      formStep >= step
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg'
                        : 'border-white border-opacity-30 text-white text-opacity-50'
                    }`}
                  >
                    {getStepIcon(step)}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-500 ${
                        formStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white bg-opacity-30'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Labels */}
            <div className="flex justify-center space-x-20 text-center">
              <div className={`transition-all duration-300 ${formStep >= 1 ? 'text-white' : 'text-white text-opacity-50'}`}>
                <p className="text-sm font-medium">Personal Info</p>
              </div>
              <div className={`transition-all duration-300 ${formStep >= 2 ? 'text-white' : 'text-white text-opacity-50'}`}>
                <p className="text-sm font-medium">Security</p>
              </div>
              <div className={`transition-all duration-300 ${formStep >= 3 ? 'text-white' : 'text-white text-opacity-50'}`}>
                <p className="text-sm font-medium">Account Type</p>
              </div>
            </div>
          </div>

          {/* Register Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20 p-10 transform transition-all duration-700 hover:scale-[1.02] animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-3xl mb-6 animate-pulse-slow shadow-xl">
                <UserPlus className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-3 animate-text-shimmer bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Create your account
              </h2>
              <p className="text-white text-opacity-70 text-lg">
                Or{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 hover:underline hover:scale-105 inline-block"
                >
                  sign in to your existing account
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Step 1: Personal Information */}
              {formStep === 1 && (
                <div className="space-y-6 animate-slide-in">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">Personal Information</h3>
                    <p className="text-white text-opacity-60">Tell us about yourself</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-3">
                      <label htmlFor="name" className="block text-sm font-medium text-white text-opacity-90">
                        Full Name *
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <User className={`h-5 w-5 transition-all duration-300 ${
                            errors.name ? 'text-red-400 animate-shake' : 'text-white text-opacity-50 group-hover:text-blue-400 group-focus-within:text-blue-400'
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
                          className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm hover:bg-opacity-15 focus:bg-opacity-15 ${
                            errors.name 
                              ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500 animate-shake' 
                              : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-down">
                          <AlertCircle className="h-3 w-3 mr-1 animate-pulse" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-3">
                      <label htmlFor="email" className="block text-sm font-medium text-white text-opacity-90">
                        Email address *
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Mail className={`h-5 w-5 transition-all duration-300 ${
                            errors.email ? 'text-red-400 animate-shake' : 'text-white text-opacity-50 group-hover:text-blue-400 group-focus-within:text-blue-400'
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
                          className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm hover:bg-opacity-15 focus:bg-opacity-15 ${
                            errors.email 
                              ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500 animate-shake' 
                              : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                          }`}
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-down">
                          <AlertCircle className="h-3 w-3 mr-1 animate-pulse" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="button"
                      onClick={validateStep1}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Continue</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {formStep === 2 && (
                <div className="space-y-6 animate-slide-in">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">Security Setup</h3>
                    <p className="text-white text-opacity-60">Create a secure password</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Password Field */}
                    <div className="space-y-3">
                      <label htmlFor="password" className="block text-sm font-medium text-white text-opacity-90">
                        Password *
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Lock className={`h-5 w-5 transition-all duration-300 ${
                            errors.password ? 'text-red-400 animate-shake' : 'text-white text-opacity-50 group-hover:text-blue-400 group-focus-within:text-blue-400'
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
                          className={`w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm hover:bg-opacity-15 focus:bg-opacity-15 ${
                            errors.password 
                              ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500 animate-shake' 
                              : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                          }`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-white text-opacity-50 hover:text-white transition-all duration-300 hover:scale-110"
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
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-down">
                          <AlertCircle className="h-3 w-3 mr-1 animate-pulse" />
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-white text-opacity-90">
                        Confirm Password *
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Lock className={`h-5 w-5 transition-all duration-300 ${
                            errors.confirmPassword ? 'text-red-400 animate-shake' : 'text-white text-opacity-50 group-hover:text-blue-400 group-focus-within:text-blue-400'
                          }`} />
                        </div>
                        <input
                          {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                              value === password || 'Passwords do not match',
                          })}
                          type={showConfirmPassword ? 'text' : 'password'}
                          className={`w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm hover:bg-opacity-15 focus:bg-opacity-15 ${
                            errors.confirmPassword 
                              ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500 animate-shake' 
                              : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-white text-opacity-50 hover:text-white transition-all duration-300 hover:scale-110"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-down">
                          <AlertCircle className="h-3 w-3 mr-1 animate-pulse" />
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 border border-white border-opacity-30"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={validateStep2}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Continue</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Account Type */}
              {formStep === 3 && (
                <div className="space-y-6 animate-slide-in">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">Account Type</h3>
                    <p className="text-white text-opacity-60">Choose your account type</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Role Selection */}
                    <div className="space-y-3">
                      <label htmlFor="role" className="block text-sm font-medium text-white text-opacity-90">
                        Account Type *
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                          <Shield className={`h-5 w-5 transition-all duration-300 ${
                            errors.role ? 'text-red-400 animate-shake' : 'text-white text-opacity-50 group-hover:text-blue-400 group-focus-within:text-blue-400'
                          }`} />
                        </div>
                        <select
                          {...register('role')}
                          className={`w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border rounded-2xl text-white transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm appearance-none cursor-pointer hover:bg-opacity-15 focus:bg-opacity-15 ${
                            errors.role 
                              ? 'border-red-500 border-opacity-50 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500 animate-shake' 
                              : 'border-white border-opacity-20 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30'
                          }`}
                        >
                          <option value="student" className="bg-gray-800 text-white">🎓 Student (Default)</option>
                          <option value="admin" className="bg-gray-800 text-white">👑 Admin</option>
                        </select>
                      </div>
                      {errors.role && (
                        <p className="text-red-400 text-xs mt-1 flex items-center animate-slide-down">
                          <AlertCircle className="h-3 w-3 mr-1 animate-pulse" />
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    {/* Course Field - Only show for students */}
                    {selectedRole === 'student' && (
                      <div className="space-y-3 animate-slide-in">
                        <label htmlFor="course" className="block text-sm font-medium text-white text-opacity-90">
                          Course (Optional)
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <GraduationCap className="h-5 w-5 text-white text-opacity-50 group-hover:text-blue-400 group-focus-within:text-blue-400 transition-all duration-300" />
                          </div>
                          <input
                            {...register('course')}
                            type="text"
                            className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-white placeholder-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 hover:border-white hover:border-opacity-30 backdrop-blur-sm hover:bg-opacity-15 focus:bg-opacity-15"
                            placeholder="Enter your course (optional)"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 border border-white border-opacity-30"
                    >
                      Back
                    </button>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 relative overflow-hidden group"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        <span className="relative z-10 flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5" />
                          <span>Create account</span>
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-25px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0px) opacity(0.2); }
          50% { transform: translateY(-100px) opacity(0.8); }
          100% { transform: translateY(-200px) opacity(0); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s linear infinite;
        }
        
        /* Enhanced backdrop blur */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Select styling for better appearance */
        select option {
          background: #1a1a2e;
          color: white;
          padding: 10px;
        }
        
        /* Enhanced focus states */
        input:focus, select:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Improved button hover effects */
        button:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        /* Form validation success state */
        .input-success {
          border-color: #10b981;
          background-color: rgba(16, 185, 129, 0.1);
        }
        
        .input-success:focus {
          ring-color: #10b981;
          border-color: #10b981;
        }
      `}</style>
    </div>
  );
};

export default Register;