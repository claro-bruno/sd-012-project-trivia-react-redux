import React from 'react';
import Button from './Button';

class ButtonToRanking extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
      >
        Ranking
      </button>
    );
  }
}

export default ButtonToRanking;
