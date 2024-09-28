import React, { useState, useEffect } from 'react';
import '../App.css';

const WinnerAnimation = ({ winner }) => {
  const [countdown, setCountdown] = useState(3);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    let countdownTimer;
    if (countdown > 0) {
      countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setShowWinner(true);
    }
    return () => clearTimeout(countdownTimer);
  }, [countdown]);

  return (
    <div className="winner-animation">
      {!showWinner ? (
        <h1>{countdown}</h1>
      ) : (
        <div className="winner-details">
          <h2>The Winner is...</h2>
          <p>Name: {winner.name}</p>
          <p>Mobile: {winner.mobile}</p>
          <p>Address: {`${winner.houseNumber}, ${winner.city}, ${winner.state}`}</p>
        </div>
      )}
    </div>
  );
};

export default WinnerAnimation;
