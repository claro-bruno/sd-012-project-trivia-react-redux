import React, { Component } from 'react';
import { string } from 'prop-types';
import htmlDecode from '../../functions/htmlDecode';

class QuestionText extends Component {
  render() {
    const { question } = this.props;
    return (
      <div
        className="question-container"
      >
        <p
          data-testid="question-text"
        >
          { htmlDecode(question) }
        </p>
      </div>
    );
  }
}

QuestionText.propTypes = {
  question: string.isRequired,
};

export default QuestionText;
