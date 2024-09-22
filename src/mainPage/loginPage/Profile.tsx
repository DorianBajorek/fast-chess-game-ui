import React from 'react';
import { useUserData } from './UserData';

const Profile: React.FC = () => {

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin: '300px auto',
    animation: 'fadeIn 0.5s ease-in-out',
  };

  const profileInfoStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    marginTop: '20px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#333',
  };

  const userName = useUserData().userName;

  return (
    <div style={containerStyle}>
    <img src='../userAvatar.png' />
      <div style={profileInfoStyle}>
        <span style={labelStyle}>Username</span>
        <span style={valueStyle}>{userName}</span>
      </div>
    </div>
  );
};

export default Profile;
