import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginInputs from '../components/loginControlled/LoginInputs';
import Button from '../components/Button';
import logo from '../trivia.png';
import { tokenFetchAPI, addLoginAction } from '../redux/actions';
import '../css/Login.css';

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
    return (
      <>
        { redirectGame && <Redirect to="/game" /> }
        { redirectConfig && <Redirect to="/config" /> }
        { redirectRank && <Redirect to="/ranking" /> }
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="login-form">
          <LoginInputs
            onChange1={ handleChange }
            value1={ user }
            onChange2={ handleChange }
            value2={ email }
          />
          <Button
            testId="btn-play"
            name="Entrar"
            disabled={ !(user.length > MAX_LENGTH && email.includes('@' && '.com')) }
            handleClick={ handleClickGame }
          />
          <Button
            testId="btn-settings"
            name="Configurações"
            handleClick={ handleClickConfig }
          />
          <Button
            testId="btn-ranking"
            name="Ranking"
            handleClick={ handleClickRank }
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
