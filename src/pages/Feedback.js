import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FeedbackMessage from '../components/FeedbackMessage';
import ResultsInfo from '../components/ResultsInfo';
import Button from '../components/Button';
import { restoreStore } from '../redux/action';

class Feedback extends React.Component {
  componentWillUnmount() {
    const { restore } = this.props;
    restore();
  }

  handleClick(route) {
    const { history } = this.props;
    history.push(route);
  }

  render() {
    return (
      <section>
        <Header />
        <FeedbackMessage />
        <ResultsInfo />
        <Button
          buttonText="Jogar novamente"
          testId="btn-play-again"
          onClick={ () => this.handleClick('/') }
        />
        <Button
          buttonText="Ver Ranking"
          testId="btn-ranking"
          onClick={ () => this.handleClick('/ranking') }
        />
      </section>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  restore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  restore: () => dispatch(restoreStore()),
});

export default connect(null, mapDispatchToProps)(Feedback);
