import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const { score } = this.props;
    return (
      <h1
        data-testid="header-score"
      >
        {score}
      </h1>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.user.score,
});

export default connect(mapStateToProps)(Score);

Score.propTypes = {
  score: PropTypes.number.isRequired,
};
