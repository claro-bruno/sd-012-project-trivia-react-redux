export const ADD_ASSERTIONS = 'addAssertions';

export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: assertions,
});
