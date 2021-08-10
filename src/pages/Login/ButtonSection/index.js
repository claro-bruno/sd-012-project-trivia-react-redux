import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonSection extends Component {
  render() {
    const {
      isValid,
      handleFetch,
      handleSendUserInfo,
      handleRedirectConfig,
    } = this.props;
    return (
      <section>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => { handleFetch(); handleSendUserInfo(); } }
          disabled={ isValid() }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ handleRedirectConfig }
        >
          Configurar
        </button>
      </section>
    );
  }
}

ButtonSection.propTypes = {
  isValid: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
  handleSendUserInfo: PropTypes.func.isRequired,
  handleRedirectConfig: PropTypes.func.isRequired,
};

export default ButtonSection;
