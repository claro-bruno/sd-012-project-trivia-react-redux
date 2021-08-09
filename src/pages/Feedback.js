import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import FeedbackMsg from '../components/FeedbackMsg';
import GenericBtn from '../components/GenericBtn';

class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMsgProps = this.feedbackMsgProps.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  feedbackMsgProps(assertions, score) {
    const avgScore = 3;

    if (assertions < avgScore) {
      return {
        msg: 'Podia ser melhor...',
        score,
        assertions,
      };
    }

    if (assertions >= avgScore) {
      return {
        msg: 'Mandou bem!',
        score,
        assertions,
      };
    }
    return {
      msg: 'Me desculpe, algo deu errado...',
    };
  }

  handleClick({ target }) {
    const { history } = this.props;
    const { name } = target;
    if (name === 'playAgain') {
      history.push('/');
    } else if (name === 'ranking') {
      history.push(`/${name}`);
    }
  }

  render() {
    const { avatar, name, score, assertions } = this.props;

    const headerProps = {
      avatar,
      name,
      score,
    };

    const playAgainBtnProps = {
      id: 'btn-play-again',
      value: 'Jogar Novamente',
      name: 'playAgain',
      onClick: this.handleClick,
    };

    const rankingBtnProps = {
      id: 'btn-ranking',
      value: 'Ver Ranking',
      name: 'ranking',
      onClick: this.handleClick,
    };

    return (
      <div>
        <Header { ...headerProps } />
        <FeedbackMsg { ...this.feedbackMsgProps(assertions, score) } />
        <GenericBtn { ...playAgainBtnProps } />
        <GenericBtn { ...rankingBtnProps } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.userReducer.avatar,
  name: state.userReducer.name,
  score: state.gameReducer.currentScore,
  assertions: state.gameReducer.assertions,
});

Feedback.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
