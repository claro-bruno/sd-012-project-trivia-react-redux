import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchToken, updateProfile } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatchFetchToken, dispatchUpdateProfile, history } = this.props;
    const { name, email } = this.state;
    dispatchFetchToken();
    dispatchUpdateProfile(name, email);
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label
          htmlFor="name"
        >
          Name:
          <input
            id="name"
            type="text"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>

        <label
          htmlFor="email"
        >
          Email:
          <input
            id="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>

        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !(email && name) }
        >
          Jogar
        </button>
        <Link to="/configs">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchToken: () => dispatch(fetchToken()),
  dispatchUpdateProfile: (name, email) => dispatch(updateProfile(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchFetchToken: PropTypes.func.isRequired,
  dispatchUpdateProfile: PropTypes.func.isRequired,
};
