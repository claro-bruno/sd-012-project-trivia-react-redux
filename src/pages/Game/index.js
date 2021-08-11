import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5'; // Utilizando biblioteca CryptoJS conforme README.md;

import ActualQuestion from './ActualQuestion';
import GameBodyS from './styles';
import PlayerHeader from '../../PlayerHeader';

class Game extends Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
    const numberOfQuestions = 5;
    const token = localStorage.getItem('token');
    const endpoind = `https://opentdb.com/api.php?amount=${numberOfQuestions}&encode=base64&token=${token}`;
    fetch(endpoind)
      .then((response) => response.json())
      .then(({ results }) => this.setState({ questions: results, loaded: true }));
  }

  nextQuestion() {
    const { questionIndex: actualIndex } = this.state;
    const maxIndex = 4;
    if (actualIndex < maxIndex) {
      this.setState(({ questionIndex }) => ({
        questionIndex: questionIndex + 1,
      }));
    }
  }

  render() {
    const { questions, questionIndex, loaded } = this.state;
    const { gravatarEmail, name, score } = this.props;

    // Passando email para formato md5 de criptografia;
    const encodeEmail = md5(gravatarEmail).toString();

    return (
      <div>
        <PlayerHeader
          name={ name }
          score={ score }
          encodeEmail={ encodeEmail }
        />
        <GameBodyS>
          { loaded
          && (
            <ActualQuestion
              question={ questions[questionIndex] }
              questionIndex={ questionIndex }
              nextQuestion={ this.nextQuestion }
              picture={ encodeEmail }
              name={ name }
              score={ score }
            />
          ) }
        </GameBodyS>
      </div>
    );
  }
}

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

// Enviando propriedades do estado do reducer "player" para props do meu componente;
const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Game);
