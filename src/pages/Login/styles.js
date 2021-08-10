/* eslint-disable indent */
import styled from 'styled-components';

const LoginFormS = styled.form` /* desabilitando problema stylelint */
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 40%;

  input {
    display: inline-block;
    margin-bottom: 4px;
    width: 80%;
  }
`;

export default LoginFormS;
