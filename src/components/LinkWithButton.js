import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LinkWithButton extends Component {
  render() {
    const { pathTo, disabled, handlePlayBtn, btnText } = this.props;
    return (
      <Link to={ pathTo }>
        <button
          disabled={ disabled }
          type="button"
          data-testid="btn-play"
          onClick={ handlePlayBtn }
        >
          {btnText}
        </button>
      </Link>
    );
  }
}

LinkWithButton.propTypes = {
  disabled: PropTypes.bool,
  handlePlayBtn: PropTypes.func,
  pathTo: PropTypes.string,
}.isRequired;

export default LinkWithButton;
