const mongoose = require('mongoose');
const User = require('../src/models/User');
const Student = require('../src/models/Student');
const { ROLES } = require('../src/constants/roles');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: ROLES.ADMIN,
    });
    await adminUser.save();

    // Create sample students
    const students = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'student123',
        role: ROLES.STUDENT,
        course: 'Computer Science',
        enrollmentDate: new Date('2023-09-01'),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'student123',
        role: ROLES.STUDENT,
        course: 'Mathematics',
        enrollmentDate: new Date('2023-09-15'),
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'student123',
        role: ROLES.STUDENT,
        course: 'Physics',
        enrollmentDate: new Date('2023-10-01'),
      },
    ];

    for (const studentData of students) {
      const user = new User({
        name: studentData.name,
        email: studentData.email,
        password: studentData.password,
        role: studentData.role,
      });
      await user.save();

      const student = new Student({
        name: studentData.name,
        email: studentData.email,
        course: studentData.course,
        enrollmentDate: studentData.enrollmentDate,
        userId: user._id,
      });
      await student.save();
    }

    console.log('✅ Seed data created successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Student: john@example.com / student123');
    console.log('Student: jane@example.com / student123');
    console.log('Student: bob@example.com / student123');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
