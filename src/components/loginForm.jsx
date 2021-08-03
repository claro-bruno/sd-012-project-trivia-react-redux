import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginInfo = this.handleLoginInfo.bind(this);
  }

  handleLoginInfo() {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
    const { email, name } = this.state;
    return (regexEmail.test(email) && name !== '');
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testod="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
        />
        <Link to="/questions">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.handleLoginInfo() }
          >
            Play
          </button>
        </Link>
      </form>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {

// };

export default LoginForm;
