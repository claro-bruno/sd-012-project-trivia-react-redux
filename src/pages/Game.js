import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.renderQuestions = this.renderQuestions.bind(this);
  }

  renderQuestions() {
    const { questionsResponse: { questions } } = this.props;
    questions.map((item) => (
      <h3 key={ item.correct_answer }>{ item.category }</h3>));
  }

  render() {
    return (
      <section>
        <h3>Question Description</h3>
        <h3 data-testid="question-category">{ this.renderQuestions() }</h3>
        <h3 data-testid="question-text">Question</h3>
        <ul>
          <li />
        </ul>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsResponse: state.questions,
});

export default connect(mapStateToProps, null)(Game);
