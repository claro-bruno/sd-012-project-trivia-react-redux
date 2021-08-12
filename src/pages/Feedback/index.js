import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PlayerHeader from '../../PlayerHeader';
import { FeedbackMainS, MessageSectionS } from './styles';

import homerFeliz from '../../assets/images/homer-excited.png';
import homerDonut from '../../assets/images/homer_donut.png';

class Feedback extends Component {
  constructor() {
    super();
    this.performPlayer = this.performPlayer.bind(this);
  }

  performPlayer() {
    const { assertions } = this.props;
    const moreAssertion = 'Mandou bem!';
    const lessAssertion = 'Podia ser melhor...';
    const numberAssertions = 3;
    return (assertions >= numberAssertions) ? moreAssertion : lessAssertion;
  }

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    const encodeEmail = md5(gravatarEmail).toString();
    return (
      <div>
        <PlayerHeader
          name={ name }
          score={ score }
          encodeEmail={ encodeEmail }
        />
        <FeedbackMainS>
          <MessageSectionS>
            { this.performPlayer() === 'Mandou bem!'
              ? <img src={ homerFeliz } alt="O cara felix" className="happy-homer" />
              : (
                <img
                  src={ homerDonut }
                  alt="O cara comendo donut"
                  className="donut-homer"
                />
              ) }
            <h1 data-testid="feedback-text">{ this.performPlayer() }</h1>
          </MessageSectionS>
          <h2>
            {'Pontuação: '}
            <span data-testid="feedback-total-score">{score}</span>
          </h2>
          <h2>
            {'Você acertou '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' perguntas'}
          </h2>
          <div>
            <Link to="/ranking">
              <button type="button" data-testid="btn-ranking">Ver Ranking</button>
            </Link>
            <Link to="/">
              <button type="button" data-testid="btn-play-again">Jogar novamente</button>
            </Link>
          </div>
        </FeedbackMainS>
      </div>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
