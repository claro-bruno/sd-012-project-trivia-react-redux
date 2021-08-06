export const GET_EMAIL = 'GET_EMAIL';
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
