export const NEXT_QUESTION = 'NEXT_QUESTION';
export const RESET_QUESTIONS = 'RESET_QUESTIONS';

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const resetQuestions = () => ({
  type: RESET_QUESTIONS,
});
