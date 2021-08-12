import React, { Component } from 'react';
import { string } from 'prop-types';

class QuestionCategory extends Component {
  render() {
    const { category } = this.props;
    return (
      <div
        className="category-container"
      >
        <p
          data-testid="question-category"
        >
          { category }
        </p>
      </div>
    );
  }
}

QuestionCategory.propTypes = {
  category: string.isRequired,
};

export default QuestionCategory;
