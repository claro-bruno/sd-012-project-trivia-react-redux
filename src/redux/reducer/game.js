import { GET_TRIVIA, AWAIT_TRIVIA, ERR_TRIVIA } from '../action';

const INITIAL_GAME_STATE = {
  response: 3,
  questions: [],
  loading: true,
  err: '',
};

function game(state = INITIAL_GAME_STATE, action) {
  switch (action.type) {
  case AWAIT_TRIVIA:
    return ({
      ...state,
      loading: true,
    });
  case GET_TRIVIA:
    return ({
      ...state,
      response: action.response,
      questions: action.questions,
      loading: false,
    });
  case ERR_TRIVIA:
    return ({
      ...state,
      err: action.err,
    });
  default:
    return state;
  }
}

export default game;
