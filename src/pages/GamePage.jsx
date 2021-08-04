import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GamePage extends Component {
  render() {
    const { myUserState } = this.props;
    return (
      <div>
        <span>
          GamePage, player token:
          {' '}
          { myUserState }
        </span>
      </div>
    );
  }
}

GamePage.propTypes = {
  myUserState: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  myUserState: state.user.token,
});

export default connect(mapStateToProps)(GamePage);
