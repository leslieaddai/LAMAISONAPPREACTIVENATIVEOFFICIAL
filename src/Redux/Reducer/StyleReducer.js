import types from '../types';

const initial_state = {
  Style: "",
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Styleadd:
      const data = action.payload;
      return {
        Style: data
      };
      break;
    default:
      return {...state};
      break;
  }
}
