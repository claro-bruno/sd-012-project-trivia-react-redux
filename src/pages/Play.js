import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import optionsDisabled from '../redux/actions/optionsDisabled';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      numQuestion: 0,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyNext = this.verifyNext.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  verifyNext() {
    console.log('verifyNext');
    const { stopTime, optionsDisabled } = this.props;
    if (stopTime || optionsDisabled) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClick }
        >
          Próxima
        </button>
      );
    }
  }

  async fetchQuestions() {
    const token = JSON.parse(localStorage.getItem('token'));
    const END_POINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(END_POINT);
    const json = await response.json();
    this.setState({ questions: json, loading: false });
  }

  handleClick() {
    const { setoptionsDisabled } = this.props;
    console.log('handleClick do proxima');
    this.savePlayer();
    this.setState((prevState) => ({
      numQuestion: prevState.numQuestion + 1,
    }));
    setoptionsDisabled(false);
  }

  savePlayer() {
    console.log('savePlayer');
    const { name, assertions, score, email } = this.props;
    const player = {
      name,
      assertions,
      score,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  render() {
    console.log('render play');
    const { loading, questions: { results }, numQuestion } = this.state;

    if (loading) return <div>Loading...</div>;

    return (
      <div>
        <Header />
        <Questions dataQuestion={ results[numQuestion] } />
        { this.verifyNext() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stopTime: state.questions.stopTime,
  optionsDisabled: state.questions.optionsDisabled,
  name: state.login.name,
  assertions: state.questions.assertions,
  score: state.questions.score,
  email: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  setoptionsDisabled: (status) => dispatch(optionsDisabled(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);

Play.propTypes = {
  stopTime: PropTypes.bool,
  optionsDisabled: PropTypes.bool,
  numQuestion: PropTypes.number,
  nextVisible: PropTypes.bool,
  setNextQuestion: PropTypes.func,
}.isRequired;
