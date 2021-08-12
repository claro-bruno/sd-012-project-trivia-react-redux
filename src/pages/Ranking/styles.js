import styled from 'styled-components';

export const RankinMainS = styled.main` /* desabilitando problema stylelint */
  min-height: 100vh;
  position: relative;

  button {
    font-size: 20px;
    padding: 6px 56px;
  }

  @media ( max-width : 768px ) {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

export const PlayerRankingS = styled.section` /* desabilitando problema stylelint */
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  padding: 50px;
  width: 50%;

  div {
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    padding: 12px;
    width: 90%;

    :first-of-type {
      border-bottom: 0;
      justify-content: space-space-between;

      h2 {
        margin: 0;
      }
    }

    :last-of-type {
      margin-bottom: 64px;
    }

    section {
      display: flex;
    }
  }

  img {
    border-radius: 50%;
    height: 55px;
    margin-right: 8px;
    width: 55px;
  }

  @media ( max-width : 768px ) {
    box-shadow: none;
    flex-wrap: wrap;
    margin: 0;
    padding: 32px 0;
    width: 100%;

    div {
      flex-wrap: wrap;
    }
  }
`;

export const RankingHeaderS = styled.header` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};

  h2 {
    align-items: center;
    display: flex;
    height: 63px;
    justify-content: center;
    margin: 0;
    padding: 2px 0;
  }

  @media ( max-width : 768px ) {

    h2 {
      height: 11vh;
      padding: 0;
    }
  }
`;
