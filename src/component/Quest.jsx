import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuest } from '../actions';
import Header from './Header';
import * as fetchAPI from '../helpers/fetchAPI';

class Quest extends React.Component {
  async componentDidMount() {
    const { questsFn } = this.props;
    const token = localStorage.getItem('token');
    questsFn(token);
  }

  render() {
    const { quests, isLoading, name, email } = this.props;
    if (isLoading) return <div>Loading...</div>;
    const avatar = fetchAPI.fetAvatar(md5(email).toString());
    const {
      question,
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorret,
    } = quests[0];
    return (
      <>
        <Header name={ name } avatar={ avatar } />
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
      </>
    );
  }
}

Quest.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.object).isRequired,
  questsFn: PropTypes.func.isRequired,
  isLoading: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  quests: state.quest.quests,
  isLoading: state.quest.isLoading,
  name: state.user.name,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  questsFn: (quest) => dispatch(fetchQuest(quest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quest);
