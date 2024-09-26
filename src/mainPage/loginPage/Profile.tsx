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
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
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
    marginBottom: '10px',
  };

  const userData: React.CSSProperties = {
    margin: '10px'
  }
  const userName = useUserData().userName;
  const email = useUserData().email;
  const rank = useUserData().rank;

  return (
    <div style={containerStyle}>
      <img src='../userAvatar.png' alt="User Avatar" />
      <div style={profileInfoStyle}>
        <div style={userData}>
          <span style={labelStyle}>Username</span>
          <div style={valueStyle}>{userName}</div>
        </div>
        <div style={userData}>
          <span style={labelStyle}>Email</span>
          <div style={valueStyle}>{email}</div>
        </div>
        <div style={userData}>
          <span style={labelStyle}>Rank</span>
          <div style={valueStyle}>{rank}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
