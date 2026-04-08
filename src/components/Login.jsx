import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLoginSuccess({
          name: credentials.email, 
          role: response.data.role
        });
      }
    } catch (err) {
      setError('Credenciales inválidas o servidor fuera de línea');
    } finally {
      setLoading(false);
    }
  };

  // Estilos "Dark Aesthetic" (Railway Style)
  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#09090b', // Fondo casi negro tipo Railway
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    },
    card: {
      backgroundColor: '#111113', // Tarjeta un pelín más clara
      padding: '40px',
      borderRadius: '16px',
      border: '1px solid #27272a', // Borde sutil
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      textAlign: 'center'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '8px',
      letterSpacing: '-0.5px'
    },
    subtitle: {
      color: '#a1a1aa',
      fontSize: '14px',
      marginBottom: '32px'
    },
    inputGroup: {
      textAlign: 'left',
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      color: '#e4e4e7',
      fontSize: '14px',
      marginBottom: '8px',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#18181b',
      border: '1px solid #27272a',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#fff', // Botón blanco para contraste máximo
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'opacity 0.2s'
    },
    error: {
      color: '#ff4e4e',
      fontSize: '13px',
      marginTop: '15px',
      backgroundColor: 'rgba(255, 78, 78, 0.1)',
      padding: '10px',
      borderRadius: '6px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.logo}>ASuServicio</div>
        <p style={styles.subtitle}>Gestión de Préstamos • Iniciar sesión</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              value={credentials.email} 
              onChange={handleChange} 
              placeholder="nombre@ejemplo.com"
              style={styles.input}
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button 
            type="submit" 
            style={{...styles.button, opacity: loading ? 0.7 : 1}}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Continuar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;