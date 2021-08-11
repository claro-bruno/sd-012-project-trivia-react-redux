import styled from 'styled-components';

export const Tittle = styled.h1`
  font-size: 5vw;
  color: #2FC18C;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 0.3vw;
`;

export const LabelText = styled.h3`
  color: white;
  font-size: 1.2vw;
`;

export const Input = styled.input`
  padding: 0.3vw;
  height: 3vw;
  border-radius: 1vw;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2FC18C;
  color: white;
  font-size: 2vw;
  height: 7vh;
  width: 70%;
  border-radius: 2vw;
  border: none;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  box-shadow: 0.1vw 0.1vw 0.2vw black;
`;
