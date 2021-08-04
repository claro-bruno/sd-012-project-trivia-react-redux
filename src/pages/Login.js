import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../redux/actions';

class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };

    this.handleInput = this.handleInput.bind(this);
    this.settingsButton = this.settingsButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    this.handleButton();
  }

  settingsButton() {
    return (
      <div>
        <Link
          to="/settings"
        >
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }

  handleClick() {
    const { gettingToken, history } = this.props;
    gettingToken();
    history.push('/game');
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleButton() {
    const { email, name } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { email, name, disabled } = this.state;
    return (
      <div>
        <label
          htmlFor="email"
        >
          Email
          <input
            type="email"
            name="email"
            className=""
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>

        <label
          htmlFor="name"
        >
          Nome
          <input
            type="text"
            name="name"
            className=""
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleInput }
          />
        </label>

        <button
          data-testid="btn-play"
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>

        { this.settingsButton() }
      </div>
    );
  }
}

Login.propTypes = {
  gettingToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  gettingToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  myUserState: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
