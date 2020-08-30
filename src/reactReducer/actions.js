import types from './types';

const actions = {
  unSet: () => ({
    type: types.REMOVE_SELECTED,
  }),
  onRefresh: (list) => ({
    type: types.NEW_LIST,
    payload: list,
  }),
  gotNewItems: (list) => ({
    type: types.ADD_NEW_ITEMS,
    payload: list,
  }),
  tilePressed: (index) => ({
    type: types.SELECTED,
    payload: index,
  }),
  setRandomId: (randomId) => ({
    type: types.RANDOM_ID,
    payload: randomId,
  }),
  setImageDirect: (imageObject) => ({
    type: types.SET_SELECTED_DIRECT,
    payload: imageObject,
  }),
};

Object.freeze(actions);
export default actions;
