import React, { useState } from 'react';
import { authenticateUser } from '../../FastChessGameService';
import { useUserData } from './UserData';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../Constans';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { updateToken, updateUserName, updateEmail, updateRank } = useUserData();
  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleAuthenticateUser = async () => {
    const data = await authenticateUser(login, password);
    updateToken(data.token);
    updateUserName(data.username);
    updateEmail(data.email);
    updateRank(data.rank);
    console.log("asdas: " + data.rank)
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
  backgroundColor: COLORS.info_button,
  color: '#fff',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
};

export default Login;
