import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NextButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
    };

    this.handleClickNextButton = this.handleClickNextButton(this);
  }

  handleClickNextButton() {
    const { questionNumber } = this.state;

    const MAX_QUESTIONS = 5;
    if (questionNumber < MAX_QUESTIONS) {
      this.setState((prevState) => ({
        ...prevState,
        questionNumber: prevState.questionNumber + 1,
      })/* , () => console.log(questionNumber) */);
    }
    console.log(questionNumber);

    // this.setState((state) => ({
    //   ...state,
    //   questionNumber: state.questionNumber + 1,
    // }));

    // this.setState({
    //   questionNumber: questionNumber + 1,
    // });
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        id="btn-next"
        onClick={ this.handleClickNextButton }
      >
        Next
      </button>
    );
  }
}
const mapStateToProps = (state) => ({
  triviaQuest: state.questions.questions,
});

NextButton.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(NextButton);
