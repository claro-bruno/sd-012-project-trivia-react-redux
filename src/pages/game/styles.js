import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;
  background-color: rgba(0,0,0,0.5);
`;

export const HeaderText = styled.h1`
  color: white;
  font-size: 1.5vw;
`;

export const Div = styled.div`
  display: flex;
  gap: 1vw;
`;

export const QuestionWrapper = styled.div`
  width: 30vw;
  height: 75vh;
  background-color:white;
  border-radius: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-around;
  background-color: rgba(0,0,0,0.5);
  padding: 2vw;
`;

export const GameWrapper = styled.main`
  width: 100%;
  height: calc(100vh - 15vh);
  display: flex;
  padding: 3vw;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const Cat = styled.h1`
  width: 90%;
  color: white;
  background-color: #006DFB;
  height: 8vh;
  border-radius: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  padding: 3vw;
`;

export const Quest = styled.p`
  color: white;
  font-size: 2vw;
`;

export const Tip = styled.div`
  height: 7vh;
  width: 70%;
  color: #036B52;
  font-size: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  border-radius: 2vw;
`;

export const AnswerWrapper = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 40%;
  height: 100%;
  gap: 5%;
`;

export const AsButton = styled.button`
  width: 80%;
  height: 15vh;
  color: #491473;
  font-size: 1.5vw;
  border-radius: 2vw;
  cursor: pointer;
`;

export const Timer = styled.div`
  border-radius: 50%;
  width: 4vw;
  background-color: white;
  color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5vw;
`;

export const Next = styled.button``;
export const h1 = styled.h1``;
