import types from '../types';

const initial_state = {
  Price: "",
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Priceadd:
      const data = action.payload;
      return {
       Price: data
      };
      break;
    default:
      return {...state};
      break;
  }
}
