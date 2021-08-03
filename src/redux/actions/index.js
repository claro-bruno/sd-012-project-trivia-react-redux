import md5 from 'crypto-js/md5';

const getGravatar = (payload) => ({
  type: 'FETCH_SUCESS',
  payload,
});

const fetchGravatar = (hash) => {
  const fechamento = md5(strtolower(trim(hash)));
  return async (dispatch) => {
    const retorno = await fetch(`https://www.gravatar.com/avatar/${fechamento}`);
    const resolve = await retorno.json();
    dispatch(getGravatar(resolve));
  };
};

export default fetchGravatar;
