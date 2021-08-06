import React from 'react';
import loadingGif from '../../img/loading.gif';
import './style.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loadingContainer">
        <h3 className="loading">Carregando...</h3>
        <img className="loadingGif" src={ loadingGif } alt="loading" />
      </div>
    );
  }
}

export default Loading;
