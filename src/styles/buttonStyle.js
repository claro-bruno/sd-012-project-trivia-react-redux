import styled from 'styled-components';

const ButtonS = styled.button` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 3px;
  color: whitesmoke;
  font-weight: 600;
  padding: 8px;

  :hover {
    cursor: pointer;
  }
`;

export default ButtonS;
