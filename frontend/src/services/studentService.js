import api from './api';

export const studentService = {
  // Get all students (Admin only)
  getAllStudents: async (page = 1, limit = 10, search = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });
      const response = await api.get(`/students/admin/all?${params}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get student by ID (Admin only)
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/students/admin/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get student stats (Admin only)
  getStudentStats: async () => {
    try {
      const response = await api.get('/students/admin/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create new student (Admin only)
  createStudent: async (studentData) => {
    try {
      const response = await api.post('/students/admin/create', studentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update student (Admin only)
  updateStudent: async (id, studentData) => {
    try {
      const response = await api.put(`/students/admin/${id}`, studentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete student (Admin only)
  deleteStudent: async (id) => {
    try {
      const response = await api.delete(`/students/admin/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get my profile (Student only)
  getMyProfile: async () => {
    try {
      const response = await api.get('/students/profile');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update my profile (Student only)
  updateMyProfile: async (studentData) => {
    try {
      const response = await api.put('/students/profile', studentData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
