import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ButtonHome extends React.Component {
  render() {
    const { text, testId = '', linkTo, className, onClick = null } = this.props;
    return (
      <Link to={ linkTo }>
        <button
          type="button"
          className={ className }
          data-testid={ testId }
          onClick={ onClick }
        >
          { text }
        </button>
      </Link>
    );
  }
}

ButtonHome.propTypes = {
  text: PropTypes.string.isRequired,
  testId: PropTypes.string,
  linkTo: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ButtonHome.defaultProps = {
  testId: '',
  onClick: null,
};

export default ButtonHome;
