/* eslint-disable no-magic-numbers */
/* eslint-disable indent */
import styled from 'styled-components';

export const ButtonSectionS = styled.section` /* desabilitando problema stylelint */
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  max-width: 70%;
`;

export const ConfigButtonS = styled.button` /* desabilitando problema stylelint */
  background-color: transparent;
  border: none;
  font-size: 24px;
  padding: 0;
  vertical-align: middle;
  width: 10%;

  :hover {
    cursor: pointer;
  }
`;

export const PlayButtonS = styled.button` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 3px;
  color: whitesmoke;
  font-weight: 600;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  padding: 8px 0;
  width: 90%;

  :hover {
    cursor: pointer;
  }
`;
