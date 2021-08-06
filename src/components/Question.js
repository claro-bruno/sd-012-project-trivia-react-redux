import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import QuestionInfo from './QuestionInfo';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
      disabled: false,
    };

    this.count = this.count.bind(this);
  }

  componentDidMount() {
    this.count();
  }

  count() {
    const sec = 1000;
    const interval = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      });
      if (seconds === 1) {
        clearInterval(interval);
        this.setState({
          seconds: 'Time\'s Up',
          disabled: true,
        });
      }
    }, sec);
  }

  render() {
    const { disabled, seconds } = this.state;
    const { questions } = this.props;
    return (
      <div>
        { !questions.length
          ? null
          : (
            <QuestionInfo
              questions={ questions }
              disabled={ disabled }
              timer={ seconds }
              count={ this.count }
            />
          )}
        <Timer />
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
