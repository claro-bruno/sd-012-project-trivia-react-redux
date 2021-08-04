import { SAVE_QUESTS, SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  quests: [],
  isLoading: true,
  token: '',
};

const quest = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTS:
    return { ...state, quests: action.quest, isLoading: false };
  case SAVE_TOKEN:
    return { ...state, token: action.token };
  default:
    return state;
  }
};

export default quest;
