import { SCORE_UPDATE } from './types';

const scoreUpdate = (point) => ({ type: SCORE_UPDATE, point });

export default scoreUpdate;
