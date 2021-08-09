import { CHANGE_SETTINGS } from '../action';

const INITIAL_STATE = {
  amount: '5',
  category: 'any',
  difficulty: 'any',
  type: 'any',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_SETTINGS:
    return {
      ...state,
      amount: action.settings.amount,
      category: action.settings.category,
      difficulty: action.settings.difficulty,
      type: action.settings.type,
    };
  default:
    return state;
  }
};

export default settings;
