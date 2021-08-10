/* eslint-disable indent */
import styled from 'styled-components';

export const LoginPageS = styled.section` /* desabilitando problema stylelint */
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media ( max-width : 768px ) {
    grid-template-columns: 1fr;
    grid-template-rows: 10vh 90vh;
  }
`;

export const LoginHeaderS = styled.header` /* desabilitando problema stylelint */
  background-color: #2fc18c;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 24px;

  h1 {
    color: white;
    font-size: 34px;
    opacity: 0.6;
  }

  img {
    height: 55%;
    max-width: 100%;
    opacity: 0.2;
  }

  @media ( max-width : 768px ) {
    padding: 8px 24px;

    h1 {
      color: whitesmoke;
      font-size: 22px;
      margin: 0;
      opacity: 0.8;
      text-align: center;
      vertical-align: middle;
    }

    img {
      display: none;
    }
  }
`;

export const LoginMainS = styled.main` /* desabilitando problema stylelint */
  align-items: center;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    height: 112px;
    width: 268px;
  }

  * {
    max-width: 100%;
  }

  @media ( max-width : 768px ) {
    justify-content: flex-start;
    padding: 64px 24px;
  }
`;

export const LoginFormS = styled.form` /* desabilitando problema stylelint */
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  section {
    margin: auto;
    width: 85%;

    input {
      border: transparent;
      border-radius: 3px;
      box-shadow: 1px 1px 3px gray;
      font-size: 18px;
      height: 46px;
      margin: 0 auto 8px;
      padding: 0;
      width: 100%;

      :focus {
        outline: transparent;
      }

      &:-webkit-autofill:first-line {
        font-size: 18px;
      }
    }
  }

  @media ( max-width : 768px ) {
    justify-content: flex-start;
  }
`;
