import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';
import './Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      currentQuestion: 0,
      loading: true,
      shouldShowBtn: false,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.page = this.page.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.showBtnNextQuestion = this.showBtnNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const { token } = this.props;
    const apiUrl = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({ data, loading: false });
      return data;
    } catch (error) {
      return error;
    }
  }

  handleClickAnswer() {
    const incorrectList = document.getElementsByName('incorrect');
    const correctList = document.getElementById('correct');
    incorrectList.forEach((item) => { item.className = 'incorrect'; });
    correctList.className = 'correct';
    this.setState({
      shouldShowBtn: true,
    });
  }

  showBtnNextQuestion() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Next Question
      </button>
    );
  }

  page() {
    const { data,
      shouldShowBtn,
      currentQuestion,
    } = this.state;
    return (
      <>
        <Header />
        <fieldset>
          <h1
            data-testid="question-category"
          >
            {data.results[currentQuestion].category}
          </h1>
          <h2
            data-testid="question-text"
          >
            {data.results[currentQuestion].question}
          </h2>
          <ol>
            { data.results[currentQuestion].incorrect_answers
              .map(((answer, index) => (
                <li key={ index }>
                  <button
                    data-testid={ `wrong-answer-${index}` }
                    type="button"
                    onClick={ this.handleClickAnswer }
                    name="incorrect"
                  >
                    { answer }
                  </button>
                </li>
              ))) }
            <li>
              <button
                type="button"
                data-testid="correct-answer"
                id="correct"
                onClick={ this.handleClickAnswer }
              >
                {data.results[currentQuestion].correct_answer}
              </button>
            </li>
          </ol>
          {/* Chama o botão "Próxima"  */}
          { shouldShowBtn && this.showBtnNextQuestion() }
        </fieldset>
      </>
    );
  }

  pageRender() {
    const { loading } = this.state;
    return loading ? <h1>Loading...</h1> : this.page();
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? <Loading /> : this.pageRender();
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.login.isLoading,
  token: state.login.token,
});

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
