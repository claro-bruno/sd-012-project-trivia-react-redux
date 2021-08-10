import { SAVE_CONFIGS } from '../actions/settingsActions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CONFIGS:
    return {
      ...state,
      category: action.payload.category,
      difficulty: action.payload.difficulty,
      type: action.payload.type,
    };
  default:
    return state;
  }
};

export default settings;
