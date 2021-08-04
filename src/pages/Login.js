import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchToken from '../services/fetchToken';
import { actionEmail, actionName } from '../redux/actions';
import ButtonConfig from '../components/ButtonConfig';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      disabled: true,
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
    this.configBtn = this.configBtn.bind(this);
  }

  validade() {
    const { user, email } = this.state;
    const rgeex = /(.*)@(.*).com/;
    if (rgeex.test(email) && (user.length > 0)) {
      this.setState({
        disabled: false,
      });
    }
  }

  submitBtn() {
    const { email, user } = this.state;
    const { history, getEmail, getName } = this.props;
    getEmail(email);
    getName(user);
    fetchToken();
    history.push('/game');
  }

  configBtn() {
    const { history } = this.props;
    history.push('/config');
  }

  handleInputs({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validade());
  }

  render() {
    const { user, email, disabled } = this.state;
    return (
      <form>
        <Input
          type="text"
          testId="input-player-name"
          onChange={ this.handleInputs }
          name="user"
          id="user"
          value={ user }
          itemName="Nome"
        />
        <Input
          type="email"
          testId="input-gravatar-email"
          onChange={ this.handleInputs }
          name="email"
          id="email"
          value={ email }
          itemName="Email"
        />
        <Button
          itemName="Jogar"
          disabled={ disabled }
          testId="btn-play"
          onClick={ this.submitBtn }
        />
        <ButtonConfig
          itemName="Configurações"
          testId="btn-settings"
          onClick={ this.configBtn }
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(actionEmail(email)),
  getName: (user) => dispatch(actionName(user)),
});

Login.propTypes = {
  history: PropTypes.objectOf('string').isRequired,
  getEmail: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
