import styled from 'styled-components';

// Isto é um componente estilizado do tipo botão;
const AnswerButtonS = styled.button` /* desabilitando problema stylelint */

/* stylelint-disable indentation */
  background-color: transparent;
  border: ${({ styles }) => {
    // objeto 'styles' desconstruído das props;
    // 'answered' é uma propriedade do estado que é verdadeira quando usuário responde;
    if (styles.answered) {
      // verifica se a resposta é correta;
      if (styles.correct) {
        // retorno para a propriedade 'border';
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
