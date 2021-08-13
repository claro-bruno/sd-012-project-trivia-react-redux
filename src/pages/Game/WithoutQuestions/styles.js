/* eslint-disable indent */
import styled from 'styled-components';

const QuestionsNotFound = styled.section` /* desabilitando problema stylelint */
  display: flex;
  flex-direction: column;
  height: 70%;
  justify-content: space-around;

  h2 {
    margin-top: 64px;
    text-align: center;
  }

  img {
    border-radius: 60%;
    height: 200px;
    margin-top: 20px;
    width: 330px;
  }

  @media ( max-width : 768px ) {

    h2 {
      font-size: 25px;
    }
  }
`;

export default QuestionsNotFound;
