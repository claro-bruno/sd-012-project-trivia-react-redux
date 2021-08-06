import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { questionsFetchAPI } from '../redux/actions';
import questions from '../questions';
import Button from '../components/Button';

class Game extends React.Component {
  componentDidMount() {
    const { props: { setQuestions, getToken } } = this;
    setQuestions(getToken);
  }

  render() {
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[0];

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
                />
              ))
            }
            <Button
              data-testid="correct-answer"
              name={ correctAnswer }
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
