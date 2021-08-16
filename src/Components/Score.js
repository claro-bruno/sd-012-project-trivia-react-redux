import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

class Score extends Component {
  render() {
    const { score, dataTestId } = this.props;
    return (
      <Typography variant="h6" style={ { flexGrow: 1 } } data-testid={ dataTestId }>
        {`Score: ${score}`}
      </Typography>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.user.score,
});

export default connect(mapStateToProps)(Score);

Score.propTypes = {
  score: PropTypes.number.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
