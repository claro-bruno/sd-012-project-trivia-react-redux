import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import * as fetchAPI from '../helpers/fetchAPI';
import { questAction, saveToken } from '../actions';

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
    const { saveToke } = this.props;
    const token = await fetchAPI.getToken();
    saveToke(token);
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
};

const mapDispatchToProps = (dispatch) => ({
  quests: (quest) => dispatch(questAction(quest)),
  saveToke: (token) => dispatch(saveToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
