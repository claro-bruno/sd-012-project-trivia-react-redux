import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nameSet, emailSet, getToken } from '../redux/actions/index';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
  }

  onSubmitForm() {
    const { dispatchSetName, dispatchSetEmail, dispatchToken } = this.props;
    const { name, email } = this.state;
    dispatchSetName(name);
    dispatchSetEmail(email);
    dispatchToken();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  emailIsValid(email) {
    return /\S+@\S+.\S+/.test(email);
  }

  render() {
    const { email, name } = this.state;

    const inputEmailProps = {
      type: 'text',
      name: 'email',
      id: 'emailInput',
      value: email,
      onChange: this.handleChange,
      labelTxt: 'Email',
    };
    const inputNameProps = {
      type: 'text',
      name: 'name',
      id: 'nameInput',
      value: name,
      onChange: this.handleChange,
      labelTxt: 'Nome',
    };
    const buttonProps = {
      onClick: this.onSubmitForm,
      disabled: !(name.length > 0 && this.emailIsValid(email)),
      buttonTxt: 'Jogar',
    };
    const settingsButtonProps = {
      buttonTxt: 'Configurações',
    };

    return (
      <form>
        <Input { ...inputNameProps } testId="input-player-name" />
        <Input { ...inputEmailProps } testId="input-gravatar-email" />
        <Link to="/game">
          <SubmitButton { ...buttonProps } testId="btn-play" />
        </Link>
        <Link to="/settings">
          <SubmitButton { ...settingsButtonProps } testId="btn-settings" />
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetName: (name) => dispatch(nameSet(name)),
  dispatchSetEmail: (email) => dispatch(emailSet(email)),
  dispatchToken: () => dispatch(getToken()),
});

Login.propTypes = {
  dispatchSetName: PropTypes.func.isRequired,
  dispatchSetEmail: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
