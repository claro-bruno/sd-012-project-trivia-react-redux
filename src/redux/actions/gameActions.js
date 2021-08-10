import { SCORE_UPDATE, GUESS_UPDATE } from './types';

export const scoreUpdate = (point) => ({ type: SCORE_UPDATE, point });

export const guessUpdate = (payload) => ({ type: GUESS_UPDATE, payload });
