import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getLogin from '../redux/action/index';

const regEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
const nameSize = 3;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handle = this.handle.bind(this);
  }

  handle({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, name } = this.state;
    const { dataUser } = this.props;
    return (
      <>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Name"
          value={ name }
          onChange={ this.handle }
        />
        <input
          data-testid="input-gravatar-email"
          name="email"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handle }
        />
        <button
          disabled={ !(regEmail.test(email) && name.length > nameSize) }
          data-testid="btn-play"
          type="button"
          onClick={ () => dataUser(this.state) }
        >
          Jogar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dataUser: (value) => dispatch(getLogin(value)),
}); connect(null, mapDispatchToProps);

Login.propTypes = { dataUser: PropTypes.func.isRequired };

export default connect(null, mapDispatchToProps)(Login);
