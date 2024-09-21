import React from 'react';
import { COLORS } from '../Constans';
import { useToken } from './loginPage/TokenStore';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const MainPage: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/table');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.introSection}>
        <img
          src="board-main-page.jpg"
          alt="Chess"
          style={styles.chessImage}
        />
        <div style={styles.introText}>
          <h1 style={styles.title}>Welcome to Chess Portal</h1>
          <p style={styles.description}>
            Discover the world of chess. Play, learn, and challenge yourself!
            Our portal offers everything you need to become a better player.
          </p>
          <div style={styles.actionButtons}>
            {token ? (
              <button onClick={handleStartGame} style={styles.playButton}>Start Playing</button>
            ) : (
              <button onClick={handleLogin} style={styles.playButton}>Login</button>
            )}
            <button style={styles.learnButton}>Learn More</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    paddingTop: '100px',
    fontFamily: 'Arial, sans-serif',
    flex: '1',
    justifyContent: 'space-between' as 'space-between',
    height: 'calc(100vh - 160px)'
  },
  introSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  chessImage: {
    width: '300px',
    height: 'auto',
    borderRadius: '10px',
    marginRight: '20px',
  },
  introText: {
    maxWidth: '500px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  playButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: COLORS.confirm_button,
    color: 'white',
    transition: 'background-color 0.3s ease',
  },
  learnButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#008CBA',
    color: 'white',
    transition: 'background-color 0.3s ease',
  },
};

export default MainPage;
