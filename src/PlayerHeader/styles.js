import styled from 'styled-components';

const PlayerHeaderS = styled.header` /* desabilitando problema stylelint */
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  min-height: 10vh;
  padding: 4px 48px;

  section {
    align-items: center;
    display: flex;

    h3 {
      align-self: flex-end;
      margin: 0 0 2px 8px;
    }
  }

  img {
    border-radius: 50%;
    height: 55px;
    width: 55px;
  }
`;

export default PlayerHeaderS;
