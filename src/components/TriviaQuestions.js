import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';

class TriviaQuestions extends Component {
  constructor() {
    super();

    this.state = {
      border: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { fetchQuestions } = this.props;
    const storage = JSON.parse(localStorage.getItem('token'));
    const questions = await fetchQuestions(storage);
    return questions;
  }

  handleClick() {
    if (document.querySelectorAll('.incorrect-answers')) {
      this.setState({
        border: '3px solid red',
      });
    } else {
      this.setState({
        border: '3px solid rgb(6, 240, 15)',
      });
    }
    console.log(classList);
  }

  // const { questions } = playerState;
  render() {
    const { border } = this.state;
    const { playerState } = this.props;
    return (
      <div>
        <ul lassName="major-list-question">
          { playerState.questions.map((question, index) => (
            <li className="list-questions" key={ index }>
              <p>{ question.category }</p>
              <p>{ question.question }</p>
              <section className="list-answers">
                <button
                  style={ { border } }
                  className="incorrect-answer"
                  type="button"
                  onClick={ this.handleClick }
                >
                  { question.incorrect_answers[0] }
                </button>
                <button
                  style={ { border } }
                  className="incorrect-answer"
                  type="button"
                  onClick={ this.handleClick }
                >
                  { question.incorrect_answers[1] }
                </button>
                <button
                  style={ { border } }
                  className="incorrect-answer"
                  type="button"
                  onClick={ this.handleClick }
                >
                  { question.incorrect_answers[2] }
                </button>
                <button
                  style={ { border } }
                  className="correct-answer"
                  type="button"
                  onClick={ this.handleClick }
                >
                  { question.correct_answer }
                </button>
              </section>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

TriviaQuestions.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  playerState: PropTypes.shape({
    forEach: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  playerState: state.fetchReducers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchApi(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);
