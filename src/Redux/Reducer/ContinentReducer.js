import types from '../types';

const initial_state = {
  Continent: "",
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Continetadd:
      const data = action.payload;
      return {
       Continent: data
      };
      break;
    default:
      return {...state};
      break;
  }
}
