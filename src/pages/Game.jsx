import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Trivia from '../components/Trivia';

const MOCK_QUESTION = [{
  category: 'Entertainment: Video Games',
  type: 'multiple',
  difficulty: 'easy',
  question: 'What is the first weapon you acquire in Half-Life?',
  correct_answer: 'A crowbet',
  incorrect_answers: [
    'A pistol',
    'The H.E.V suit',
    'Your fists',
  ],
},
];

class Game extends React.Component {
  render() {
    const { picture, nick } = this.props;
    return (
      <div>
        <Trivia trivia={ MOCK_QUESTION[0] } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
});

Game.propTypes = {
  picture: PropTypes.string.isRequired,
  nick: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
