import React from 'react';
import PropTypes from 'prop-types';
import { answerCheck, classChanger } from '../helpers';

class Answers extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      click: false,
    };
  }

  handleClick() {
    const { click } = this.state;
    if (!click) {
      this.setState({
        click: true,
      });
    }
  }

  render() {
    const { answers, correctAnswer } = this.props;
    const { click } = this.state;
    return (
      <section className="btnSection">
        { answers.map((e, i) => (
          <button
            type="button"
            className={ classChanger(correctAnswer, e, click) }
            key={ i }
            data-testid={ answerCheck(correctAnswer, e, i) }
            onClick={ this.handleClick }
          >
            { e }
          </button>)) }
      </section>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

export default Answers;
