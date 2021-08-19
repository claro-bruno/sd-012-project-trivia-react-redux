import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { userLogin, getToken } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: false,
      name: '',
      email: '',
      checkName: true,
      checkEmail: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
  }

  async fetchToken() {
    const token = await getToken();
    localStorage.setItem('token', token);
    this.setState({
      loginUser: true,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => { this.emailValidation(); });
  }

  handleButton() {
    const { name, email, checkEmail, checkName } = this.state;
    if (name === '' && email === '') { return true; }
    return (checkEmail || checkName);
  }

  // Referencia de como validar email com regex em https://ui.dev/validate-email-address-javascript/
  emailValidation() {
    const { name, email } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(regex)) {
      this.setState({
        checkEmail: false,
      });
    } else {
      this.setState({
        checkEmail: true,
      });
    } if (name.length !== 0) {
      this.setState({
        checkName: false,
      });
    } else {
      this.setState({
        checkName: true,
      });
    }
  }

  playerState(name, email) {
    const state = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { name, email, loginUser } = this.state;
    const { login } = this.props;
    if (loginUser) return <Redirect to="/game" />;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            value={ name }
            placeholder="Seu nome aqui"
            onChange={ (event) => { this.handleChange(event); } }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            placeholder="Seu email aqui"
            onChange={ (event) => { this.handleChange(event); } }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.handleButton() }
          onClick={ () => {
            login({ name, email });
            this.fetchToken();
            this.playerState(name, email);
          } }
        >
          Play
        </button>
        <Link to="/settings" data-testid="btn-settings">
          <button type="button">Settings</button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (player) => dispatch(userLogin(player)),
});

const mapStateToProps = (state) => ({
  playerLogin: state.login.name,
  playerEmail: state.login.email,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
