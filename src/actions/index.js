export const GET_EMAIL = 'GET_EMAIL';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_LOAD = 'GET_TOKEN_LOAD';
export const GET_TIMER = 'GET_TIMER';

// action para pegar o email e nome do login
export function loginAction(emailInput, nameInput) {
  return {
    type: GET_EMAIL,
    name: nameInput,
    email: emailInput,
  };
}

export function timerAction(timeValue, disableValue) {
  return {
    type: GET_TIMER,
    time: timeValue,
    disable: disableValue,
  };
}

export function getTokenAction() {
  return {
    type: GET_TOKEN,
  };
}

export function getTokenActionSucess(payload) {
  return {
    type: GET_TOKEN_SUCCESS,
    payload,
    load: false,
  };
}

export function getTokenActionLoading() {
  return {
    type: GET_TOKEN_LOAD,
  };
}

export const fetchAPItoken = () => async (dispatch) => {
  dispatch(getTokenAction());
  const fetchGet = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await fetchGet.json();
  const { token } = response;
  dispatch(getTokenActionSucess(token));
};
