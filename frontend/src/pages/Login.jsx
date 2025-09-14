import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  console.log("-------------", login)
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(156, 146, 172, 0.1) 0%, transparent 50%), 
                            radial-gradient(circle at 75% 75%, rgba(156, 146, 172, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(156, 146, 172, 0.05) 0%, transparent 50%)`,
            backgroundSize: '60px 60px, 60px 60px, 30px 30px'
          }}
        ></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div 
          className="absolute top-40 right-20 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-xl animate-pulse" 
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute -bottom-8 left-20 w-40 h-40 bg-pink-500 rounded-full opacity-20 blur-xl animate-pulse" 
          style={{ animationDelay: '4s' }}
        ></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-ping" style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-700 hover:scale-105">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl mb-4 animate-bounce">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 transition-all duration-500">
                Sign in to your account
              </h2>
              <p className="text-white/70 transition-all duration-500" style={{ animationDelay: '200ms' }}>
                Or{' '}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline"
                >
                  create a new account
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2 transition-all duration-300" style={{ animationDelay: '300ms' }}>
                <label htmlFor="email" className="block text-sm font-medium text-white/90">
                  Email address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Mail className={`h-5 w-5 transition-colors duration-300 ${errors.email ? 'text-red-400' : 'text-white/50 group-hover:text-blue-400'}`} />
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
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                      errors.email 
                        ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                        : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500 hover:border-white/30'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center animate-bounce">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2 transition-all duration-300" style={{ animationDelay: '400ms' }}>
                <label htmlFor="password" className="block text-sm font-medium text-white/90">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Lock className={`h-5 w-5 transition-colors duration-300 ${errors.password ? 'text-red-400' : 'text-white/50 group-hover:text-blue-400'}`} />
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
                    className={`w-full pl-12 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                      errors.password 
                        ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                        : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500 hover:border-white/30'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-white/50 hover:text-white transition-colors duration-300"
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
                  <p className="text-red-400 text-xs mt-1 flex items-center animate-bounce">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="transition-all duration-300" style={{ animationDelay: '500ms' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-500/50 relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Sign in</span>
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

export default Login;