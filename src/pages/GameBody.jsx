import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      disable: true,
    };
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  }

  createQuestion() {
    const { results } = this.props;
    const { index } = this.state;
    console.log('results GameBody', results[index]);
    const { category, question } = results[index];
    return (
      <div>
        <h3 data-testid="question-category">{ category }</h3>
        <h2 data-testid="question-text">{ question }</h2>
        {this.createOptions}
      </div>
    );
  }

  render() {
    const { disable } = this.state;
    return (
      <div>
        {this.createQuestion()}
        <button
          type="button"
          disable={ disable }
          onClick={ this.nextQuestion }
        >
          Next
        </button>
      </div>
    );
  }
}

GameBody.propTypes = {
  results: PropTypes.string.isRequired,
};

/* const mapStateToProps = (state) => ({
  results: state.questions.results,
}); */

export default GameBody;
