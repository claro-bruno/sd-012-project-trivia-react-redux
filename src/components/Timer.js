import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ timer, answered }) => {
  const [counter, setCounter] = useState(timer);
  const interval = 1000;
  const timeout = 5000;
  console.log(answered);

  useEffect(() => {
    if (counter > 0 && !answered) {
      setTimeout(() => setCounter(counter - 1), interval);
    }
    if (answered) {
      clearTimeout();
    }
  }, [counter, answered]);

  useEffect(() => {
    const correctAnswer = document.querySelector('.correct-answer-btn');
    const incorrectBtn = document.querySelectorAll('.incorrect-answer-btn');
    if (counter > 0) {
      correctAnswer.disabled = false;
    } else if (counter <= 0) {
      correctAnswer.disabled = true;
      for (let i = 0; i < incorrectBtn.length; i += 1) {
        incorrectBtn[i].disabled = true;
      }
      setTimeout(() => {
        correctAnswer.disabled = false;
      }, timeout);
    }
  }, [counter]);

  return (
    <div>
      Tempo:
      {' '}
      {counter}
    </div>
  );
};

export default Timer;

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  answered: PropTypes.bool.isRequired,
};
