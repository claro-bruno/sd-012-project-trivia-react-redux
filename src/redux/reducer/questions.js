const STATE_INITIAL = ({
  response_code: 0,
  results: [
    {
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correctAnswer: '',
      incorrectAnswers: [],
    },
  ],
});

const questions = (state = STATE_INITIAL, action) => {
  switch (action.type) {
  case 'QUESTION':
    return {
      ...state,
      results: [...action.value.results],
    };
  default:
    return state;
  }
};

export default questions;
