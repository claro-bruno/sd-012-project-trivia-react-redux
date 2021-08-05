export const ACTION_LOGIN = 'ACTION_LOGIN';

export const actionLogin = (nome, email) => ({ type: ACTION_LOGIN, nome, email });

export function fetchLoginAction(nome, email) {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then(({ token }) => {
      localStorage.token = token;
      return dispatch(actionLogin(nome, email));
    })
    .catch(console.error);
}
