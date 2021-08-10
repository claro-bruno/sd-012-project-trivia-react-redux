import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getToken, setNameAndEmail } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      canLogin: false,
      shouldRedirectToGame: false,
      shouldRedirectToConf: false,
      btnClass: 'btn btn-light',
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { fetchToken, nameAndEmail, score } = this.props;
    const { name, email } = this.state;
    fetchToken();
    nameAndEmail(name, email, score);
    this.setState({ shouldRedirectToGame: true });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.authenticator());
  }

  authenticator() {
    const { name, email } = this.state;
    const EMAIL_REGEX = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    this.setState({
      canLogin: (EMAIL_REGEX.test(email) && name.length > 0),
    });
    if ((EMAIL_REGEX.test(email) && name.length > 0)) {
      this.setState({
        btnClass: 'btn btn-info',
      });
    } else {
      this.setState({
        btnClass: 'btn btn-light',
      });
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderButton() {
    const { canLogin, btnClass } = this.state;
    return (
      <div className="buttons row">
        <button
          disabled={ !canLogin }
          type="submit"
          data-testid="btn-play"
          className={ btnClass }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.setState({ shouldRedirectToConf: true }) }
          className="btn btn-dark"
        >
          Configurações
        </button>
      </div>
    );
  }

  render() {
    const { name, email, shouldRedirectToGame, shouldRedirectToConf } = this.state;

    if (shouldRedirectToGame) return <Redirect to="/game" />;
    if (shouldRedirectToConf) return <Redirect to="/settings" />;

    return (
      <main className="login-page row  align-items-center">
        <h1>
          TRIVIA
          <h3>REACT REDUX</h3>
        </h1>
        <form
          className="container"
          action="GET"
          onSubmit={ this.onSubmit }
        >
          <div className="row">
            <label htmlFor="name-input" className="form-label">
              Nome
              <input
                type="text"
                value={ name }
                name="name"
                id="name-input"
                onChange={ this.handleChange }
                data-testid="input-player-name"
                className="form-control"
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="email-input" className="form-label">
              Email
              <input
                type="email"
                value={ email }
                name="email"
                id="email-input"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                className="form-control"
              />
            </label>
          </div>
          { this.renderButton() }
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(getToken()),
  nameAndEmail: (name, email, score) => dispatch(setNameAndEmail(name, email, score)),
});

const mapStateToProps = (state) => ({
  score: state.game.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  nameAndEmail: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};
