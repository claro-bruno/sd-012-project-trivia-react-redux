import { RANKING } from '../actions';

const INITIAL_STATE = {
  players: [],
};

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RANKING:
    return {
      ...state,
      players: action.ranking,
    };
  default:
    return state;
  }
};

export default rankingReducer;
