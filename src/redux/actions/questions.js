export const SEND_ANSWER = 'SEND_ANSWER';
export const SEND_CRONOMETER = 'SEND_CRONOMETER';
export const STOP_TIME = 'STOP_TIME';

export const sendAnswer = (pAnswer, pDifficulty) => ({
  type: SEND_ANSWER,
  pAnswer,
  pDifficulty,
});

export const sendCronometer = () => ({
  type: SEND_CRONOMETER,
});

export const stopTime = () => ({
  type: STOP_TIME,
});
