import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const StudentList = ({ onEdit, refresh }) => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStudents();
    } else if (user?.role === 'student') {
      fetchStudentProfile();
    }
  }, [refresh, user]);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudentProfile = async () => {
    try {
      const res = await api.get('/students/me');
      setStudents([res.data.user ? res.data.user : res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setError('');
      fetchStudents();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to delete student');
    }
  };

  const styles = {
    container: {
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '800px',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      marginBottom: '10px',
      background: '#f9f9f9',
    },
    studentInfo: {
      flex: 1,
      textAlign: 'left',
    },
    buttonContainer: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '8px 15px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    deleteButton: {
      background: '#dc3545',
    },
    error: {
      color: 'red',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Students</h3>
      {error && <div style={styles.error}>{error}</div>}
      <ul style={styles.list}>
        {students.map(student => (
          <li key={student._id} style={styles.listItem}>
            <div style={styles.studentInfo}>
              {student.name} - {student.email} - {student.course}
            </div>
            <div style={styles.buttonContainer}>
              <button onClick={() => onEdit(student)} style={styles.button}>Edit</button>
              {user?.role === 'admin' && (
                <button onClick={() => handleDelete(student._id)} style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
