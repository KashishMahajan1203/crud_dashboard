import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const StudentForm = ({ student, userId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        course: student.course,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (student) {
        if (userId) {
          // Admin editing any student
          response = await api.put(`/students/${student._id}`, formData);
        } else {
          // Student editing own profile
          response = await api.put('/students/me', formData);
        }
      } else {
        response = await api.post('/students', { ...formData, userId });
      }
      onSave(response.data);
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  const styles = {
    container: {
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '400px',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      marginBottom: '15px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '15px',
    },
    button: {
      padding: '10px 20px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{student ? 'Edit Student' : 'Add Student'}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Save</button>
          <button type="button" onClick={onCancel} style={styles.button}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
