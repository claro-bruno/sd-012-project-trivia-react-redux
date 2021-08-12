import styled from 'styled-components';

export const PlayerRankingS = styled.section` /* desabilitando problema stylelint */
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  padding: 50px;
  width: 50%;

  div {
    display: flex;
    width: 550px;

    h4 {
      margin-left: 150px;
    }
  }

  img {
    border-radius: 50%;
    height: 55px;
    padding: 10px;
    width: 55px;
  }
`;

export const RankingHeaderS = styled.header` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  min-height: 10vh;
  padding: 4px 36px;

  h2 {
    margin-top: 25px;
    text-align: center;
  }
`;
