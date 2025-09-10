import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

const AdminDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingStudent(null);
    setRefresh(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    dashboardContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    title: {
      marginBottom: '30px',
      color: '#333',
      fontSize: '28px',
    },
    buttonContainer: {
      marginBottom: '30px',
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
    content: {
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.dashboardContainer}>
        <h2 style={styles.title}>Admin Dashboard</h2>
        <div style={styles.buttonContainer}>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
          <button onClick={handleAdd} style={styles.button}>Add Student</button>
        </div>
        <div style={styles.content}>
          {showForm ? (
<StudentForm student={editingStudent} userId={user?.id} onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <StudentList onEdit={handleEdit} refresh={refresh} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
