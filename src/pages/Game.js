import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
      disabled: false,
    };

    this.renderQuestions = this.renderQuestions.bind(this);
    this.setCounter = this.setCounter.bind(this);
  }

  // Requisito 8 - para fazer foi consultado essa vídeo-aula: https://www.youtube.com/watch?v=NAx76xx40jM

  componentDidMount() {
    this.setCounter();
  }

  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.myInterval);
    }
  }

  setCounter() {
    const ONE_SECOND = 1000;

    this.myInterval = setInterval(() => {
      const { count } = this.state;
      if (count === 1) {
        this.setState((prevState) => ({
          count: prevState.count - 1,
          disabled: true,
        }));
      } else {
        this.setState((prevState) => ({
          count: prevState.count - 1,
        }));
      }
    }, ONE_SECOND);
  }

  // logica baseada no seguinte repositorio https://github.com/tryber/sd-012-project-trivia-react-redux/pull/8/commits/a93062a005d249fcc708168294a7926669bbf914
  renderQuestions() {
    const { triviaQuest } = this.props;
    const { count, disabled } = this.state;

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
          disabled={ disabled }
        >
          { triviaQuest[0].correct_answer }
        </button>
        {
          triviaQuest[0].incorrect_answers.map((key, index) => (
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
              key={ key }
              disabled={ disabled }
            >
              { key }
            </button>
          ))
        }

        <h3>
          Tempo:
          { count }
        </h3>
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
