import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  questions: [],
  isLoading: true,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      error: null,
      questions: action.payload,
      isLoading: false,
    };

  case GET_QUESTIONS_ERROR:
    return { ...state, error: action.error };

  default:
    return state;
  }
};

export default game;
