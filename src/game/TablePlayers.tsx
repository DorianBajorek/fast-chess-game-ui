import React, { useEffect, useState } from 'react';
import { checkIfSomeoneWantsToPlay, showActiveUsers, wantPlay } from '../FastChessGameService';
import { useUserData } from '../mainPage/loginPage/UserData';
import { useNavigate } from 'react-router-dom';

interface Player {
  id: number;
  name: string;
  rank: number;
}

const TablePlayers: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const username = useUserData().userName;
  const token = useUserData().token;
  const navigate = useNavigate();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await showActiveUsers(token);
        const loggedInUsers = response?.data;

        if (!loggedInUsers) {
          console.error('No user is logged.');
          return;
        }

        const playersData: Player[] = loggedInUsers.map((user: any, index: number) => ({
          id: index + 1,
          name: user.username,
          rank: user.rank,
        }));

        setPlayers(playersData);
      } catch (error) {
        console.error('Something went wrong', error);
      }
    };

    const checkIfSomeoneWantsToPlayImmediately = async () => {
      try {
        const response = await checkIfSomeoneWantsToPlay(token);
        console.log("Immediate Check Response: ", response);

        if (response.room !== -1) {
          const roomKey = response.room;
          const ws = new WebSocket(`ws://127.0.0.1:8000/ws/room/${roomKey}/?token=${token}`);

          ws.onopen = () => {
            console.log('WebSocket connection established');
          };

          ws.onmessage = (event) => {
            console.log('Message from server: ', event.data);
          };

          ws.onerror = (error) => {
            console.error('WebSocket error: ', error);
          };

          ws.onclose = () => {
            console.log('WebSocket connection closed');
          };

          setSocket(ws);
          navigate(`/game/${roomKey}`, { state: { playerName: response.competitor } }); // Updated URL
        } else {
          console.log("No one wants to play right now.");
        }
      } catch (error) {
        console.error('Failed to check if someone wants to play', error);
      }
    };

    fetchPlayers();
    checkIfSomeoneWantsToPlayImmediately();

    const intervalId = setInterval(checkIfSomeoneWantsToPlayImmediately, 5000);

    return () => clearInterval(intervalId);
  }, [token]);

  const handlePlay = async (playerName: string) => {
    const response = await wantPlay(username, token, playerName);
    console.log("JAZDA: " + JSON.stringify(response, null, 2));

    if (response && response.key !== -1) {
      const roomKey = response.key;
      const ws = new WebSocket(`ws://127.0.0.1:8000/ws/room/${roomKey}/?token=${token}`);

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        console.log('Message from server: ', event.data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error: ', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      setSocket(ws); // Save the socket to state if you want to use it later
      navigate(`/game/${roomKey}`, { state: { playerName } }); // Updated URL
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Logged Players</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Rank</th>
            <th style={styles.tableHeader}></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{player.name}</td>
              <td style={styles.tableCell}>{player.rank}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.playButton}
                  onClick={() => handlePlay(player.name)}
                >
                  Play
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '50px',
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  title: {
    textAlign: 'center' as 'center',
    fontSize: '24px',
    margin: '20px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    backgroundColor: '#f9f9f9',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    textAlign: 'left' as 'left',
    fontWeight: 'bold' as 'bold',
    fontSize: '16px',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left' as 'left',
    fontSize: '14px',
    color: '#333',
  },
  playButton: {
    padding: '8px 16px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  playButtonHover: {
    backgroundColor: '#007bb5',
  },
};

export default TablePlayers;
