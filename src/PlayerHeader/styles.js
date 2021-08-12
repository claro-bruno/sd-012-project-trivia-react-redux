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
  padding: 4px 36px;

  h3 {
    margin: 0;
  }

  section {
    align-items: center;
    display: flex;

    h3 {
      align-self: flex-end;
      margin: 0 0 0 8px;
    }
  }

  img {
    border-radius: 50%;
    height: 55px;
    width: 55px;
  }

  @media ( max-width : 620px ) {

    section h3 {
      align-self: center;
    }
  }

  @media ( max-width : 400px ) {

    img {
      height: 45px;
      width: 45px;
    }

    h3, section h3 {
      font-size: 16px;
    }
  }
`;

export default PlayerHeaderS;
