// src/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  Home,
  Users,
  User,
  LogOut,
  BarChart3,
} from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['admin', 'student'] },
    { name: 'Students', href: '/admin/students', icon: Users, roles: ['admin'] },
    { name: 'Statistics', href: '/admin/stats', icon: BarChart3, roles: ['admin'] },
    { name: 'Profile', href: '/profile', icon: User, roles: ['admin', 'student'] },
  ];

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(user?.role)
  );

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* ---------- MAIN LAYOUT CONTAINER ---------- */}
      <div className="flex relative">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 border-r border-white/20 bg-white/80 backdrop-blur-xl shadow-xl">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MERN Auth</h1>
                      <p className="text-xs text-gray-500">CRUD System</p>
                    </div>
                  </div>
                </div>
                <nav className="mt-8 flex-1 px-2 space-y-2">
                  {filteredNavigation.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          isActive(item.href)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900'
                        } group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md animate-fadeInUp`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Icon className={`mr-3 h-5 w-5 transition-colors duration-300 ${
                          isActive(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
                        }`} />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200/50 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-sm font-medium text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs font-medium text-gray-500 capitalize flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        user?.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}></span>
                      {user?.role}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-3 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200 transform hover:scale-110"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 relative">
          {/* Mobile top bar */}
          <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white/80 backdrop-blur-xl border-b border-white/20">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-xl bg-white/50 text-gray-500 hover:text-gray-900 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 transform hover:scale-110 shadow-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <main className="flex-1 relative">
            <div className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="animate-fadeInUp">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:scale-110"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MERN Auth</h1>
              </div>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {filteredNavigation.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900'
                    } group flex items-center px-3 py-3 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`mr-4 h-6 w-6 transition-colors duration-300 ${
                      isActive(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200/50 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-base font-medium text-gray-700">{user?.name}</p>
                <p className="text-sm font-medium text-gray-500 capitalize flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    user?.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}></span>
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;
if (!document.head.querySelector('style[data-dashboard-layout]')) {
  style.setAttribute('data-dashboard-layout', 'true');
  document.head.appendChild(style);
}

export default DashboardLayout;
