export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (payload) => ({
  type: 'USER_LOGIN',
  payload,
});

export const REQUEST_API = 'REQUEST_API';
export const requestAPI = () => ({
  type: 'REQUEST_API',
});

export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const requestAPISuccess = (payload) => ({
  type: 'REQUEST_API_SUCCESS',
  payload,
});

// export const fetchAPI = () => async (dispatch) => {
// //   try {
//   const response = await fetch('https://opentdb.com/api_token.php?command=request');
//   const result = await response.json();
//   await dispatch(requestAPI(result.token));
// //   } catch (error) {
// //     dispatch(requestAPI('ERROR!!!'));
// //   }
// };

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((result) => result.json())
    .then(({ token }) => dispatch(requestAPISuccess(token)))
    .catch(() => console.log('error'));
};
