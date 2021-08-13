import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5'; // Utilizando biblioteca CryptoJS conforme README.md;

import ActualQuestion from './ActualQuestion';
import GameBodyS from './styles';
import PlayerHeader from '../../PlayerHeader';
import WithoutQuestions from './WithoutQuestions';
import fetchAPI from '../../Redux/reducers/questions/actions/fetchAPI';

class Game extends Component {
  constructor() {
    super();
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = {
      questionIndex: 0,
    };
  }

  componentDidMount() {
    const { requestFetch, receivedSettings } = this.props;
    if (!receivedSettings) requestFetch();
  }

  nextQuestion() {
    const { questions } = this.props;
    const { questionIndex: actualIndex } = this.state;
    const maxIndex = questions.length - 1;
    if (actualIndex < maxIndex) {
      this.setState(({ questionIndex }) => ({
        questionIndex: questionIndex + 1,
      }));
    }
  }

  render() {
    const { questionIndex } = this.state;
    const { questions, loaded, gravatarEmail, name, score } = this.props;

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
          { questions.length < 1 && loaded && <WithoutQuestions /> }
          { loaded && questions.length > 0
          && (
            <ActualQuestion
              questions={ questions }
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
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool.isRequired,
  requestFetch: PropTypes.func.isRequired,
  receivedSettings: PropTypes.bool.isRequired,
};

// Enviando propriedades do estado do reducer "player" para props do meu componente;
const mapStateToProps = ({ player, questions }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
  questions: questions.questions,
  loaded: questions.loaded,
  receivedSettings: questions.receivedSettings,
});

const mapDispatchToProps = (dispatch) => ({
  requestFetch: () => (
    dispatch(fetchAPI())),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
