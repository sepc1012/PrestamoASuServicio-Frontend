import React, { useState } from 'react';
import axios from 'axios'; 

const Login = ({ onLoginSuccess }) => { 
  // 1. Inicializamos con 'email' para que coincida con tu DTO de Java
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // 2. Enviamos el objeto 'credentials' que ahora tiene { email, password }
      const response = await axios.post('http://localhost:8080/auth/login', credentials);
      
      console.log("Respuesta del servidor:", response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        // 3. Pasamos los datos al componente padre. 
        // Usamos credentials.email porque username ya no existe en el estado.
        onLoginSuccess({
          name: credentials.email, 
          role: response.data.role
        });
      }
    } catch (err) {
      console.error("Error de login:", err);
      // Si el backend te da 403, caerá aquí
      setError('Credenciales inválidas o error de conexión');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>ASuServicio - Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={credentials.email} 
          onChange={handleChange} 
          placeholder="correo@ejemplo.com"
          required 
        />

        <label>Contraseña:</label>
        <input 
          type="password" 
          name="password" 
          value={credentials.password} 
          onChange={handleChange} 
          required
        />

        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <button type="submit" style={{ marginTop: '10px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;