import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLogin } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyButton = this.verifyButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  async handleChange({ target }) {
    const { name, value } = target;
    await this.setState({ [name]: value });
    this.verifyButton();
  }

  verifyButton() {
    const emailRegex = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const { email, playerName } = this.state;
    const tres = 3;
    let checked = true;
    if (emailRegex.test(email) && playerName.length >= tres) {
      checked = false;
    }
    this.setState({
      disabled: checked,
    });
  }

  submit() {
    const { playerName, email } = this.state;
    const { setLogin } = this.props;
    setLogin(playerName, email);
  }

  render() {
    const { disabled, playerName, email } = this.state;
    return (
      <div className="login-screen">
        <div className="login-box">
          <p className="login-title">TRIVIA</p>
          <form className="form">
            <input
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              className="login-input"
              data-testid="input-gravatar-email"
              required
            />
            <input
              type="text"
              name="playerName"
              value={ playerName }
              onChange={ this.handleChange }
              className="login-input"
              data-testid="input-player-name"
              required
            />
            <button
              type="button"
              onClick={ this.submit }
              className="login-button"
              disabled={ disabled }
              data-testid="btn-play"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLogin: (name, email) => dispatch(saveLogin(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setLogin: PropTypes.func,
}.isRequired;
