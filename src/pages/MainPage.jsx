import React from 'react';

const MainPage = ({ user }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Hola, {user?.name || "Usuario"}</h1>
      <p>Tu rol es: <strong>{user?.role || "Sin Rol"}</strong></p>
      <hr />
      {user?.role === 'ADMIN' && <button>Panel de Control Admin</button>}
      {user?.role === 'EMPLEADO' && <button>Registrar Cobro</button>}
    </div>
  );
};

export default MainPage;