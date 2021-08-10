const INITIAL_STATE = {
  score: 0,
  correctAnswers: 0,
};

const feedback = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return {
      ...state,
    };
  }
};

export default feedback;
