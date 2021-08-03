import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUserInfo } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.validatingEmailandName = this.validatingEmailandName.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.state = {
      notValid: true,
      email: '',
      name: '',
    };
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

  handleOnClick() {
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
          <button
            disabled={ notValid }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleOnClick }
          >
            Jogar!
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changingInfo: (name, value) => dispatch(actionUserInfo(name, value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  changingInfo: PropTypes.func.isRequired,
};
