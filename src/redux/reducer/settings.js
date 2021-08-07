import { APPLY_SETTINGS } from '../actions/settings';

const INITIAL_STATE = {
  url: 'https://opentdb.com/api.php?amount=5&encode=base64',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case APPLY_SETTINGS:
    return { ...state, url: action.url };
  default:
    return state;
  }
};

export default settings;
