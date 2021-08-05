import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUserInfo, getTokenThunk } from '../redux/actions';

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

  render() {
    const { name, email, notValid } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          Email
          <input
            id="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleOnChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="name-input">
          Nome
          <input
            id="name-input"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleOnChange }
            data-testid="input-player-name"
          />
        </label>
        <div className="button-container">
          <Link to="/quiz">
            <button
              disabled={ notValid }
              type="button"
              data-testid="btn-play"
              onClick={ this.handleSubmit }
            >
              Jogar!
            </button>
          </Link>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
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
