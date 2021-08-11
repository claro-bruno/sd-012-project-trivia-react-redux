import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionInfo from './QuestionInfo';
import './question.css';

class Question extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div className="container">
        { !questions.length
          ? null
          : (
            <div>
              <QuestionInfo
                questions={ questions }
                count={ this.count }
              />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Question);
