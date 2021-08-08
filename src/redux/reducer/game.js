import {
  GET_TRIVIA,
  AWAIT_TRIVIA,
  ERR_TRIVIA,
  UPDATE_SCORE,
  TIMER_ACTION,
  TIMER_RESTART_CHANGE,
  RESTORE_STORE,
} from '../action';

const INITIAL_GAME_STATE = {
  response: 3,
  questions: [],
  loading: true,
  err: '',
  score: 0,
  assertions: 0,
  timer: 30,
  restartTimer: false,
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
      assertions: state.assertions + 1,
    };
  case TIMER_ACTION:
    return {
      ...state,
      timer: action.time,
    };
  case TIMER_RESTART_CHANGE:
    return {
      ...state,
      restartTimer: !state.restartTimer,
    };
  case RESTORE_STORE:
    return INITIAL_GAME_STATE;
  default:
    return state;
  }
}

export default game;
