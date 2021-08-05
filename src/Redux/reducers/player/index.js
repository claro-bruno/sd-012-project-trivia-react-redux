import { GET_USER_INFO } from './actions/getEmail';
import { SUM_SCORE } from './actions/sumScore';

// Funções para auxiliar reducer e localStorage;
const changePersonalInfo = (state, action) => ({
  ...state,
  name: action.info.name,
  gravatarEmail: action.info.email,
  score: 0,
  assertions: 0,
});

const changeScore = (state, action) => ({
  ...state,
  score: state.score + action.points,
  assertions: state.assertions + 1,
});

// Função para auxiliar no setItem do localStorage;
const saveAssistent = (state, action, callback) => localStorage
  .setItem('state', JSON.stringify({ player: callback(state, action) }));

// Recebendo "state" do localStorage;
const savedPlayer = JSON.parse(localStorage.getItem('state'));

// Estado incial do reducer "player";
const INITIAL_STATE = {
  // Condicional para pegar informações caso estejam salvas;
  name: savedPlayer ? savedPlayer.player.name : '',
  assertions: savedPlayer ? savedPlayer.player.assertions : 0,
  score: savedPlayer ? savedPlayer.player.score : 0,
  gravatarEmail: savedPlayer ? savedPlayer.player.gravatarEmail : '',
};

// Reducer "player";
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFO:
    saveAssistent(state, action, changePersonalInfo);
    return changePersonalInfo(state, action);
  case SUM_SCORE:
    saveAssistent(state, action, changeScore);
    return changeScore(state, action);
  default:
    return state;
  }
};

export default player;
