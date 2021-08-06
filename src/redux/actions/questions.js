export const GLOBAL_KEY = 'GLOBAL_KEY';
export const TIMER_DECREMENT = 'TIMER_DECREMENT';
export const SCORE_UPDATE = 'SCORE_UPDATE';

export const updateGlobalKey = (status) => ({
  type: GLOBAL_KEY,
  status,
});

export const timerDecrement = () => ({
  type: TIMER_DECREMENT,
});

export const scoreUpdate = (difficulty) => ({
  type: SCORE_UPDATE,
  difficulty,
});
