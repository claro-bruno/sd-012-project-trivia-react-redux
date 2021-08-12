import styled from 'styled-components';

export const FeedbackMainS = styled.main` /* desabilitando problema stylelint */
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  margin: 48px auto;
  padding: 64px;
  width: 50%;

  h2 {
    font-size: 30px;
    margin: 0 0 32px;

    :last-of-type {
      border-bottom: 1px solid ${({ theme }) => theme.text};
      margin-bottom: 64px;
      padding-bottom: 64px;
      text-align: center;
      width: 100%;
    }
  }

  div {
    width: 50%;

    button {
      background-color: ${({ theme }) => theme.text};
      border: none;
      border-radius: 3px;
      color: ${({ theme }) => theme.secondary};
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      padding: 8px 0;
      width: 100%;

      :hover {
        cursor: pointer;
      }
    }

    a:last-of-type {

      button {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.text};
      }
    }
  }

  @media ( max-width : 768px ) {
    margin: 0;
    padding: 32px 0;
    width: 100%;
  }

  @media ( max-width : 466px ) {

    h2 {
      font-size: 26px;
    }

    div button {
      font-size: 16px;
    }
  }
`;

export const MessageSectionS = styled.section` /* desabilitando problema stylelint */
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 64px;
  padding-bottom: 64px;
  width: 100%;

  h1 {
    font-size: 40px;
    margin-bottom: 0;
    text-align: center;
  }

  .happy-homer {
    border-radius: 38%;
    height: 175px;
    width: 175px;
  }

  .donut-homer {
    border-radius: 50%;
    height: 200px;
    width: 300px;
  }

  @media ( max-width : 466px ) {

    h1 {
      font-size: 35px;
      margin-bottom: 0;
      text-align: center;
    }

    .happy-homer {
      height: 150px;
      width: 150px;
    }

    .donut-homer {
      height: 175px;
      width: 275px;
    }
  }
`;
