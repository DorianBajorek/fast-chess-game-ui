import React, { type CSSProperties, useState } from 'react';
import { authenticateUser, showActiveUsers } from '../../FastChessGameSerive';
import useTokenStore from './TokenStore';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { updateToken } = useTokenStore();
  
  const loginContainerStyle: CSSProperties = {
    width: "100vw",
    height: "calc(100vh - 101px)",
    overflow: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const formStyle: CSSProperties = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  };

  const formGroupStyle: CSSProperties = {
    marginBottom: '1rem',
  };

  const labelStyle: CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle: CSSProperties = {
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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleAuthenticateUser = async () => {
    // Harcode user data
    setLogin("adam_rest_api")
    setPassword("Pass1234!")

    const token = await authenticateUser(login, password);
    updateToken(token);
  }

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
        <button type="submit" style={buttonStyle} onClick={handleAuthenticateUser}>Log In</button>
      </div>
    </div>
  );
};

export default Login;
