import { CHANGE_SETTINGS } from "../actions";

const INITIAL_STATE = {
  difficulty: '',
  type: '',
  category: '',
}

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_SETTINGS:
    return {
      ...state,
      difficulty: action.difficulty,
      type: action.tipo,
      category: action.category,
    };
  default:
    return state;
  }
};

export default settingsReducer;