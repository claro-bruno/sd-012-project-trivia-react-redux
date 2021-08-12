import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchToken, updateProfile } from '../redux/actions';

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

  componentDidMount() {
    const { dispatchFetchCategories } = this.props;
    dispatchFetchCategories();
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
      <div className="login">
        <form className="login-son" onSubmit={ this.handleSubmit }>
          <label className="label-login" htmlFor="name">
            Name:
            <input
              id="name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label className="label-login" htmlFor="email">
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchToken: () => dispatch(fetchToken()),
  dispatchUpdateProfile: (name, email) => dispatch(updateProfile(name, email)),
  dispatchFetchCategories: () => dispatch(fetchCategories()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchFetchToken: PropTypes.func.isRequired,
  dispatchUpdateProfile: PropTypes.func.isRequired,
  dispatchFetchCategories: PropTypes.func.isRequired,
};
