import React from 'react';

const Game: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '150px',
    position: 'relative',
  };

  const imageStyle: React.CSSProperties = {
    width: '20%',
    borderRadius: '10px',
  };


  return (
    <div style={containerStyle}>
      <img style={imageStyle} src='gameIcon/board.png' alt="Game Board" />
    </div>
  );
};

export default Game;
