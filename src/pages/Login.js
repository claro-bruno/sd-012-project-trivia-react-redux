import React from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchToken from '../services/fetchToken';

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
    const { history } = this.props;
    fetchToken();
    history.push('/game');
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
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf('string').isRequired,
};

export default Login;
