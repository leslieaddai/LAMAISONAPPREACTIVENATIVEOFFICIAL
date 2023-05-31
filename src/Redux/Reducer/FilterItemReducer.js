import types from '../types';

const initial_state = {
  Item: "",
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Itemadd:
      const data = action.payload;
      return {
       Item: data
      };
      break;
    default:
      return {...state};
      break;
  }
}
