const express = require('express');
const Student = require('../models/Student');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all students (admin only)
router.get('/', auth, requireRole('admin'), async (req, res) => {
  try {
    const students = await Student.find().populate('user', 'email role');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get own student profile (student only)
router.get('/me', auth, requireRole('student'), async (req, res) => {
  try {
    console.log('GET /students/me - req.user._id:', req.user._id);
    const student = await Student.findOne({ user: req.user._id });
    console.log('Student found:', student);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.log('Error in GET /students/me:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update own student profile (student only)
router.put('/me', auth, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const { name, email, course } = req.body;
    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;

    await student.save();
    res.json(student);
  } catch (err) {
    console.log('Error in PUT /students/me:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create student (admin only)
router.post('/', auth, requireRole('admin'), async (req, res) => {
  const { name, email, course, userId } = req.body;
  try {
    const student = new Student({ name, email, course, user: userId });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update student (admin for any, student for own)
router.put('/:id', auth, async (req, res) => {
  const { name, email, course } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (req.user.role !== 'admin' && student.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete student (admin only)
router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
