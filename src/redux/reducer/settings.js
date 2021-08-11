import { CHANGE_SETTINGS, RESET_SETTINGS } from '../actions';

const INITIAL_STATE = {
  difficulty: '',
  type: '',
  category: '',
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_SETTINGS:
    return {
      ...state,
      difficulty: action.difficulty,
      type: action.tipo,
      category: action.category,
    };
  case RESET_SETTINGS:
    return { ...INITIAL_STATE };
  default:
    return state;
  }
};

export default settingsReducer;
