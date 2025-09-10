const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
require('dotenv').config();

async function createStudent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-project');
    console.log('Connected to MongoDB');

    const users = await User.find();
    console.log('All users:', users);

    const user = await User.findOne({ email: 'vansh@gmail.com' });
    if (!user) {
      console.log('User not found');
      return;
    }

    const student = new Student({
      name: 'Vansh',
      email: 'vansh@gmail.com',
      course: 'MERN Bootcamp',
      enrollmentDate: new Date(),
      user: user._id
    });

    await student.save();
    console.log('Student profile created successfully');
  } catch (error) {
    console.error('Error creating student:', error);
  } finally {
    mongoose.connection.close();
  }
}

createStudent();
