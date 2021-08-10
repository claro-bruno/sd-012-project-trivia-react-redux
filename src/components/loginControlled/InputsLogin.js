import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

class InputsLogin extends React.Component {
  render() {
    const { props: {
      value1,
      value2,
      onChange1,
      onChange2,
    },
    } = this;
    return (
      <>
        <Input
          name="user"
          testId="input-player-name"
          label="Usuário"
          onChange={ onChange1 }
          value={ value1 }
          type="text"
        />
        <Input
          name="email"
          testId="input-gravatar-email"
          label="E-mail"
          onChange={ onChange2 }
          value={ value2 }
          type="email"
        />
      </>
    );
  }
}

const { func, string } = PropTypes;
InputsLogin.propTypes = {
  onChange1: func.isRequired,
  value1: string.isRequired,
  onChange2: func.isRequired,
  value2: string.isRequired,
};

export default InputsLogin;
