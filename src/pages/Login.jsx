import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import '../App.css';
import logo from '../trivia_silvio2.png';
import Input from '../components/Input';
import '../css/login.css';
import { ADD_NEW_PLAYER, fetchClick } from '../redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      score: 0,
      assertions: 0,
      game: false,
      config: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    const { fetcher } = this.props;
    fetcher();
  }

  componentWillUnmount() {
    const { token } = this.props;
    localStorage.setItem('token', token);
  }

  onclick(newUser) {
    newUser(this.state);
    this.handlePlay();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handlePlay() {
    this.setState((state) => ({
      ...state,
      game: true,
    }));
  }

  handleClick() {
    this.setState({ config: true });
  }

  buttonDisable() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) return false;
    return true;
  }

  renderbtnLogin() {
    const { newUser } = this.props;
    return (
      <button
        className="btn-login"
        type="button"
        data-testid="btn-play"
        disabled={ this.buttonDisable() }
        onClick={ () => this.onclick(newUser) }
      >
        Jogar
      </button>
    );
  }

  render() {
    const { game, config } = this.state;
    const { loading } = this.props;
    if (loading) return <h1>Carregando...</h1>;
    if (game) return <Redirect to="/game" />;
    if (config) return <Redirect to="/config" />;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div className="body-login">
            <p>
              <Input
                id="name"
                name="name"
                type="text"
                testid="input-player-name"
                onChange={ this.handleChange }
                placeholder="Nome do jogador"
                required
              />
              <Input
                id="email"
                name="email"
                type="email"
                testid="input-gravatar-email"
                onChange={ this.handleChange }
                placeholder="Email"
              />
              <button
                className="btn-login"
                type="button"
                data-testid="btn-settings"
                onClick={ this.handleClick }
              >
                Configurações
              </button>
              { this.renderbtnLogin() }
            </p>
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newUser: (value) => dispatch(ADD_NEW_PLAYER(value)),
  fetcher: () => dispatch(fetchClick()),
});

const mapStateToProps = (state) => ({
  token: state.buttonReducer.token,
  loading: state.buttonReducer.isLoading,
});

Login.propTypes = {
  newUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  fetcher: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
