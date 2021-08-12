import React, { Component } from 'react';
import { number } from 'prop-types';

class Hits extends Component {
  render() {
    const { assertions, qntQuestions } = this.props;
    return (
      <div
        className="feedback-hits"
      >
        <span
          data-testid="feedback-total-question"
        >
          {assertions}
        </span>
        <span>
          {`/${qntQuestions}`}
        </span>
      </div>
    );
  }
}

Hits.propTypes = {
  assertions: number.isRequired,
  qntQuestions: number.isRequired,
};

export default Hits;
