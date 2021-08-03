import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnCondition = this.btnCondition.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  btnCondition() {
    const { name, email } = this.state;
    return !(name !== '' && email !== '');
  }

  async fetchToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', token);
  }

  fetchQuestions() {
    const { questions, getQuestions } = this.props;
    const storage = localStorage.getItem('token');
    getQuestions(storage);
    console.log(questions);
  }

  render() {
    return (
      <div className="inputs">
        <form className="forms">
          <label htmlFor="name-input" className="label-input">
            Nome:
            <input
              data-testid="input-player-name"
              id="name-input"
              name="name"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input" className="label-input">
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="email-input"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <div className="btn">
            <button
              className="btn2"
              data-testid="btn-play"
              type="button"
              disabled={ this.btnCondition() }
            >
              <Link
                onClick={ () => {
                  this.fetchToken();
                  this.fetchQuestions();
                } }
                to="/trivia"
              >
                Jogar
              </Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.trivia.questions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestions: (token) => dispatch(fetchQuestions(token)),
  };
}

Login.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
