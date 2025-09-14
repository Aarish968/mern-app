import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { studentService } from '../services/studentService';
import { User, Mail, GraduationCap, Calendar, Save, Edit3, X, CheckCircle, AlertCircle, Shield, Activity, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchStudentData = async () => {
      if (user?.role === 'student') {
        try {
          const response = await studentService.getMyProfile();
          setStudentData(response.data);
          reset({
            name: response.data.name,
            email: response.data.email,
            course: response.data.course,
            enrollmentDate: response.data.enrollmentDate.split('T')[0],
          });
        } catch (error) {
          toast.error('Failed to fetch student data');
        }
      } else {
        reset({
          name: user?.name,
          email: user?.email,
        });
      }
      setLoading(false);
    };

    fetchStudentData();
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (user?.role === 'student') {
        await studentService.updateMyProfile(data);
        setStudentData({ ...studentData, ...data });
        toast.success('Profile updated successfully! 🎉');
      } else {
        await updateProfile(data);
      }
      setSaveSuccess(true);
      setIsEditing(false);
      
      // Reset success animation after 2 seconds
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveSuccess(false);
    if (user?.role === 'student' && studentData) {
      reset({
        name: studentData.name,
        email: studentData.email,
        course: studentData.course,
        enrollmentDate: studentData.enrollmentDate.split('T')[0],
      });
    } else {
      reset({
        name: user?.name,
        email: user?.email,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin mx-auto"></div>
              <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2" style={{ clipPath: 'inset(0 50% 50% 0)' }}></div>
            </div>
            <p className="text-gray-600 font-medium">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-10"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
                  <User className="h-8 w-8 text-blue-600 mr-3" />
                  My Profile
                </h1>
                <p className="text-gray-600">
                  Manage your account information and settings
                </p>
              </div>
              {!isEditing && (
                <button 
                  onClick={handleEdit}
                  className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 active:translate-y-0"
                >
                  <div className="flex items-center space-x-2">
                    <Edit3 className="h-5 w-5 transition-transform group-hover:rotate-12 duration-300" />
                    <span>Edit Profile</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 animate-slide-down">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-green-800">Profile Updated Successfully!</h3>
                <p className="text-sm text-green-700">Your changes have been saved.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Overview Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-left">
              
              {/* Profile Avatar & Basic Info */}
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <span className="text-3xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.name}
                  </h2>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                    <Shield className="h-4 w-4 mr-1" />
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </div>
                  <p className="text-gray-600 break-all">{user?.email}</p>
                </div>
              </div>

              {/* Account Details */}
              <div className="mt-8 space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Account Status</span>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 animate-pulse">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Active
                    </span>
                  </div>
                </div>

                {user?.lastLogin && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Last Login</span>
                      </div>
                      <span className="text-sm text-gray-900 font-medium">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                {user?.role === 'student' && studentData?.course && (
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Current Course</span>
                      </div>
                      <span className="text-sm text-gray-900 font-medium">
                        {studentData.course}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in-right">
              
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    {isEditing ? (
                      <>
                        <Edit3 className="h-6 w-6 text-blue-600 mr-2 animate-pulse" />
                        Edit Profile Information
                      </>
                    ) : (
                      <>
                        <User className="h-6 w-6 text-gray-600 mr-2" />
                        Profile Information
                      </>
                    )}
                  </h3>
                  {isEditing && (
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Form Content */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <div className="space-y-8">
                  
                  {/* Name Field */}
                  <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <User className="inline h-5 w-5 mr-2 text-blue-600" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <div className="relative group">
                        <input
                          {...register('name', { required: 'Name is required' })}
                          type="text"
                          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white ${
                            errors.name 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 animate-shake' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                          }`}
                        />
                        {errors.name && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm mt-2 animate-slide-down">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.name.message}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-gray-900 font-medium">
                          {user?.role === 'student' ? studentData?.name : user?.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Mail className="inline h-5 w-5 mr-2 text-blue-600" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <div className="relative group">
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          type="email"
                          className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white ${
                            errors.email 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 animate-shake' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                          }`}
                        />
                        {errors.email && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm mt-2 animate-slide-down">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.email.message}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-gray-900 font-medium break-all">
                          {user?.role === 'student' ? studentData?.email : user?.email}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Student-specific fields */}
                  {user?.role === 'student' && (
                    <>
                      {/* Course Field */}
                      <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <GraduationCap className="inline h-5 w-5 mr-2 text-blue-600" />
                          Course
                        </label>
                        {isEditing ? (
                          <div className="relative group">
                            <input
                              {...register('course', { required: 'Course is required' })}
                              type="text"
                              className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white ${
                                errors.course 
                                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 animate-shake' 
                                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                              }`}
                            />
                            {errors.course && (
                              <div className="flex items-center space-x-1 text-red-600 text-sm mt-2 animate-slide-down">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.course.message}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">{studentData?.course}</p>
                          </div>
                        )}
                      </div>

                      {/* Enrollment Date Field */}
                      <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <Calendar className="inline h-5 w-5 mr-2 text-blue-600" />
                          Enrollment Date
                        </label>
                        {isEditing ? (
                          <div className="relative group">
                            <input
                              {...register('enrollmentDate', { required: 'Enrollment date is required' })}
                              type="date"
                              className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white ${
                                errors.enrollmentDate 
                                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 animate-shake' 
                                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
                              }`}
                            />
                            {errors.enrollmentDate && (
                              <div className="flex items-center space-x-1 text-red-600 text-sm mt-2 animate-slide-down">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.enrollmentDate.message}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">
                              {studentData?.enrollmentDate && 
                                new Date(studentData.enrollmentDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-10 pt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 hover:scale-105 active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        /* Enhanced backdrop blur */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Profile;