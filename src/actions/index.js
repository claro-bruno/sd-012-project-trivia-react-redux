export const GET_EMAIL = 'GET_EMAIL';

// action para pegar o email e nome do login
export function loginAction(emailInput, nameInput) {
  return {
    type: GET_EMAIL,
    name: nameInput,
    email: emailInput,
  };
}
