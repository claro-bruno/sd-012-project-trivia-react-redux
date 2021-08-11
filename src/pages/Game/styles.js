/* eslint-disable indent */
import styled from 'styled-components';

export const GameHeaderS = styled.header` /* desabilitando problema stylelint */
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 20px 10px 20px 10px;
  width: 550px;
  margin: 0px auto;
  box-shadow: 1px 1px 3px gray;
  background-color: #fafafa;
  border-radius: 5px;

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

export const GameBodyS = styled.main` /* desabilitando problema stylelint */
  width: 80%;
  margin: 20px auto;
  box-shadow: 1px 1px 3px gray;
  background-color: #fafafa;
  padding: 50px;
  border-radius: 5px;

  p {
    font-size: 35px;
    box-shadow: 1px 1px 3px gray;
    padding: 5px 5px;  
    background-color: #fafafa;
    width: 60px;
    margin: 20px auto;
    border-radius: 3px;
    text-align: center;
  }
 
  section {      
    justify-content: center;

    div {
    display: flex;
    flex-direction: column;    
        
      button {
        margin-top: 16px;
        width: 50%;
        margin-right: 15px;
        font-weight: 550;
        border-radius: 50px;    
      }    
    }
  }
`;
