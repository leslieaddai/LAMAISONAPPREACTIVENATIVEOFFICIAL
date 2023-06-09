import types from '../types';

const initial_state = {
  Style: '',
  Id:'',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Styleadd:
      const data = action.payload;
      return {
        Style: data?.style,
        Id: data?.id,
      };
      break;
    default:
      return {...state};
      break;
  }
}
