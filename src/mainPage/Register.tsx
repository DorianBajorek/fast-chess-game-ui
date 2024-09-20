import React, { useState } from 'react';
import { registerUser } from '../FastChessGameSerive';
import { useToken } from './loginPage/TokenStore';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../Constans';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { updateToken } = useToken();
  const navigate = useNavigate();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleRegisterUser = async () => {
    try {
      const token = await registerUser(email, username, password);
      navigate("/")
      updateToken(token);
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  return (
    <div style={registerContainerStyle}>
      <div style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            style={inputStyle}
            onChange={handleEmailChange}
            value={email}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            style={inputStyle}
            onChange={handleUsernameChange}
            value={username}
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
        <button type="button" style={buttonStyle} onClick={handleRegisterUser}>Register</button>
      </div>
    </div>
  );
};

const registerContainerStyle: React.CSSProperties = {
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
  backgroundColor: COLORS.info_button,
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
};

export default Register;
