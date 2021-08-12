/* eslint-disable indent */
import styled from 'styled-components';

const GameBodyS = styled.main` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  color: ${({ theme }) => theme.text};
  margin: 20px auto;
  padding: 30px 50px 50px;
  width: 50%;

  h2 {
    font-size: 30px;
    margin-top: 0;
  }

  h4 {
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
    font-size: 30px;
    height: 40px;
    justify-content: center;
    margin: 0;
    padding: 5px;
    position: relative;
    text-align: center;
    width: 40px;
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
        color: ${({ theme }) => theme.text};
        font-size: 20px;
        font-weight: 550;
        margin-top: 5px;
        padding: 10px 25px;
      }

      .next-button {
        margin-top: 36px;
      }
    }
  }

  @media ( max-width : 768px ) {
    margin: 0;
    padding: 0;
    width: 100%;

    p {
      margin: 16px;
    }

    h4 {
      margin: 16px;
    }
  }

  @media ( max-width : 568px ) {

    h2 {
      font-size: 25px;
      margin-top: 0;
    }

    h4 {
      font-size: 20px;
    }
  }
`;

export default GameBodyS;
