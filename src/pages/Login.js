import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Button, Input } from 'reactstrap';
import { fetchApiToken, playerUserInfo } from '../actions';
import image from '../images/trivia.png';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit() {
    const { gameTokenApi, userInfo } = this.props;
    const { name, email } = this.state;
    const emailUserHash = md5(email).toString();
    userInfo({ name, email, gravatarEmail: emailUserHash });

    gameTokenApi();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateInput());
    // this.validateInput();
  }

  validateInput() {
    const { name, email } = this.state;
    const validateEmail = /(.*)@(.*).com/;

    if (validateEmail.test(email) && name.length !== 0) {
      this.setState({
        isDisable: false,
      });
      return true;
    }
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div className="container">
        <img className="logo" src={ image } alt="trivia logo" />
        <form className="containnerInputs">
          <label htmlFor="name">
            Nome:

            <Input placeholder="username"
              data-testid="input-player-name"
              value={ name }
              id="name"
              name="name"
              type="text"
              onChange={ this.handleChange }
            />

          </label>
          <label htmlFor="email">
            Email:
            <Input placeholder="@example.com"
              data-testid="input-gravatar-email"
              value={ email }
              id="email"
              name="email"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <Button
              color="warning"
              className="butonStyle"
              disabled={ isDisable }
              type="button"
              data-testid="btn-play"
              onClick={ () => this.handleSubmit() }
            >
              Jogar
            </Button>

          </Link>
          <Link to="/settings">
            <Button color="info" className="butonStyle" type="button" data-testid="btn-settings">Configurações</Button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  gameTokenApi: PropTypes.func.isRequired,
  userInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  gameTokenApi: () => dispatch(fetchApiToken()),
  userInfo: (payload) => dispatch(playerUserInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
