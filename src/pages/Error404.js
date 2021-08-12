import React from 'react';
import purpleRain from '../img/purple-rain.gif';
import error from '../img/error.png';

class Error404 extends React.Component {
  render() {
    return (
      <div className="errorContainer">
        <img className="errorPic" src={ error } alt="Error" />
        <h2>I never meant to cause you any sorrow...</h2>
        <img className="princeGif" src={ purpleRain } alt="Prince Gif" />
      </div>
    );
  }
}

export default Error404;
