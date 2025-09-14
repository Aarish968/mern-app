import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { studentService } from '../services/studentService';
import { User, Mail, GraduationCap, Calendar, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
        // For admin users, just use user data
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
      if (user?.role === 'student') {
        await studentService.updateMyProfile(data);
        toast.success('Profile updated successfully');
      } else {
        await updateProfile(data);
      }
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account information and settings
          </p>
        </div>
        {!isEditing && (
          <button onClick={handleEdit} className="btn btn-primary">
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-medium text-gray-900 truncate">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Account Status</span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              {user?.lastLogin && (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Login</span>
                  <span className="text-gray-900">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditing ? 'Edit Profile' : 'Profile Information'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className={`input ${errors.name ? 'input-error' : ''}`}
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {user?.role === 'student' ? studentData?.name : user?.name}
                    </p>
                  )}
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      className={`input ${errors.email ? 'input-error' : ''}`}
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {user?.role === 'student' ? studentData?.email : user?.email}
                    </p>
                  )}
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {user?.role === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <GraduationCap className="inline h-4 w-4 mr-1" />
                        Course
                      </label>
                      {isEditing ? (
                        <input
                          {...register('course', { required: 'Course is required' })}
                          type="text"
                          className={`input ${errors.course ? 'input-error' : ''}`}
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{studentData?.course}</p>
                      )}
                      {errors.course && (
                        <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Enrollment Date
                      </label>
                      {isEditing ? (
                        <input
                          {...register('enrollmentDate', { required: 'Enrollment date is required' })}
                          type="date"
                          className={`input ${errors.enrollmentDate ? 'input-error' : ''}`}
                        />
                      ) : (
                        <p className="text-gray-900 py-2">
                          {studentData?.enrollmentDate && 
                            new Date(studentData.enrollmentDate).toLocaleDateString()}
                        </p>
                      )}
                      {errors.enrollmentDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.enrollmentDate.message}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
