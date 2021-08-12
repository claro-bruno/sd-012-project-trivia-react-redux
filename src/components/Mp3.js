import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';

class Mp3 extends Component {
  render() {
    const { musicPath } = this.props;
    return (
      <div>
        <ReactAudioPlayer
          src={ musicPath }
          autoPlay
          volume={ 0.2 }
          // controls
        />
      </div>
    );
  }
}

Mp3.propTypes = {
  musicPath: PropTypes.string.isRequired,
};

export default Mp3;
