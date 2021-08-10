import store from '../redux/store/store';

const saveLocalStorage = () => {
  console.log(store.getState());
  localStorage.setItem('state', JSON.stringify(
    {
      player: store.getState().player,
    },
  ));
};

export default saveLocalStorage;
