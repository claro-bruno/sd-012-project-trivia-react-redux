import { SCORE_UPDATE, GUESS_UPDATE, PROFILE_PICTURE } from './types';

export const scoreUpdate = (point) => ({ type: SCORE_UPDATE, point });

export const guessUpdate = (payload) => ({ type: GUESS_UPDATE, payload });

export const pictureUpdate = (payload) => ({ type: PROFILE_PICTURE, payload });
