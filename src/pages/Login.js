import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePlayerInfo } from '../actions';
import * as api from '../services/api';
import logo from '../trivia.png';
import './Login.css';
import Mp3 from '../components/Mp3';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisable: true,
      token: '',
      gravatar: '',
      startMusic: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.renderLoginButtons = this.renderLoginButtons.bind(this);
    this.startMusicController = this.startMusicController.bind(this);
    this.playMusic = this.playMusic.bind(this);
  }

  componentDidMount() {
    this.startMusicController();
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, name } = this.state;
    if (email !== prevState.email || name !== prevState.name) {
      this.verifyLogin();
    }
    sessionStorage.lastConfig = '';
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  }

  verifyLogin() {
    const { name, email } = this.state;
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (regex.test(email) && name.length > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  playMusic() {
    return (<Mp3 />);
  }

  validateLogin() {
    const { player: { assertions, score }, changePlayerInfoHandler } = this.props;
    const { name, email } = this.state;
    const gravatarEmail = api.getGravatar(email);
    api.fethApi();
    const state = { player: { name, assertions, score, gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(state));
    changePlayerInfoHandler({ name, gravatarEmail });
  }

  startMusicController() {
    this.setState({ startMusic: true });
  }

  renderLoginButtons() {
    const { isDisable } = this.state;
    return (
      <>
        <Link to="/game">
          <button
            onClick={ this.validateLogin }
            disabled={ isDisable }
            type="submit"
            data-testid="btn-play"
          >
            Jogar
          </button>
          {/* <button
            onClick={ Mp3 }
            type="button"
            data-testid="btn-sound"
          >
            Som
          </button> */}
        </Link>
        <Link to="/Settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </>
    );
  }

  render() {
    const { name, email, startMusic } = this.state;
    return (
      <header className="App-header">
        {startMusic ? this.playMusic() : <> </> }
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <form className="login">
          <label htmlFor="input-text">
            <input
              value={ name }
              name="name"
              type="text"
              placeholder="Digite seu Nome"
              data-testid="input-player-name"
              id="input-text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            <input
              value={ email }
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              placeholder="Digite seu Email"
              id="input-email"
              onChange={ this.handleChange }
            />
          </label>
          { this.renderLoginButtons() }
        </form>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  changePlayerInfoHandler: (playerInfo) => dispatch(changePlayerInfo(playerInfo)),
});

Login.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  changePlayerInfoHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
