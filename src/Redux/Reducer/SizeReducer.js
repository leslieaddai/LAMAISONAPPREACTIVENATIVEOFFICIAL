import types from '../types';

const initial_state = {
  Size: '',
  Id: '',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Sizeadd:
      const data = action.payload;
      return {
       Size: data?.size,
       Id: data?.id,
      };
      break;
    default:
      return {...state};
      break;
  }
}
