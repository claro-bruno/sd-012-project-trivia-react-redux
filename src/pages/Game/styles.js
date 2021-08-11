/* eslint-disable indent */
import styled from 'styled-components';

export const GameHeaderS = styled.header` /* desabilitando problema stylelint */
  background-color: #fafafa;
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
  padding: 20px 10px;
  width: 50%;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 25px;
  }

  h3 {
    font-size: 19px;
  }

  h4 {
    font-weight: 900;
    margin-top: 5px;
  }

  img {
    border-radius: 5px;
    width: 100px;
  }
`;

export const GameBodyS = styled.main` /* desabilitando problema stylelint */
  background-color: #fafafa;
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  margin: 20px auto;
  padding: 50px;
  width: 50%;

  p {
    background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 1px 1px 3px gray;
    font-size: 35px;
    margin: 20px auto;
    padding: 5px;
    text-align: center;
    width: 60px;
  }

  section {
    text-align: center;

    div {
      align-items: center;
      display: flex;
      flex-direction: column;

      button {
        border-radius: 50px;
        font-weight: 550;
        margin-top: 16px;
        width: 50%;
      }

    }
  }
`;
