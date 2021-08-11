/* eslint-disable indent */
import styled from 'styled-components';

export const GameHeaderS = styled.header` /* desabilitando problema stylelint */
  background-color: #fafafa;
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  display: flex;
  justify-content: center;
  margin: 20px auto 0;
  padding: 20px 10px;
  width: 550px;

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
  width: 80%;

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
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;

      button {
        border-radius: 50px;
        font-weight: 550;
        margin-right: 15px;
        margin-top: 16px;
        width: 50%;
      }
    }
  }
`;
