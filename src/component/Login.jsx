import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import * as fetchAPI from '../helpers/fetchAPI';
import { questAction, saveToken, saveEmail, saveName } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.config = this.config.bind(this);
    this.toQuestions = this.toQuestions.bind(this);

    this.state = {
      name: '',
      email: '',
      redirect: false,
      redirectToQuest: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  config() {
    this.setState({
      redirect: true,
    });
  }

  async toQuestions() {
    const { name, email } = this.state;
    const avatar = fetchAPI.fetAvatar(md5(email).toString());
    const player = {
      player: {
        name,
        assertions: '',
        score: 0,
        gravatarEmail: avatar,
      },
    };
    const { saveToke, saveEmailD, saveNameD } = this.props;
    const token = await fetchAPI.getToken();
    saveEmailD(email);
    saveNameD(name);
    saveToke(token);
    const playerstringfy = JSON.stringify(player);
    localStorage.setItem('state', playerstringfy);
    this.setState({ redirectToQuest: true });
  }

  render() {
    const { name, email, redirect, redirectToQuest } = this.state;
    if (redirect) return <Redirect to="/config/" />;
    if (redirectToQuest) return <Redirect to="/quest/" />;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div>
            <input
              name="name"
              onChange={ this.handleChange }
              value={ name }
              type="text"
              placeholder="Nome"
              data-testid="input-player-name"
            />
            <input
              name="email"
              onChange={ this.handleChange }
              value={ email }
              type="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
            />
          </div>
          <button
            data-testid="btn-play"
            onClick={ () => { this.toQuestions(); } }
            type="button"
            disabled={ name.length === 0 || email.length === 0 }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.config() }
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  saveToke: PropTypes.func.isRequired,
  saveEmailD: PropTypes.func.isRequired,
  saveNameD: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  quests: (quest) => dispatch(questAction(quest)),
  saveToke: (token) => dispatch(saveToken(token)),
  saveEmailD: (email) => dispatch(saveEmail(email)),
  saveNameD: (name) => dispatch(saveName(name)),
});

export default connect(null, mapDispatchToProps)(Login);
