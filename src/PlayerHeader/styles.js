import styled from 'styled-components';

const PlayerHeaderS = styled.header` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.primary};
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  display: flex;
  justify-content: center;
  margin: 20px auto 0;
  padding: 20px 10px;
  width: 550px;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 25px;
  }

  h3 {
    font-size: 19px;
  }

  h4 {
    font-weight: 900;
    margin-top: 5px;
  }

  img {
    border-radius: 5px;
    width: 100px;
  }
`;

export default PlayerHeaderS;
