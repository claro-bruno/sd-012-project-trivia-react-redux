import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { emailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.inputsValidation = this.inputsValidation.bind(this);

    this.state = {
      name: false,
      email: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  inputsValidation() {
    const { email, name } = this.state;
    const emailValidation = /(.*)@(.*).com/.test(email);
    const charactersName = name.length;
    const minimoName = 1;
    if (charactersName >= minimoName && emailValidation === true) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          placeholder="Coloque seu nome aqui :)"
          onChange={ this.handleChange }
        />

        <input
          name="email"
          id="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="E-mail aqui :)"
          onChange={ this.handleChange }
        />

        <Link to="/Trivia">
          <button
            disabled={ this.inputsValidation() }
            data-testid="btn-play"
            type="button"
            onClick={ this.activeButton }
          >
            JOGAR
          </button>
        </Link>
      </div>);
  }
}

// Login.propTypes = {
//   emailValue: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   emailValue: (value) => dispatch(emailAction(value)),
// });

// export default connect(null, mapDispatchToProps)(Login);
export default Login;
