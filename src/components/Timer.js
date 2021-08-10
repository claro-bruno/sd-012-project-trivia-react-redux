import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const changeColorAnswer = () => {
  const correctAnswer = document.getElementById('correct-answer-btn');
  const incorrectAnswers = document.getElementsByName('incorrect');

  incorrectAnswers.forEach((question) => {
    question.className = 'incorrect-answer-btn';
  });
  correctAnswer.className = 'correct-answer-btn';
  correctAnswer.disable = false;
  incorrectAnswers.disable = false;

  this.setState({ disableButton: true });
};

const Timer = ({ timer }) => {
  const [counter, setCounter] = useState(timer);
  const interval = 1000;
  const timeout = 5000;

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), interval);
    }
  }, [counter]);
  console.log(counter);

  useEffect(() => {
    const correctAnswer = document.querySelector('.correct-answer-btn');
    const incorrectBtn = document.querySelectorAll('.incorrect-answer-btn');
    if (counter > 0) {
      correctAnswer.disabled = false;
    } else if (counter <= 0) {
      correctAnswer.disabled = true;
      changeColorAnswer();
      for (let i = 0; i < incorrectBtn.length; i += 1) {
        incorrectBtn[i].disabled = true;
      }
      setTimeout(() => {
        correctAnswer.disabled = false;
      }, timeout);
    }
  });

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
};
