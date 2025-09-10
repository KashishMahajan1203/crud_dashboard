import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
    },
    formContainer: {
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '400px',
      textAlign: 'center',
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
    select: {
      marginBottom: '15px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '15px',
    },
    link: {
      marginTop: '15px',
      color: '#666',
    },
    linkText: {
      color: '#667eea',
      textDecoration: 'none',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(email, password, role, name, course);
      if (user.role === 'admin') {
        alert('You signed up successfully. Please login.');
        navigate('/login');
      } else {
        alert('You signed up successfully. Please login.');
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.message === 'User already exists') {
        alert('You have an account already. Please login.');
        navigate('/login');
      } else {
        alert('Signup failed');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          {role === 'student' && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                style={styles.input}
              />
            </>
          )}
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/login" style={styles.linkText}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
