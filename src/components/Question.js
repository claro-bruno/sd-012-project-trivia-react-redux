import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Answers from './Answers';
import { shuffleArray, addRankingToStorage } from '../helpers';
import styles from './Question.module.css';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.nextClick = this.nextClick.bind(this);

    this.state = {
      questionNumber: 0,
    };
  }

  nextClick() {
    const { questionNumber } = this.state;
    const { history, name, score, picture, questions } = this.props;
    const lastPosition = questions.length - 1;

    if (questionNumber < lastPosition) {
      this.setState((prevState) => ({
        questionNumber: prevState.questionNumber + 1,
      }));
    } else {
      addRankingToStorage({
        name,
        score,
        picture,
      });
      history.push('/feedback');
    }
  }

  render() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];
    const answers = [...incorrectAnswers, correctAnswer];
    shuffleArray(answers);
    return (
      <main className={ styles.mainGame }>
        <section className={ styles.questionGame }>
          <h4 data-testid="question-category">{ category }</h4>
          <p data-testid="question-text">{ question }</p>
          <Answers
            answers={ answers }
            correctAnswer={ correctAnswer }
            difficulty={ difficulty }
            nextQuestion={ this.nextClick }
          />
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  picture: state.user.image,
  name: state.user.name,
  score: state.game.score,
});

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Question);
