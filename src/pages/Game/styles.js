/* eslint-disable indent */
import styled from 'styled-components';

const GameBodyS = styled.main` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  margin: 20px auto;
  padding: 30px 50px 50px;
  width: 80%;

  h2 {
    color: ${({ theme }) => theme.text};
    font-size: 30px;
  }

  h4 {
    color: ${({ theme }) => theme.text};
    font-size: 25px;
    text-align: center;
  }

  p {
    align-items: center;
    align-self: flex-end;
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 50%;
    box-shadow: 1px 1px 3px gray;
    display: flex;
    font-size: 35px;
    height: 60px;
    justify-content: center;
    margin: 0;
    padding: 5px;
    position: absolute;
    text-align: center;
    width: 60px;
  }

  section {
    align-items: center;
    background-color: ${(theme) => theme.secondary};
    display: flex;
    flex-direction: column;


    div {
      display: flex;
      flex-direction: column;

      button {
        border-radius: 3px;
        font-size: 20px;
        font-weight: 550;
        margin-right: 15px;
        margin-top: 5px;
        padding: 10px 25px;
      }
    }
  }
`;

export default GameBodyS;
