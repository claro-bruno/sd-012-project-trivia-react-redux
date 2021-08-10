/* eslint-disable indent */
import styled from 'styled-components';

// Isto é um componente estilizado do tipo botão;
const AnswerButtonS = styled.button` /* desabilitando problema stylelint */
  background-color: transparent;
  border: ${({ styles }) => {
    if (styles.answered) {
    if (styles.correct) {
    return '3px solid rgb(6, 240, 15)';
    }
    return '3px solid rgb(255, 0, 0)';
    }
    return '3px solid black';
    }};

  :hover {
    cursor: pointer;
  }
`;

export default AnswerButtonS;
