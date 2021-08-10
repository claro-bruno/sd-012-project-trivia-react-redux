import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Input';

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
        />
        <Button
          testId="btn-settings"
          name="Configurações"
          handleClick={ handleClick2 }
        />
        <Button
          testId="btn-ranking"
          name="Ranking"
          handleClick={ handleClick3 }
        />
      </>
    );
  }
}

const { func } = PropTypes;
ButtonsLogin.propTypes = {
  disabled: func.isRequired,
  handleClick1: func.isRequired,
  handleClick2: func.isRequired,
  handleClick3: func.isRequired,
};

export default ButtonsLogin;
