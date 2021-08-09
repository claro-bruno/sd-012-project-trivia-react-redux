import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.renderQuestions = this.renderQuestions.bind(this);
  }

  // logica baseada no seguinte repositorio https://github.com/tryber/sd-012-project-trivia-react-redux/pull/8/commits/a93062a005d249fcc708168294a7926669bbf914
  renderQuestions() {
    const { triviaQuest } = this.props;
    return (
      <div>
        <p data-testid="question-category">
          { triviaQuest[0].category }
        </p>
        <p data-testid="question-text">
          { triviaQuest[0].question }
        </p>
        <button
          type="button"
          data-testid="correct-answer"
        >
          { triviaQuest[0].correct_answer }
        </button>
        {
          triviaQuest[0].incorrect_answers.map((key, index) => (
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
              key={ key }
            >
              { key }
            </button>
          ))
        }
      </div>
    );
  }

  render() {
    const { triviaQuest } = this.props;
    const firstQuestion = triviaQuest[0];
    return (
      <section>
        <Header />
        { firstQuestion ? this.renderQuestions() : <p>LOADING</p> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuest: state.questions.questions,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  triviaQuest: propTypes.arrayOf(propTypes.object).isRequired,
};
