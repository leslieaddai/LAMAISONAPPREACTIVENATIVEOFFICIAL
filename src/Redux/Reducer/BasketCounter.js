import types from '../types';

const initial_state = {
  count: 0
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.AddToBasket:
      return {count:state.count+1};
      break;
    case types.RemoveFromBasket:
      return{count:state.count-1};
      break;
    default:
      return {...state};
      break;
  }
}
