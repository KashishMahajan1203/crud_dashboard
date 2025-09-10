const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection error:', err.message);
    console.log('Falling back to local MongoDB without authentication...');
    mongoose.connect('mongodb://localhost:27017/mern-crud', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log('Connected to local MongoDB'))
      .catch(err2 => console.log('Local MongoDB connection failed:', err2.message));
  });

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
