export const REAL_TIME = 'REAL_TIME';
export const PAUSE_TIME = 'PAUSE_TIME';

export const noTime = (state) => ({
  type: REAL_TIME,
  state,
});

export const pauseTime = (state) => ({
  type: PAUSE_TIME,
  state,
});
