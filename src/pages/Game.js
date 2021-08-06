import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.changeVisibility = this.handleClickAnswers.bind(this);

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

  handleClickAnswers() {
    const cssValueWrong = '3px solid rgb(255, 0, 0)';
    const cssCorrectValue = '3px solid rgb(6, 240, 15)';
    document.getElementById('btn-next').style.display = 'block';
    document.getElementById('btnCorrectAnswer').style.border = cssCorrectValue;
    document.getElementById('btn-0').style.border = cssValueWrong;
    document.getElementById('btn-1').style.border = cssValueWrong;
    document.getElementById('btn-2').style.border = cssValueWrong;
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
          id="btnCorrectAnswer"
          onClick={
            this.handleClickAnswers
          }
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
              id={ `btn-${index}` }
              key={ key }
              onClick={
                this.handleClickAnswers
              }
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
        <div>
          { firstQuestion ? this.renderQuestions() : <p>LOADING</p> }
        </div>
        <button
          type="button"
          data-testid="btn-next"
          id="btn-next"
          // style={ { border: 'solid red 10px' } }
        >
          Next
        </button>
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
