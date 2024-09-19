import React, { useState } from 'react';
import { authenticateUser } from '../../FastChessGameSerive';
import { useToken } from './TokenStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { updateToken } = useToken();
  const navigate = useNavigate();
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleAuthenticateUser = async () => {
    const token = await authenticateUser(login, password);
    updateToken(token);
    navigate('/');
  };

  return (
    <div style={loginContainerStyle}>
      <div style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            style={inputStyle}
            onChange={handleLoginChange}
            value={login}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            style={inputStyle}
            onChange={handlePasswordChange}
            value={password}
            required
          />
        </div>
        <button type="button" style={buttonStyle} onClick={handleAuthenticateUser}>Log In</button>
      </div>
    </div>
  );
};

const loginContainerStyle: React.CSSProperties = {
  width: "100vw",
  height: "calc(100vh - 101px)",
  overflow: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  width: '100%',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '1rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

export default Login;
