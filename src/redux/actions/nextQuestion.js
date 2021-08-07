export const NEXT_QUESTION = 'NEXT_QUESTION';
export const RESET_GAME = 'RESET_GAME';

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
