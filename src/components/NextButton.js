import React from 'react';

class NextButton extends React.Component {
  render() {
    return (
      <div>
        <button
          className="nextButton"
          type="button"
          data-testid="btn-next"
        >
          Próxima
        </button>
      </div>
    );
  }
}

export default NextButton;
