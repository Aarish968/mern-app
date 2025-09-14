import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, User, Calendar, BookOpen, TrendingUp, Activity, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimateCards(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="relative">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-white/80 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  user?.role === 'admin' ? 'bg-yellow-400' : 'bg-green-400'
                }`}></span>
                {user?.role === 'admin' ? 'Administrator Dashboard' : 'Student Portal'}
              </p>
            </div>
          </div>
          <p className="text-white/90">
            {isAdmin
              ? 'Manage your students, track progress, and monitor system activity.'
              : 'Access your profile, view course information, and track your progress.'}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {isAdmin ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className={`group bg-white/80 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${animateCards ? 'animate-slideInLeft' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Students
                    </dt>
                    <dd className="text-xl font-bold text-gray-900 mt-1">
                      Manage Students
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Active Management</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-t border-blue-100">
              <Link
                to="/admin/students"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center group"
              >
                View all students
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>

          <div className={`group bg-white/80 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${animateCards ? 'animate-slideInUp' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Course Analytics
                    </dt>
                    <dd className="text-xl font-bold text-gray-900 mt-1">
                      Track Enrollment
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-purple-600">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>Real-time Data</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-t border-purple-100">
              <Link
                to="/admin/stats"
                className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 flex items-center group"
              >
                View statistics
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>

          <div className={`group bg-white/80 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${animateCards ? 'animate-slideInRight' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      System Activity
                    </dt>
                    <dd className="text-xl font-bold text-gray-900 mt-1">
                      Monitor Activity
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-indigo-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Live Monitoring</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 px-6 py-4 border-t border-indigo-100">
              <Link
                to="/admin/students"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200 flex items-center group"
              >
                View activity
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className={`group bg-white/80 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${animateCards ? 'animate-slideInLeft' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      My Profile
                    </dt>
                    <dd className="text-xl font-bold text-gray-900 mt-1">
                      Personal Info
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Student Account</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-t border-green-100">
              <Link
                to="/profile"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200 flex items-center group"
              >
                Manage profile
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>

          <div className={`group bg-white/80 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${animateCards ? 'animate-slideInUp' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      My Course
                    </dt>
                    <dd className="text-xl font-bold text-gray-900 mt-1">
                      Course Details
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-blue-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Progress Tracking</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-t border-blue-100">
              <Link
                to="/profile"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center group"
              >
                View course details
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>

          <div className={`group bg-white/80 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${animateCards ? 'animate-slideInRight' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Enrollment
                    </dt>
                    <dd className="text-xl font-bold text-gray-900 mt-1">
                      History & Dates
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-purple-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Timeline View</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-t border-purple-100">
              <Link
                to="/profile"
                className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 flex items-center group"
              >
                View enrollment info
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className={`bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-white/20 ${animateCards ? 'animate-slideInUp' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
        <div className="px-8 py-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="max-w-2xl text-gray-600 mb-6">
            <p>
              {isAdmin
                ? 'Streamline your administrative tasks with quick access to student management, analytics, and system monitoring tools.'
                : 'Keep your information up to date and track your academic progress with easy access to your profile and course details.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to={isAdmin ? '/admin/students' : '/profile'}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              {isAdmin ? 'Manage Students' : 'Update Profile'}
              <span className="ml-2">→</span>
            </Link>
            {isAdmin && (
              <Link
                to="/admin/stats"
                className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              >
                View Analytics
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add custom CSS for animations
if (!document.head.querySelector('style[data-dashboard]')) {
  const style = document.createElement('style');
  style.setAttribute('data-dashboard', 'true');
  style.textContent = `
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-slideInLeft {
      animation: slideInLeft 0.6s ease-out forwards;
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.6s ease-out forwards;
    }
    
    .animate-slideInUp {
      animation: slideInUp 0.6s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

export default Dashboard;
