export const GET_USER_INFO = 'GET_USER_INFO';

// Parâmetro info deve ser um objeto que contém as informações do usuário;
const getInfo = (info) => ({ type: GET_USER_INFO, info }); // action creator (função que retorna o objeto action);

export default getInfo;
