import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { studentService } from '../services/studentService';
import { Search, Plus, Edit, Trash2, Eye, X, AlertCircle, Users, BookOpen, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchStudents = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await studentService.getAllStudents(page, 10, search);
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchStudents(1, searchTerm);
  };

  const handleCreateStudent = async (data) => {
    try {
      setIsSubmitting(true);
      await studentService.createStudent(data);
      toast.success('Student created successfully! 🎉');
      setShowModal(false);
      reset();
      fetchStudents(currentPage, searchTerm);
    } catch (error) {
      toast.error(error.message || 'Failed to create student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStudent = async (data) => {
    try {
      setIsSubmitting(true);
      await studentService.updateStudent(editingStudent._id, data);
      toast.success('Student updated successfully! ✅');
      setShowModal(false);
      setEditingStudent(null);
      reset();
      fetchStudents(currentPage, searchTerm);
    } catch (error) {
      toast.error(error.message || 'Failed to update student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      try {
        setDeleteLoading(id);
        await studentService.deleteStudent(id);
        toast.success('Student deleted successfully');
        fetchStudents(currentPage, searchTerm);
      } catch (error) {
        toast.error(error.message || 'Failed to delete student');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const openCreateModal = () => {
    setEditingStudent(null);
    setShowModal(true);
    reset();
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setShowModal(true);
    reset({
      name: student.name,
      email: student.email,
      course: student.course,
      enrollmentDate: student.enrollmentDate.split('T')[0],
    });
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setSelectedStudent(null);
    reset();
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(student => student.isActive).length;
  const inactiveStudents = totalStudents - activeStudents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section with Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-10"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Students Management
                </h1>
                <p className="text-gray-600">
                  Manage all student records and information with ease
                </p>
              </div>
              <button
                onClick={openCreateModal}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 active:translate-y-0"
              >
                <div className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                  <span>Add Student</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                <p className="text-gray-600">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeStudents}</p>
                <p className="text-gray-600">Active Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{inactiveStudents}</p>
                <p className="text-gray-600">Inactive Students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search students by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Students Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                          <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                          <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 50% 0)' }}></div>
                        </div>
                        <p className="text-gray-500">Loading students...</p>
                      </div>
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">No students found</h3>
                          <p className="text-gray-500">Try adjusting your search criteria or add a new student</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr
                      key={student._id}
                      className="hover:bg-blue-50/50 transition-colors duration-200 animate-slide-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                          {student.course}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(student.enrollmentDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                            student.isActive
                              ? 'bg-green-100 text-green-800 shadow-sm'
                              : 'bg-red-100 text-red-800 shadow-sm'
                          }`}
                        >
                          {student.isActive ? '✓ Active' : '✗ Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openViewModal(student)}
                            className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(student)}
                            className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Edit Student"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student._id)}
                            disabled={deleteLoading === student._id}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Student"
                          >
                            {deleteLoading === student._id ? (
                              <div className="h-4 w-4 border-2 border-red-600 rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50/50 backdrop-blur-sm px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => fetchStudents(currentPage - 1, searchTerm)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchStudents(currentPage + 1, searchTerm)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing page <span className="font-medium text-blue-600">{currentPage}</span> of{' '}
                      <span className="font-medium text-blue-600">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                      <button
                        onClick={() => fetchStudents(currentPage - 1, searchTerm)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => fetchStudents(currentPage + 1, searchTerm)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-4 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                onClick={closeModal}
              ></div>
              <div className="inline-block align-middle bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-scale-in">
                <form onSubmit={handleSubmit(editingStudent ? handleUpdateStudent : handleCreateStudent)}>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">
                        {editingStudent ? '✏️ Edit Student' : '➕ Create New Student'}
                      </h3>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="text-white hover:text-gray-200 transition-colors duration-200 p-1 hover:bg-white/10 rounded-lg"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white px-6 py-6">
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          type="text"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="Enter student's full name"
                        />
                        {errors.name && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm animate-slide-down">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.name.message}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Please enter a valid email address',
                            },
                          })}
                          type="email"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="student@example.com"
                        />
                        {errors.email && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm animate-slide-down">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.email.message}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Course</label>
                        <input
                          {...register('course', { required: 'Course is required' })}
                          type="text"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.course ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="e.g., Computer Science, Mathematics"
                        />
                        {errors.course && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm animate-slide-down">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.course.message}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
                        <input
                          {...register('enrollmentDate', { required: 'Enrollment date is required' })}
                          type="date"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.enrollmentDate ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        />
                        {errors.enrollmentDate && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm animate-slide-down">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.enrollmentDate.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>{editingStudent ? 'Update Student' : 'Create Student'}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                onClick={closeModal}
              ></div>
              <div className="inline-block align-middle bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-scale-in">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      👁️ Student Details
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-white hover:text-gray-200 transition-colors duration-200 p-1 hover:bg-white/10 rounded-lg"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white px-6 py-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                      {selectedStudent.name.charAt(0).toUpperCase()}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedStudent.name}</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.email}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Course</label>
                      <div className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                        {selectedStudent.course}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Enrollment Date</label>
                      <p className="text-gray-900 font-medium">
                        {new Date(selectedStudent.enrollmentDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                          selectedStudent.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedStudent.isActive ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        /* Backdrop blur support for older browsers */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        /* Custom scrollbar */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default AdminStudents;