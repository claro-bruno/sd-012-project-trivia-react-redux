
import { REQUEST_TRIVIA } from '../actions';
import { CURRENT_SCORE } from '../actions';

const INTIAL_STATE = {
  questions: [],
  difficulty: 'easy',
  currentScore: 0,
};

const gameReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TRIVIA:
      return {
        ...state, questions: action.payload,
      };
      
    case CURRENT_SCORE:
      return { ...state, currentScore: action.payload };

    default:
      return state;
    }
  };

export default gameReducer;
