import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nameSet, emailSet, getToken } from '../redux/actions/index';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import logo from '../trivia.png';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
  }

  async onSubmitForm(event) {
    event.preventDefault();
    const { dispatchSetName, dispatchSetEmail, dispatchToken } = this.props;
    const { name, email } = this.state;
    dispatchSetName(name);
    dispatchSetEmail(email);
    await dispatchToken();
    this.setState({ redirect: true });
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
    const { email, name, redirect } = this.state;
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
      className: 'btn btn-primary mt-2 col-12',
    };
    const settingsButtonProps = {
      buttonTxt: 'Configurações',
      className: 'btn btn-primary mt-2 col-12',
    };
    return (
      <header className="d-flex justify-content-xl-around container-fluid bg-dark header">
        <div className="col-1" />
        <div className="d-flex flex-colum col-5">
          <img src={ logo } className="banner-img align-self-center" alt="logo" />
        </div>
        <div className="col-1" />
        <div className="align-self-center ml-auto mr-auto gradient">
          <form className="form-container mr-5 col-5">
            <Input { ...inputNameProps } testId="input-player-name" />
            <Input { ...inputEmailProps } testId="input-gravatar-email" />
            <SubmitButton { ...buttonProps } testId="btn-play" />
            <Link to="/settings">
              <SubmitButton { ...settingsButtonProps } testId="btn-settings" />
            </Link>
          </form>
        </div>
        { redirect ? <Redirect to="/game" /> : null }
      </header>
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
