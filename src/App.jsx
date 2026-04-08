import React, { useState } from 'react';
import Login from './components/Login';
import MainPage from './pages/MainPage';

function App() {
  const [user, setUser] = useState(null); // Si es null, mostramos Login

  // Esta función se la pasaremos al Login para cuando tenga éxito
  const handleLoginSuccess = (userData) => {
    setUser(userData); 
  };

  return (
    <div>
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <MainPage user={user} />
      )}
    </div>
  );
}

export default App;