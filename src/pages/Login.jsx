import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLogin } from '../redux/actions/actionsLogin';

const md5 = require('md5');

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
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.btnDisable();
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
    const { saveData } = this.props;
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
        <button
          disabled={ btnDisable }
          type="button"
          data-testid="btn-play"
          onClick={ () => saveData(this.state) }
        >
          Jogar
        </button>
      </fieldset>
    );
  }
}

Login.propTypes = {
  saveData: PropTypes.func,
};

Login.defaultProps = {
  saveData: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  saveData: (state) => {
    const hashEmail = md5(
      state.email.toLowerCase()
        .replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
    );
    return dispatch(saveLogin(state, hashEmail));
  },
});

export default connect(null, mapDispatchToProps)(Login);
