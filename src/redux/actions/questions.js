export const SCORE_UPDATE = 'SEND_ANSWER';
export const SEND_CRONOMETER = 'SEND_CRONOMETER';
export const STOP_TIME = 'STOP_TIME';

export const scoreUpdate = (answerValue, diffucultyValue) => ({
  type: SCORE_UPDATE,
  answerValue,
  diffucultyValue,
});

export const sendCronometer = () => ({
  type: SEND_CRONOMETER,
});

export const stopTime = () => ({
  type: STOP_TIME,
});
