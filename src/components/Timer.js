import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/timer.css';

const Timer = ({ timer, answered, index }) => {
  const [counter, setCounter] = useState(timer);
  const interval = 1000;
  const timeout = 5000;

  useEffect(() => {
    if (counter > 0 && !answered) {
      setTimeout(() => setCounter(counter - 1), interval);
    }
    if (answered) {
      clearTimeout();
      setCounter(timer);
    }
  }, [counter, answered, index, timer]);

  useEffect(() => {
    const correctAnswer = document.getElementById('correct-btn');
    const incorrectBtn = document.querySelectorAll('#incorrect-btn');
    if (counter > 0) {
      correctAnswer.disabled = false;
    } else if (counter <= 0 || answered) {
      correctAnswer.disabled = true;
      for (let i = 0; i < incorrectBtn.length; i += 1) {
        incorrectBtn[i].disabled = true;
      }
      setTimeout(() => {
        correctAnswer.disabled = false;
      }, timeout);
    }
  }, [counter, answered]);

  return (
    <div className="component_timer">
      <span id="timer">
        {counter}
      </span>
    </div>
  );
};

export default Timer;

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  answered: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
