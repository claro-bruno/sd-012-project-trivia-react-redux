import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import G4Logo from '../G4.gif';
import { sendUserInfo } from '../redux/action';
import Button from '../components/Button';
import {
  requestToken,
  addStateToStorage,
  requestImageGravatar,
} from '../helpers';
import styles from './Login.module.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playGame = this.playGame.bind(this);

    this.state = {
      name: '',
      nameCheck: false,
      email: '',
      emailCheck: false,
    };
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
    // valida email e name
    const emailFormat = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    if (id === 'email') {
      if (emailFormat.test(value)) {
        this.setState({
          emailCheck: true,
        });
      } else {
        this.setState({
          emailCheck: false,
        });
      }
    }
    if (id === 'name') {
      if (value !== '') {
        this.setState({
          nameCheck: true,
        });
      } else {
        this.setState({
          nameCheck: false,
        });
      }
    }
  }

  async playGame() {
    const { name, email } = this.state;
    const { send } = this.props;
    const image = requestImageGravatar(email);
    addStateToStorage('name', name);
    addStateToStorage('gravatarEmail', email);
    addStateToStorage('score', 0);
    addStateToStorage('assertions', 0);
    await requestToken();
    send(name, email, image);
  }

  handleClick(route) {
    const { history } = this.props;
    history.push(route);
  }

  renderForm() {
    const { name, email, emailCheck, nameCheck } = this.state;
    const btnCheck = !(emailCheck === true && nameCheck === true);
    return (
      <form className={ styles.formLogin }>
        <label htmlFor="name" className={ styles.labelHeader }>
          Nome:
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email" className={ styles.labelHeader }>
          E-mail:
          <input
            type="email"
            id="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <div className={ styles.buttonLogin }>
          <Button
            buttonText="Jogar"
            testId="btn-play"
            onClick={ async () => {
              await this.playGame();
              this.handleClick('/game');
            } }
            disabled={ btnCheck }
          />
          <Button
            buttonText="Settings"
            testId="btn-settings"
            onClick={ () => this.handleClick('/settings') }
          />
        </div>
      </form>
    );
  }

  render() {
    return (
      <main className={ styles.mainLogin }>
        <img src={ G4Logo } className={ styles.g4Logo } alt="logo" />
        <section className={ styles.containerLogin }>
          <header className={ styles.appHeader }>
            <img src={ logo } className={ styles.appLogo } alt="logo" />
          </header>
          { this.renderForm() }
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  send: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  send: (...info) => dispatch(sendUserInfo(...info)),
});

export default connect(null, mapDispatchToProps)(Login);
