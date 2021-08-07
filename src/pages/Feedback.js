import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FeedbackMessage from '../components/FeedbackMessage';
import ResultsInfo from '../components/ResultsInfo';
import Button from '../components/Button';

class Feedback extends React.Component {
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
          testid="btn-ranking"
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
};

export default Feedback;
