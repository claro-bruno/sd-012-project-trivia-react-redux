import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import '../../css/Button.css';

class ButtonsLogin extends React.Component {
  render() {
    const { props: {
      disabled,
      handleClick1,
      handleClick2,
      handleClick3,
    },
    } = this;
    return (
      <>
        <Button
          testId="btn-play"
          name="Entrar"
          disabled={ disabled }
          handleClick={ handleClick1 }
          className="std-button enter-button"
        />
        <Button
          testId="btn-settings"
          name="Configurações"
          handleClick={ handleClick2 }
          className="std-button config-button"
        />
        <Button
          testId="btn-ranking"
          name="Ranking"
          handleClick={ handleClick3 }
          className="std-button ranking-button"
        />
      </>
    );
  }
}

const { func, bool } = PropTypes;
ButtonsLogin.propTypes = {
  disabled: bool,
  handleClick1: func.isRequired,
  handleClick2: func.isRequired,
  handleClick3: func.isRequired,
  // className: string,
};

ButtonsLogin.defaultProps = {
  disabled: false,
  // className: '',
};

export default ButtonsLogin;
