import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { actionEmail, actionName } from '../redux/actions';
import ButtonConfig from '../components/ButtonConfig';
import ButtonRanking from '../components/ButtonRanking';

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
    this.rankingBtn = this.rankingBtn.bind(this);
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
    const { email: gravatarEmail, user: name } = this.state;
    const { history, getEmail, getName } = this.props;
    getEmail(gravatarEmail);
    getName(name);
    const newUser = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(newUser));
    history.push('/game');
  }

  configBtn() {
    const { history } = this.props;
    history.push('/config');
  }

  rankingBtn() {
    const { history } = this.props;
    history.push('/ranking');
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
        <ButtonRanking
          itemName="Ver Ranking"
          testId="btn-ranking"
          onClick={ this.rankingBtn }
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
