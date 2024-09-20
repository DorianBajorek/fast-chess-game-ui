import React from 'react';
import { COLORS } from '../Constans';
import { useToken } from './loginPage/TokenStore';
import { useNavigate } from 'react-router-dom';
;

const MainPage: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/table');
  }

  const handleLogin = () => {
    navigate('/login');
  }

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
          ) :
            <>
              <button onClick={handleLogin} style={styles.playButton}>Login</button>
            </>
          }
            <button style={styles.learnButton}>Learn More</button>
          </div>
        </div>
      </div>

      <div style={styles.extraInfo}>
        <h2 style={styles.extraTitle}>Latest News & Updates</h2>
        <p style={styles.extraDescription}>
          Stay tuned for the latest news, upcoming tournaments, and articles
          from the world of chess.
        </p>
        <a href="/news" style={styles.newsLink}>Read more</a>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
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
  learnButtonHover: {
    backgroundColor: '#007bb5',
  },
  extraInfo: {
    textAlign: 'center' as 'center',
    marginTop: '40px',
  },
  extraTitle: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  extraDescription: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#666',
  },
  newsLink: {
    color: '#007bb5',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  newsLinkHover: {
    textDecoration: 'underline',
  },
};

export default MainPage;
