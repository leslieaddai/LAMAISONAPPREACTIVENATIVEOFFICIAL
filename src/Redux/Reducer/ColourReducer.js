import types from '../types';

const initial_state = {
  Colour: "",
  Id:"",
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Colouradd:
      const data = action.payload;
      return {
        Colour: data?.colour,
        Id: data?.id,
      };
      break;
    default:
      return {...state};
      break;
  }
}
