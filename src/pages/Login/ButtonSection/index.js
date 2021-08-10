import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ButtonSectionS, ConfigButtonS, PlayButtonS } from './styles';
import { Config } from '../../../assets/icons';

class ButtonSection extends Component {
  render() {
    const {
      isValid,
      handleFetch,
      handleSendUserInfo,
      handleRedirectConfig,
    } = this.props;
    return (
      <ButtonSectionS>
        <ConfigButtonS
          type="button"
          data-testid="btn-settings"
          onClick={ handleRedirectConfig }
        >
          <Config />
        </ConfigButtonS>
        <PlayButtonS
          type="button"
          data-testid="btn-play"
          onClick={ () => { handleFetch(); handleSendUserInfo(); } }
          disabled={ isValid() }
        >
          JOGAR
        </PlayButtonS>
      </ButtonSectionS>
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
