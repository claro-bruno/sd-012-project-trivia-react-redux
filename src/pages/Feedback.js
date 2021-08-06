import React from 'react';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}
Feedback.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default Feedback;
