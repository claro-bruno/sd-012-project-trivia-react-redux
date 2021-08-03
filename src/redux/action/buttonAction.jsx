export const BUTTON_PLAY = 'BUTTON_PLAY';

export const buttonPlay = (event) => ({
  type: BUTTON_PLAY, click: event,
});

export const fetchClick = () => async (dispatch) => {
  const API = 'https://opentdb.com/api_token.php?command=request';
  const fetchAPI = await fetch(API);
  const responseAPI = fetchAPI.json();
  console.log(responseAPI);
  dispatch(buttonPlay(responseAPI));
};
