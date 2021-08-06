import React from 'react';

function getScore() {
  const score = localStorage.getItem('score');
  return <h4 data-testid="header-score">{score}</h4>;
}

export default (getScore);
