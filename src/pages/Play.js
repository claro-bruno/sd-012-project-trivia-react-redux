import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { nextQuestion } from '../redux/actions/nextQuestion';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const token = JSON.parse(localStorage.getItem('token'));
    const END_POINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(END_POINT);
    const json = await response.json();
    this.setState({ questions: json, loading: false });
  }

  handleClick() {
    const { setNextQuestion } = this.props;
    setNextQuestion(false);
  }

  render() {
    const { questions: { results } } = this.state;
    const { numQuestion, nextVisible } = this.props;
    const { loading } = this.state;

    if (loading) return <div>Loading...</div>;

    return (
      <div>
        <Header />
        <Questions dataQuestion={ results[numQuestion] } />
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClick }
          disabled={ !nextVisible }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numQuestion: state.nextQuestion.nextCount,
  nextVisible: state.nextQuestion.nextVisible,
});

const mapDispatchToProps = (dispatch) => ({
  setNextQuestion: (status) => dispatch(nextQuestion(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);

Play.propTypes = {
  numQuestion: PropTypes.number,
  nextVisible: PropTypes.bool,
  setNextQuestion: PropTypes.func,
}.isRequired;
