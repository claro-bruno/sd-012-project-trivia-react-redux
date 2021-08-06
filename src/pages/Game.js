import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { questionsFetchAPI } from '../redux/actions';
import questions from '../questions';
import Button from '../components/Button';

class Game extends React.Component {
<<<<<<< HEAD
  constructor() {
    super();

    this.correctClick = this.correctClick.bind(this);
    this.wrongClick = this.wrongClick.bind(this);

    this.state = {
      correctAnswers: 0,
      questionPosition: 3,
      questionsDesable: false,
    };
  }

=======
>>>>>>> af74a33f23c79838f333ce7f4c774c86ee31887c
  componentDidMount() {
    const { props: { setQuestions, getToken } } = this;
    setQuestions(getToken);
  }

<<<<<<< HEAD
  correctClick() {
    const {
      state: { correctAnswers },
    } = this;

    this.setState((state) => ({
      ...state,
      correctAnswers: correctAnswers + 1,
      questionsDesable: true,
    }));
  }

  wrongClick() {
    this.setState((state) => ({
      ...state,
      questionsDesable: true,
    }));
  }

  render() {
    const {
      state: { questionPosition, questionsDesable },
      correctClick,
      wrongClick,
    } = this;

    const {
=======
  render() {
    const {
>>>>>>> af74a33f23c79838f333ce7f4c774c86ee31887c
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
<<<<<<< HEAD
    } = questions[questionPosition];
=======
    } = questions[0];
>>>>>>> af74a33f23c79838f333ce7f4c774c86ee31887c

    return (
      <>
        <Header />
        <section>
          <h2 data-testid="question-category">{ category }</h2>
          <h3 data-testid="question-text">{ question }</h3>
          <section data-testid="correct-answer">
            {
              incorrectAnswers.map((answers, index) => (
                <Button
                  data-testid={ `wrong-answer-${index}` }
                  key={ answers }
                  name={ answers }
<<<<<<< HEAD
                  handleClick={ wrongClick }
                  disabled={ questionsDesable }
=======
>>>>>>> af74a33f23c79838f333ce7f4c774c86ee31887c
                />
              ))
            }
            <Button
              data-testid="correct-answer"
              name={ correctAnswer }
<<<<<<< HEAD
              handleClick={ correctClick }
              disabled={ questionsDesable }
=======
>>>>>>> af74a33f23c79838f333ce7f4c774c86ee31887c
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
