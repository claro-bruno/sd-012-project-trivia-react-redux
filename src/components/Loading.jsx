import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <main className="loading-screen row">
        <h1>Loading</h1>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </main>
    );
  }
}

export default Loading;
