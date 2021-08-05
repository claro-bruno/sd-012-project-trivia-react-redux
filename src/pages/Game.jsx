import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTriviaAPI } from '../redux/action/index';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    const { getAPI } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAPI(token);
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    // const token = JSON.parse(localStorage.getItem('token'));
    // getAPI(token);
    return (
      <button type="button">um botao</button>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  getAPI: (token) => dispatch(getTriviaAPI(token)),
});

Game.propTypes = {
  getAPI: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.shape({
      category: PropTypes.string,
      question: PropTypes.string,
      correctAnswer: PropTypes.string,
      incorrectAnswers: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
