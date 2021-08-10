export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const ADD_STORAGE = 'ADD_STORAGE';

export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: assertions,
});

export const addStorage = (userData, assertions) => ({
  type: ADD_STORAGE,
  payload: userData,
  assertions,
});
