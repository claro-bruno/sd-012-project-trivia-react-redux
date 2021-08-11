/* eslint-disable indent */
import styled from 'styled-components';

const GameBodyS = styled.main` /* desabilitando problema stylelint */
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
    align-items: center;
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: column;

      button {
        border-radius: 3px;
        font-weight: 550;
        margin-right: 15px;
        margin-top: 16px;
      }
    }
  }
`;

export default GameBodyS;
