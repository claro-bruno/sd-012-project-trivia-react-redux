import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { VscSettingsGear } from 'react-icons/vsc';
import setUser from '../../redux/actions/userActions';
import { LoginForm, SettingsWrapper } from './styles';
import { Tittle, LabelText, Label, Input, Button } from '../globalStyles';

class Login extends React.Component {
  constructor() {
    super();
    this.formHandler = this.formHandler.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      email: '',
      name: '',
      redirect: false,
    };
  }

  formHandler({ target }) {
    this.setState({ [target.name]: target.value });
  }

  routeChange() {
    const { sendUserAndToken } = this.props;
    const { email, name } = this.state;
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((r) => r.json())
      .then(({ token }) => {
        sendUserAndToken({ email, name, token });
        this.storeUserData(email, name, token);
        this.setState({ redirect: true });
      });
  }

  storeUserData(email, name, token) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('state', JSON.stringify({ player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
    }));
  }

  renderSettings() {
    return (
      <SettingsWrapper>
        <Link to="/settings">
          <VscSettingsGear
            size="3vw"
            color="white"
            fill="white"
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </VscSettingsGear>
        </Link>
      </SettingsWrapper>
    );
  }

  render() {
    const { email, name, redirect } = this.state;
    if (redirect) return (<Redirect to="/game" />);
    return (
      <>
        {this.renderSettings()}
        <LoginForm>
          <Tittle>Trivia</Tittle>
          <Label htmlFor="input-player-name">
            <LabelText>Nome</LabelText>
            <Input
              value={ name }
              onChange={ (e) => this.formHandler(e) }
              name="name"
              type="text"
              data-testid="input-player-name"
            />
          </Label>
          <Label htmlFor="input-gravatar-email">
            <LabelText>Email</LabelText>
            <Input
              onChange={ (e) => this.formHandler(e) }
              value={ email }
              name="email"
              type="text"
              data-testid="input-gravatar-email"
            />
          </Label>
          <Button
            disabled={ !(email && name) }
            type="button"
            data-testid="btn-play"
            onClick={ this.routeChange }
          >
            Jogar
          </Button>
        </LoginForm>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUserAndToken: (e) => dispatch(setUser(e)) });

Login.propTypes = {
  sendUserAndToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
