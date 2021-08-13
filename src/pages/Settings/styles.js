import styled from 'styled-components';

const SettingsBodyS = styled.div` /* desabilitando problema stylelint */
  background-color: ${({ theme }) => theme.secondary};
  height: 100vh;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 50%;

    select {
      font-size: 20px;
      height: 50px;
      margin: 8px 32px;
      text-align-last: center;

      :hover {
        cursor: pointer;
      }
    }

    button {
      background-color: ${({ theme }) => theme.primary};
      border: none;
      color: ${({ theme }) => theme.text};
      font-size: 20px;
      height: 50px;
      margin-top: 30px;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

export default SettingsBodyS;
