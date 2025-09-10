import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import StudentForm from './StudentForm';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setLoading(false);
          return;
        }
        const response = await api.get('/students/me');
        setStudent(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access - possibly invalid or expired token');
          logout();
          navigate('/login');
        } else {
          console.error('Error fetching student data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStudent();
    }
  }, [user, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const handleUpdate = async (updatedStudent) => {
    try {
      const response = await api.put('/students/me', updatedStudent);
      setStudent(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    dashboardContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
      fontSize: '28px',
    },
    welcome: {
      marginBottom: '30px',
      color: '#666',
    },
    profile: {
      textAlign: 'left',
      maxWidth: '400px',
      margin: '0 auto',
    },
    profileTitle: {
      marginBottom: '20px',
      color: '#333',
    },
    profileItem: {
      marginBottom: '10px',
    },
    buttonContainer: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
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

  if (loading) return <div>Loading...</div>;

  if (user && user.role !== 'student') return <div>Access denied. You are not a student.</div>;

  if (!student) return <div>No student record found. Please contact admin.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.dashboardContainer}>
        <h1 style={styles.title}>Student Dashboard</h1>
        <h2 style={styles.welcome}>Welcome, {user.email}</h2>
        {editing ? (
          <StudentForm
            student={student}
            onSave={handleUpdate}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div style={styles.profile}>
            <h3 style={styles.profileTitle}>Your Profile</h3>
            <p style={styles.profileItem}><strong>Name:</strong> {student.name}</p>
            <p style={styles.profileItem}><strong>Email:</strong> {student.email}</p>
            <p style={styles.profileItem}><strong>Course:</strong> {student.course}</p>
            <p style={styles.profileItem}><strong>Enrollment Date:</strong> {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'Not available'}</p>
            <div style={styles.buttonContainer}>
              <button onClick={() => setEditing(true)} style={styles.button}>Edit Profile</button>
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
