import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const Game: React.FC = () => {
  const [game, setGame] = useState(new Chess());

  const handleMove = (move: { from: string; to: string }) => {
    const newGame = new Chess(game.fen());

    try {
      const result = newGame.move({
        from: move.from,
        to: move.to,
        promotion: 'q',
      });

      if (result) {
        setGame(newGame);
        return true;
      }
    } catch (error) {
      console.error("Invalid move:", error);
    }

    return false;
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const boardStyle: React.CSSProperties = {
    width: '400px',
  };

  return (
    <div style={containerStyle}>
      <div style={boardStyle}>
        <Chessboard
          position={game.fen()}
          onPieceDrop={(sourceSquare, targetSquare) =>
            handleMove({ from: sourceSquare, to: targetSquare })
          }
        />
      </div>
    </div>
  );
};

export default Game;
