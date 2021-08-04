import { SAVE_QUESTS } from '../actions';

const INITIAL_STATE = {
  quests: [],
};

const quest = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTS:
    return { ...state, quests: action.quest };
  default:
    return state;
  }
};

export default quest;
