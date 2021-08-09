import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsGear } from 'react-icons/bs';
import { actionUserInfo, getTokenThunk } from '../redux/actions';
import logo from '../images/logo.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.validatingEmailandName = this.validatingEmailandName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchToken = this.fetchToken.bind(this);

    this.state = {
      notValid: true,
      email: '',
      name: '',
    };
  }

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken() {
    const { getToken } = this.props;
    getToken();
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validatingEmailandName());
  }

  validatingEmailandName() {
    const { name, email } = this.state;
    if (name && email) this.setState({ notValid: false });
    else this.setState({ notValid: true });
  }

  handleSubmit() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    const { name, email } = this.state;
    const { changingInfo } = this.props;
    changingInfo(name, email);
  }

  renderEmailInput() {
    const { email } = this.state;

    return (
      <label htmlFor="email-input" className="text-white">
        Email
        <input
          id="email-input"
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleOnChange }
          data-testid="input-gravatar-email"
          className="ml-6 rounded-md text-black px-2"
        />
      </label>
    );
  }

  renderNameInput() {
    const { name } = this.state;

    return (
      <label htmlFor="name-input" className="text-white">
        Nome
        <input
          id="name-input"
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleOnChange }
          data-testid="input-player-name"
          className="ml-5 rounded-md text-black px-2"
        />
      </label>
    );
  }

  render() {
    const { notValid } = this.state;
    return (
      <div className="container flex flex-col items-center">
        <img
          src={ logo }
          alt="Logo Trivia"
          className="w-1/2 my-20"
        />
        <div
          className="flex flex-col
          bg-header w-1/3 justify-evenly items-center h-40 rounded-md shadow-2xl"
        >
          <Link to="/settings" className="self-end mr-6 mt-2 text-xl text-white">
            <button
              type="button"
              data-testid="btn-settings"
            >
              <BsGear />
            </button>
          </Link>
          { this.renderEmailInput() }
          { this.renderNameInput() }
          <div className="button-container">
            <Link to="/quiz">
              <button
                disabled={ notValid }
                type="button"
                data-testid="btn-play"
                onClick={ this.handleSubmit }
                className="btn-green rounded-md py-1 px-3 my-3 shadow-xl"
              >
                Jogar!
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changingInfo: (name, value) => dispatch(actionUserInfo(name, value)),
  getToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  changingInfo: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
