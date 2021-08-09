import React from 'react';

class Ranking extends React.Component {
  render() {
    const list = JSON.parse(localStorage.getItem('state'));
    console.log(localStorage.getItem('state'));
    return (
      <div>
        <h1>Ranking</h1>
        <table>
          <tr>
            <td>Name</td>
            <td>Score</td>
          </tr>
          <tr>
            <td>{ list.player.name }</td>
            <td>{ list.player.score }</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Ranking;
