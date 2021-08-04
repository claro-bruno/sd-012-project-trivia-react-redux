import store from '../redux/store/store';

const saveLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify({ player: store.getState().player }));
};

export default saveLocalStorage;
