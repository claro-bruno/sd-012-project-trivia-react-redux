import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import * as fetchAPI from '../helpers/fetchAPI';
import { questAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.config = this.config.bind(this);
    this.handleClick = this.handleClick(this);

    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
  }

  handleClick() {
    const { fetQuestions, getToken } = fetchAPI;
    getToken();
    const { quests } = this.props;
    const token = localStorage.getItem('token');
    fetQuestions(token).then((data) => {
      const { results: quest } = data;
      quests(quest);
    });
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

  render() {
    const { name, email, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/config/" />;
    }

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
          <Link to="/quest">
            <button
              onClick={ () => fetchAPI.getToken() }
              type="button"
              data-testid="btn-play"
              disabled={ name.length === 0 || email.length === 0 }
            >
              Jogar
            </button>
          </Link>
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

const mapDispatchToProps = (dispatch) => ({
  quests: (quest) => dispatch(questAction(quest)),
});

export default connect(null, mapDispatchToProps)(Login);
