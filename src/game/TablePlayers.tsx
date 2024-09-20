import React from 'react';

interface Player {
  id: number;
  name: string;
  rank: number;
}

const TablePlayers: React.FC = () => {
  const players: Player[] = [
    { id: 1, name: 'John Doe', rank: 1200 },
    { id: 2, name: 'Jane Smith', rank: 1500 },
    { id: 3, name: 'Carlos Hernández', rank: 1800 },
    { id: 4, name: 'Marie Dupont', rank: 1700 },
    { id: 5, name: 'Li Wei', rank: 1400 },
  ];

  const handlePlay = (playerName: string) => {
    alert(`Challenging ${playerName} to a game!`);
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
