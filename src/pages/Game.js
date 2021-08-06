import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { questionsFetchAPI } from '../redux/actions';
import questions from '../questions';
import Button from '../components/Button';
import '../App.css';

class Game extends React.Component {
  constructor() {
    super();

    this.correctClick = this.correctClick.bind(this);
    this.wrongClick = this.wrongClick.bind(this);

    this.state = {
      correctAnswers: 0,
      questionPosition: 3,
      questionsDisable: false,
      color: false,
    };
  }

  componentDidMount() {
    const { props: { setQuestions, getToken } } = this;
    setQuestions(getToken);
  }

  correctClick() {
    const {
      state: { correctAnswers },
    } = this;

    this.setState((state) => ({
      ...state,
      correctAnswers: correctAnswers + 1,
      questionsDisable: true,
      color: true,
    }));
  }

  wrongClick() {
    this.setState((state) => ({
      ...state,
      questionsDisable: true,
      color: true,
    }));
  }

  render() {
    const {
      state: { questionPosition, questionsDisable, color },
      correctClick,
      wrongClick,
    } = this;

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionPosition];

    return (
      <>
        <Header />
        <section>
          <h2 data-testid="question-category">{ category }</h2>
          <h3 data-testid="question-text">{ question }</h3>
          <section>
            {
              incorrectAnswers.map((answers, index) => (
                <Button
                  testId={ `wrong-answer-${index}` }
                  key={ answers }
                  name={ answers }
                  handleClick={ wrongClick }
                  disabled={ questionsDisable }
                  className={ color ? 'wrongColor' : null }
                />
              ))
            }
            <Button
              testId="correct-answer"
              name={ correctAnswer }
              handleClick={ correctClick }
              disabled={ questionsDisable }
              className={ color ? 'correctColor' : null }
            />
          </section>
        </section>
      </>
    );
  }
}

const { string, func } = PropTypes;
Game.propTypes = {
  getToken: string.isRequired,
  setQuestions: func.isRequired,
};

const mapStateToProps = (state) => ({
  getToken: state.tokenTriviaReducer.token,
  getQuestions: state.questionsTriviaReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  setQuestions: (token) => dispatch(questionsFetchAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
