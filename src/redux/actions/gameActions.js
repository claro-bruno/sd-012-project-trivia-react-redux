import { SCORE_UPDATE } from './types';

const scoreUpdate = (point, assertion) => ({ type: SCORE_UPDATE, point, assertion });

export default scoreUpdate;
