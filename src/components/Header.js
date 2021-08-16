import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GAME = 'game';
const FEEDBACK = 'feedback';

class Header extends Component {
  constructor(props) {
    super(props);

    this.renderGameHeader = this.renderGameHeader.bind(this);
    this.rederFeedbackHeader = this.renderFeedbackHeader.bind(this);
  }

  renderGameHeader() {
    const { player: { playAgain }, name, gravatar, score } = this.props;

    return (
      <header className="player-container">
        <h2 className="player-name" data-testid="header-player-name">{ name }</h2>
        <img
          data-testid={ playAgain ? 'input-gravatar-email' : 'header-profile-picture' }
          className="player-image"
          src={ gravatar }
          alt="Imagem do Player"
        />
        <h3 className="player-score" data-testid="header-score">{ score }</h3>
      </header>
    );
  }

  renderFeedbackHeader() {
    const { name, gravatar, score, assertions } = this.props;

    return (
      <header className="feedback-player-container">
        <div className="feedback-player-image">
          <img
            data-testid="header-profile-picture"
            className="feedback-profile-picture"
            src={ gravatar }
            alt="Imagem do Player"
          />
          <h2 className="feedback-player-name" data-testid="header-player-name">
            { name }
          </h2>
        </div>
        <div className="feedback-score-container">
          <h1 className="feedback-title material-icons">emoji_events</h1>
          <h3
            className="feedback-score"
            data-testid="feedback-total-score"
          >
            {/* { `Placar final: ${score}` } */}
            { score }
          </h3>
        </div>
        <div className="feedback-assertions-score">
          <h5 data-testid="header-score">{ score }</h5>
          <h4
            className="feedback-assetions"
            data-testid="feedback-total-question"
          >
            {/* { `Total de acertos: ${assertions}` } */}
            { assertions }
          </h4>
        </div>
      </header>
    );
  }

  render() {
    const { toRender } = this.props;

    switch (toRender) {
    case GAME:
      return this.renderGameHeader();
    case FEEDBACK:
      return this.renderFeedbackHeader();
    default:
      return (<> </>);
    }
  }
}

const mapStateToProps = (state) => ({ player: state.player });

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  toRender: PropTypes.string.isRequired,
  assertions: PropTypes.number,
  player: PropTypes.shape({
    playAgain: PropTypes.bool,
  }).isRequired,
};

Header.defaultProps = {
  assertions: undefined,
};

export default connect(mapStateToProps, null)(Header);
