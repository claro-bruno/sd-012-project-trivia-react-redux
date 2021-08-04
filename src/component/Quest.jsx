import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuest } from '../actions';

class Quest extends React.Component {
  componentDidMount() {
    const { questsFn } = this.props;
    console.log(questsFn);
    const token = localStorage.getItem('token');
    questsFn(token);
  }

  render() {
    const { quests, isLoading } = this.props;
    // console.log('Q', quests);
    if (isLoading) return <div>Loading...</div>;
    const {
      question,
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorret,
    } = quests[0];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button type="button" data-testid="correct-answer">
          { correctAnswer }
        </button>
        { incorret.map((wrong, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            type="button"
            key={ index }
          >
            { wrong }
          </button>)) }
      </div>
    );
  }
}

Quest.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.object).isRequired,
  questsFn: PropTypes.func.isRequired,
  isLoading: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  quests: state.quest.quests,
  isLoading: state.quest.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  questsFn: (quest) => dispatch(fetchQuest(quest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quest);
