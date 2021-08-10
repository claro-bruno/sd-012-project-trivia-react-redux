export const SET_PARAMETERS = 'SET_PARAMS';
export const setParameters = (payload) => ({
  type: SET_PARAMETERS,
  payload,
});

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
const receiveCategories = (payload) => ({
  type: RECEIVE_CATEGORIES,
  payload,
});

export const RECEIVE_CATEGORIES_ERROR = 'RECEIVE_CATEGORIES_ERROR';
const receiveError = (payload) => ({
  type: RECEIVE_CATEGORIES_ERROR,
  payload,
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(requestCategories());
  const URL = 'https://opentdb.com/api_category.php';
  try {
    const categoriesAPI = await fetch(URL);
    const categoriesJSON = await categoriesAPI.json();
    dispatch(receiveCategories(categoriesJSON.trivia_categories));
  } catch (e) {
    receiveError(e);
  }
};
