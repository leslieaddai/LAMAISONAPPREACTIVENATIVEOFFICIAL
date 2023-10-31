import types from '../types';

const initial_state = {
  warning:0
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Warning:
      const data = action.payload;
      return {
        warning:data.warning
      };
      break;
    default:
      return {...state};
      break;
  }
}
