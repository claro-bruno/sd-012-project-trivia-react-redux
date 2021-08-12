import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string, func } from 'prop-types';

class Button extends Component {
  render() {
    const { link, testId, label, onClick } = this.props;
    if (link !== '') {
      return (
        <div
          className="jogar-novamente-btn"
        >
          <Link to={ link }>
            <button
              type="button"
              data-testid={ testId }
              onClick={ onClick }
            >
              { label }
            </button>
          </Link>
        </div>
      );
    }
    return (
      <div
        className="ver-ranking-btn"
      >
        <button
          type="button"
          data-testid={ testId }
          onClick={ onClick }
        >
          { label }
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  link: string,
  testId: string,
  label: string.isRequired,
  onClick: func,
};

Button.defaultProps = {
  link: '',
  testId: '',
  onClick: null,
};

export default Button;
