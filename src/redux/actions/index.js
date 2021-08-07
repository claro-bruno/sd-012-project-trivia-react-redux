export const GET_EMAIL = 'GET_EMAIL';
export const GET_NAME = 'GET_NAME';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_LOADING = 'GET_LOADING';
export const ISDISABLED = 'IS_DISABLED';
export const TIMER = 'TIMER';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';

export const actionEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

export const actionName = (user) => ({
  type: GET_NAME,
  payload: user,
});

export const actionToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const loadingToken = (loading) => ({
  type: GET_LOADING,
  loading,
});

export const actionDisabled = (isDisabled) => ({
  type: ISDISABLED,
  isDisabled,
});

export const actionTimer = (timer) => ({
  type: TIMER,
  timer,
});

export const actionScore = (score) => ({
  type: SCORE,
  score,
});

export const actionAssertions = (assertions) => ({
  type: ASSERTIONS,
  assertions,
});
