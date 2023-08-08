import types from '../types';

const initial_state = {
  count: '0',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.OrderCount:
      const data = action.payload;
      return {
        count: data,
      };
      break;
    default:
      return {...state};
      break;
  }
}
