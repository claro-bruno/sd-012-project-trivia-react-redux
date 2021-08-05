import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../trivia.png';
import { getTokenAndQuestionsThunk, loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  setLocalStorage() {
    const { name, email } = this.state;
    const objeto = JSON.stringify({ player: { name, gravatarEmail: email } });
    localStorage.setItem('state', objeto);
  }

  handleClick() {
    const { getUserData, getTokenQuestionsFunction } = this.props;
    const { name, email } = this.state;
    getUserData(name, email);
    this.setLocalStorage();
    getTokenQuestionsFunction();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          value={ name }
          onChange={ (e) => this.handleChange(e) }
          name="name"
          type="text"
          data-testid="input-player-name"
          placeholder="Name"
        />
        <input
          value={ email }
          onChange={ (e) => this.handleChange(e) }
          name="email"
          type="text"
          data-testid="input-gravatar-email"
          placeholder="Email"
        />
        <Link to="/game">
          <button
            disabled={ !(email && name) }
            type="button"
            data-testid="btn-play"
            onClick={ () => this.handleClick() }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenQuestionsFunction: () => dispatch(getTokenAndQuestionsThunk()),
  getUserData: (name, email) => dispatch(loginAction(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getTokenQuestionsFunction: propTypes.func.isRequired,
  getUserData: propTypes.func.isRequired,
};
