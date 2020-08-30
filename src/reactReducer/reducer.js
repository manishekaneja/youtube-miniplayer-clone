import types from './types';
import _ from 'lodash';

function reducer(state, {type, payload}) {
  switch (type) {
    case types.SET_SELECTED_DIRECT:
      return {
        ...state,
        selectedImage: payload,
        isSelected: true,
      };
    case types.RANDOM_ID:
      return {
        ...state,
        random_id: payload,
      };
    case types.REMOVE_SELECTED:
      return {
        ...state,
        selectedImage: null,
        isSelected: false,
      };
    case types.SELECTED:
      const selectedImage = _.find(state.list, {id: payload});
      return {
        ...state,
        selectedImage: selectedImage,
        isSelected: true,
      };
    case types.ADD_NEW_ITEMS:
      return {
        ...state,
        list: state.list.concat(payload),
      };
    case types.NEW_LIST:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
}

export default reducer;
