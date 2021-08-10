import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedbacks extends Component {
  constructor() {
    super();
    this.renderButtons = this.renderButtons.bind(this);
  }

  renderButtons() {
    return (
      <div>
        <Button
          testid="btn-play-again"
          inner="Jogar novamente!"
          to="/"
          className="btn btn-info"
        />
        <Button
          testid="btn-ranking"
          inner="Ver ranking"
          to="/ranking"
          className="btn btn-dark"
        />
      </div>);
  }

  render() {
    const { assertions, score } = this.props;
    const minAssertions = 3;
    return (
      <main className="feedback-page d-flex">
        <Header />
        <div className="feedback-container position-absolute d-flex flex-column">
          <h1
            data-testid="feedback-text"
            className="feedback-text position-absolute"
          >
            {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
          </h1>
          <h3 data-testid="feedback-total-score">
            Sua pontuação foi:
            {' '}
            <span
              className={
                assertions < minAssertions ? 'low-assertions' : 'high-assertions'
              }
            >
              {score}

            </span>
          </h3>
          <h4 data-testid="feedback-total-question">
            Você acertou
            {' '}
            <span
              className={
                assertions < minAssertions ? 'low-assertions' : 'high-assertions'
              }
            >
              {assertions}
            </span>
            {' '}
            de 5 perguntas
          </h4>
          {this.renderButtons()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
  score: state.game.score,
});

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
