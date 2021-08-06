export const GLOBAL_KEY = 'GLOBAL_KEY';
export const TIMER_DECREMENT = 'TIMER_DECREMENT';

export const updateGlobalKey = (status) => ({
  type: GLOBAL_KEY,
  status,
});

export const timerDecrement = () => ({
  type: TIMER_DECREMENT,
});
