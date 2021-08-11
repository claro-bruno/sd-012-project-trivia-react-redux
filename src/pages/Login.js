import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputsLogin from '../components/loginControlled/InputsLogin';
import ButtonsLogin from '../components/loginControlled/ButtonsLogin';
import logo from '../trivia.png';
import { tokenFetchAPI, addLoginAction } from '../redux/actions';
import '../css/Login.css';
import '../css/Button.css';
import '../css/Input.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      email: '',
      redirectGame: false,
      redirectConfig: false,
      redirectRank: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickGame = this.handleClickGame.bind(this);
    this.handleClickConfig = this.handleClickConfig.bind(this);
    this.handleClickRank = this.handleClickRank.bind(this);
  }

  componentDidMount() {
    const { props: { setToken } } = this;
    setToken();
  }

  handleClickRank() {
    this.setState((state) => ({
      ...state,
      redirectRank: true,
    }));
  }

  handleClickConfig() {
    this.setState((state) => ({
      ...state,
      redirectConfig: true,
    }));
  }

  handleClickGame() {
    const {
      props: { getToken, setLogin },
      state: login,
    } = this;

    localStorage.setItem('token', JSON.stringify(getToken));

    this.setState((state) => ({
      ...state,
      redirectGame: true,
    }));
    setLogin(login);
  }

  handleChange({ target: { name, type, value, checked } }) {
    function newValue() {
      switch (type) {
      case 'checkbox': return checked;
      case 'number': return +value;
      default: return value;
      }
    }
    this.setState((state) => ({ ...state, [name]: newValue() }));
  }

  render() {
    const { handleChange, handleClickGame, handleClickConfig, handleClickRank,
      state: { user, email, redirectGame,
        redirectConfig,
        redirectRank,
      } } = this;
    const MAX_LENGTH = 5;
    const disableCondition = !(user.length > MAX_LENGTH && email.includes('@' && '.com'));
    return (
      <>
        { redirectGame && <Redirect to="/game" /> }
        { redirectConfig && <Redirect to="/config" /> }
        { redirectRank && <Redirect to="/ranking" /> }
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="login-form">
          <InputsLogin
            onChange1={ handleChange }
            value1={ user }
            onChange2={ handleChange }
            value2={ email }
            className="std-input"
          />
          <ButtonsLogin
            disabled={ disableCondition }
            handleClick1={ handleClickGame }
            handleClick2={ handleClickConfig }
            handleClick3={ handleClickRank }
            className="std-button"
          />
        </form>
      </>
    );
  }
}

const { func, string } = PropTypes;
Login.propTypes = {
  setToken: func.isRequired,
  setLogin: func.isRequired,
  getToken: string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(tokenFetchAPI()),
  setLogin: (state) => dispatch(addLoginAction(state)),
});

const mapStateToProps = (state) => ({
  getToken: state.tokenTriviaReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
