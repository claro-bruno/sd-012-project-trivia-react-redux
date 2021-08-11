import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlay, FiSettings } from 'react-icons/fi';
import { fetchToken, redefineScore, userAction, userActionName } from '../redux/actions';
import './pages.css';
import WelcomeText from '../components/WelcomeText';

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

  componentDidMount() {
    const { newScore } = this.props;
    newScore(0);
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
            className="btn-settings"
            type="button"
          >
            <FiSettings />
          </button>
        </Link>
      </div>
    );
  }

  handleClick() {
    const {
      gettingToken,
      history,
      sendUserEmail,
      sendUserName,
    } = this.props;

    const { name, email } = this.state;
    const formatEmail = email.trim().toLowerCase();
    sendUserEmail(formatEmail);
    sendUserName(name);
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
      <section className="login-page">
        <section className="msg-component">
          <WelcomeText />
        </section>
        <form className="form">
          <label
            htmlFor="email"
          >
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="form-control"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleInput }
            />
          </label>
          <label
            htmlFor="name"
          >
            <input
              placeholder="Nome"
              type="text"
              name="name"
              className="form-control"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleInput }
            />
          </label>
          <div className="buttons">
            <button
              data-testid="btn-play"
              className="btn-play"
              type="button"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              <FiPlay />
            </button>
            { this.settingsButton() }
          </div>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  gettingToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendUserEmail: PropTypes.func.isRequired,
  sendUserName: PropTypes.func.isRequired,
  newScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  gettingToken: () => dispatch(fetchToken()),
  sendUserEmail: (payload) => dispatch(userAction(payload)),
  sendUserName: (payload) => dispatch(userActionName(payload)),
  newScore: (payload) => dispatch(redefineScore(payload)),
});

const mapStateToProps = (state) => ({
  myUserState: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
