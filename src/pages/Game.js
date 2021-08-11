import React from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
// import { getQuiz } from '../redux/actions';
// import Timer from '../components/Timer';
import './Game.css';
import Questions from '../components/Questions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   quizFromRedux: state.quizReducer.quiz,
// });

// const mapDispatchToProps = (dispatch) => ({
//   quizToRedux: () => dispatch(getQuiz()),
// });

// Game.propTypes = {
//   quizFromRedux: PropTypes.arrayOf(PropTypes.string).isRequired,
//   quizToRedux: PropTypes.func.isRequired,
// };

export default Game;
