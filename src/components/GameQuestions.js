import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import Timer from './Timer';

const correctAnswerId = 'correct-answer';

const htmldecode = (str) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

const Category = styled.h2`
  font-size: 1.5rem;
  color: hsla(0, 0%, 100%, 62.5%);
  border-bottom: 1px dashed hsla(0, 0%, 100%, 62.5%); 
  margin-bottom: 1rem;

  @media (min-width: 60rem) {
    font-size: 1.75rem;
  }
`;

const Question = styled.h3`
  font-size: 1.125rem;

  @media (min-width: 60rem) {
    font-size: 1.25rem;
  }
`;

const Answer = styled.button`
  display: block;
  padding: 0.625rem;
  opacity: ${({ theme: { answered, over } }) => {
    if (answered || over) return '0.875';
  }};
  border: ${({ theme: { answered, over, id } }) => {
    if (answered || over) {
      return `3px solid ${id === correctAnswerId
        ? 'rgb(6, 240, 15)' : 'rgb(255, 0, 0)'}`;
    }
    return '3px solid hsla(198, 60%, 50%, 50%)';
  }};
  border-radius: 1rem;
  background-color: transparent;
  font-size: 0.875rem;
  color: hsl(0, 0%, 100%);
  width: 100%;
  max-width: 27.5rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;

  @media (min-width: 60rem) {
    max-width: none;
  }

  @media (hover:hover) {
    &:hover {
      filter: brightness(1.75);
    }
  }
`;

const NextBtn = styled.button`
  display: block;
  padding: 0.875rem 2.5rem;
  border: none;
  border-radius: 2.5rem;
  background: linear-gradient(to right, hsl(198, 60%, 50%), hsl(176, 68%, 64%));
  color: hsl(0, 0%, 100%);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem auto;
  cursor: pointer;
`;

const Grid = styled.main`
  max-width: 40rem;
  margin-left:auto;
  margin-right:auto;
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 60rem) {
    margin-top: 4rem;
    max-width: 60rem;
    padding-left: 2rem;
    padding-right: 2rem;
    grid-template-columns: 4fr 5fr;
    gap: 4rem;
  }
`;

class GameQuestions extends Component {
  generateAnswers(correct, incorrect) {
    return [
      {
        answer: correct,
        id: correctAnswerId,
      },
      ...incorrect.map((item, index) => ({
        answer: item, id: `wrong-answer-${index}`,
      })),
    ].sort((a, b) => a.answer.localeCompare(b.answer));
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  }

  questionAnswered({ target: { id } }) {
    const { onAnswer, time, questionObj: { difficulty } } = this.props;
    const defaultPoint = 10;
    const difficultyPoints = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    if (id === correctAnswerId) {
      const state = JSON.parse(localStorage.getItem('state'));
      const newState = {
        player: {
          ...state.player,
          score: state.player.score
              + defaultPoint + (time * difficultyPoints[difficulty]),
          assertions: state.player.assertions + 1,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
    onAnswer();
  }

  render() {
    const { questionObj, nextQuestion, answered, over, counter } = this.props;
    // if (questionObj === undefined) return 'Erro';
    const lastQuestion = 5;
    if (counter === lastQuestion) return <Redirect to="/feedback" />;
    const
      { category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionObj;
    return (
      <Grid>
        <div>
          <Timer answered={ answered } />
          <Category data-testid="question-category">{htmldecode(category)}</Category>
          <Question data-testid="question-text">{htmldecode(question)}</Question>
        </div>
        <div>
          {
            this.generateAnswers(correctAnswer, incorrectAnswers)
              .map(({ answer, id }) => (
                <ThemeProvider theme={ { answered, over, id } } key={ id }>
                  <Answer
                    type="button"
                    data-testid={ id }
                    id={ id }
                    disabled={ answered || over }
                    onClick={ (e) => this.questionAnswered(e) }
                  >
                    {htmldecode(answer)}
                  </Answer>
                </ThemeProvider>
              ))
          }
          { answered || over
            ? (
              <NextBtn
                type="button"
                data-testid="btn-next"
                onClick={ nextQuestion }
              >
                Próximo
              </NextBtn>
            ) : '' }
        </div>
      </Grid>
    );
  }
}

GameQuestions.propTypes = {
  questionObj: PropTypes.objectOf(Object),
  nextQuestion: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  over: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
};

GameQuestions.defaultProps = {
  questionObj: undefined,
};

const mapStateToProps = (state) => ({
  over: state.userInfo.over,
  time: state.userInfo.time,
});

export default connect(mapStateToProps)(GameQuestions);
