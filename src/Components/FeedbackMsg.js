import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
class FeedbackMsg extends React.Component {
  render() {
    // const { result } = this.props;
    const result = 5;
    const validResult = 3;
    if (result < validResult) {
      return (
        <div>
          <p data-testid="feedback-text">Podia ser melhor...</p>
        </div>
      );
    }
    return (
      <div>
        <p data-testid="feedback-text">Mandou bem!</p>
      </div>
    );
  }
}
// FeedbackMsg.propTypes = {
//   results: PropTypes.number.isRequired,
// };
const mapstatetoprops = (state) => ({
  results: state.result,
});
export default connect(mapstatetoprops)(FeedbackMsg);
