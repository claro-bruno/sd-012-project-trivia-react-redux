import { OPTIONS_DISABLED } from '../actions/optionsDisabled';

const INICIAL_STATE = {
  optionsDisabled: false,
};

const login = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case OPTIONS_DISABLED:
    return { ...state, optionsDisabled: true };
  default:
    return state;
  }
};

export default login;
