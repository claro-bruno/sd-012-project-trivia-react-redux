import React from 'react';
import { connect } from 'react-redux';

class Quest extends React.Component {
  render() {
    const { quests } = this.props;
    const { question, category, correct_answer, incorrect_answers: incorret } = quests[0];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button type="button" data-testid="correct-answer">
          { correct_answer }
        </button>
        { incorret.map((wrong, index) => {
          return (
            <button
              data-testid={`wrong-answer-${index}`}
              type="button"
              key={ index }
            >
              { wrong }
            </button>
          );
        }) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quests: state.quest.quests,
});

export default connect(mapStateToProps)(Quest);
