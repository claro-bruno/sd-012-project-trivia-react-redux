import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAnswers, fetchToken } from '../redux/actions';

class Questions extends Component {
  async componentDidMount() {
    await this.getAnserws();
  }

  async getAnserws() {
    const { getQuestions, getDataFromApi, userInfo } = this.props;
    getDataFromApi();
    let token = localStorage.getItem('token');
    if (!token) {
      const testToken = userInfo;
      localStorage.setItem('token', testToken.token);
      token = localStorage.getItem('token');
    }
    const qty = 5;
    await getQuestions(token, qty);
  }

  render() {
    const { questions, isFetching } = this.props;
    if (isFetching) return <p>Loading...</p>;
    console.log(questions);

    return (
      <div className="question">
        {questions.map(({ category,
          question,
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
        }, index) => (
          <div key={ index }>
            <p data-testid="question-text">{question}</p>
            <h3 data-testid="question-category">{category}</h3>
            <button data-testid="correct-answer" type="button">{correctAnswer}</button>
            {incorrectAnswers.map((incorrect) => (
              <button
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                type="button"
              >
                {incorrect}

              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token, qty) => dispatch(fetchAnswers(token, qty)),
  getDataFromApi: (data) => dispatch(fetchToken(data)),
});

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  isFetching: state.questionsReducer.isFetching,
  userInfo: state.userReducer.info,
});

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  getDataFromApi: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
