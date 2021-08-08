import {
  GET_TRIVIA,
  AWAIT_TRIVIA,
  ERR_TRIVIA,
  UPDATE_SCORE,
  UPDATE_RIGHT_QUESTIONS,
  TIMER_ACTION,
} from '../action';

const INITIAL_GAME_STATE = {
  response: 3,
  questions: [],
  loading: true,
  err: '',
  score: 0,
  rightQuestions: 0,
  timer: 30,
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
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case UPDATE_RIGHT_QUESTIONS:
    return {
      ...state,
      rightQuestions: state.score + 1,
    };
  case TIMER_ACTION:
    return {
      ...state,
      timer: action.time,
    };
  default:
    return state;
  }
}

export default game;
