import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinkWithButton from '../components/LinkWithButton';
import { actionCreateLogin } from '../redux/actions';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: true,
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnDisable = this.btnDisable.bind(this);
    this.handlePlayBtn = this.handlePlayBtn.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.btnDisable();
  }

  handlePlayBtn(state) {
    // utilizacao do LocalStorage talvez?
    const { createLogin } = this.props;
    createLogin(state);
  }

  btnDisable() {
    const { name, email } = this.state;
    const validator = name.length > 0 && email.length > 0;
    if (validator) {
      this.setState({
        btnDisable: false,
      });
    }
  }

  render() {
    const { name, email, btnDisable } = this.state;
    return (
      <fieldset>
        <label
          htmlFor="input-player-name"
        >
          Nome:
          <input
            value={ name }
            name="name"
            onChange={ this.handleChange }
            type="text"
            data-testid="input-player-name"
          />
        </label>
        <label
          htmlFor="input-gravatar-email"
        >
          Email:
          <input
            value={ email }
            name="email"
            onChange={ this.handleChange }
            type="text"
            data-testid="input-gravatar-email"
          />
        </label>
        <LinkWithButton
          pathTo="/game/trivia"
          disabled={ btnDisable }
          handlePlayBtn={ () => this.handlePlayBtn(this.state) }
          btnText="Jogar"
        />
        <div>
          <Link to="/config" data-testid="btn-settings">
            <button type="button">Configurações</button>
          </Link>
        </div>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createLogin: (state) => dispatch(actionCreateLogin(state)),
});

Login.propTypes = {
  createLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
