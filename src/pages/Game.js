import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuiz } from '../redux/actions';
import Loading from '../components/Loading';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      index: 0,
      redirect: false,
    };
    this.displayQuiz = this.displayQuiz.bind(this);
    this.displayQuestion = this.displayQuestion.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.borderChange = this.borderChange.bind(this);
  }

  componentDidMount() {
    this.displayQuiz();
  }

  async displayQuiz() {
    const { quizToRedux } = this.props;
    await quizToRedux();
    this.endFetch();
  }

  endFetch() {
    const { quizFromRedux } = this.props;
    console.log(quizFromRedux);
    return quizFromRedux.length > 0 ? this.setState({ loading: false }) : null;
  }

  // source: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  checkCorrect(item, correct, index) {
    if (item === correct) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  borderChange() {
    const buttons = document.querySelectorAll('button');
    // const { name } = target;
    buttons.forEach((button) => {
      if (button.id === 'correct-answer') button.classList.add('acertou');
      else button.classList.add('errou');
    });
  }

  displayQuestion() {
    const { quizFromRedux } = this.props;
    const { index } = this.state;
    const {
      category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrect = [] } = quizFromRedux[index];

    const sortedArray = [correct, ...incorrect];
    this.shuffleArray(sortedArray);
    console.log(sortedArray);
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <br />
        <p data-testid="question-text">{ question }</p>
        <ul>
          { sortedArray.map((item, i) => (
            <li
              key={ item }
            >
              <button
                type="button"
                onClick={ this.borderChange }
                data-testid={ this.checkCorrect(item, correct, i) }
                id={ this.checkCorrect(item, correct, i) }
              >
                {item}
              </button>
            </li>)) }
        </ul>
      </div>
    );
  }

  handleClick() {
    const { index } = this.state;
    const arrLength = 4;
    if (index < arrLength) {
      return this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }
    return this.setState({
      redirect: true,
    });
  }

  render() {
    const { loading, redirect, index } = this.state;
    const redirectNumber = 4;
    return (
      <div>
        <Header />
        { redirect ? <Redirect to="/score" /> : null }
        { loading ? <Loading /> : this.displayQuestion() }
        <buton onClick={ this.handleClick } type="button" className="btn btn-primary">
          { index < redirectNumber ? 'Proxima' : 'Ver Pontuação' }
        </buton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quizFromRedux: state.quizReducer.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  quizToRedux: () => dispatch(getQuiz()),
});

Game.propTypes = {
  quizFromRedux: PropTypes.arrayOf(PropTypes.string).isRequired,
  quizToRedux: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
