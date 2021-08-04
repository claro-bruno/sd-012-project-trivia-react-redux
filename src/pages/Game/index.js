import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5'; // Utilizando biblioteca CryptoJS conforme README.md;

import ActualQuestion from './ActualQuestion';

class Game extends Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.state = {
      questions: [],
      questionIndex: 0,
      loaded: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    const token = localStorage.getItem('token');
    const endpoind = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(endpoind)
      .then((response) => response.json())
      .then(({ results }) => this.setState({ questions: results, loaded: true }));
  }

  render() {
    const { questions, questionIndex, loaded } = this.state;
    const { gravatarEmail, name } = this.props;

    // Passando email para formato md5 de criptografia;
    const encodeEmail = md5(gravatarEmail).toString();

    return (
      <div>
        <header>
          <img
            // url da foto do usuário, com o formato que está no README.md;
            src={ `https://www.gravatar.com/avatar/${encodeEmail}` }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">0</span>
        </header>
        <main>
          { loaded
          && (
            <ActualQuestion
              question={ questions[questionIndex] }
            />
          ) }
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

// Enviando propriedades do estado do reducer "player" para props do meu componente;
const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);
