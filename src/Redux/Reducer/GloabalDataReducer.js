import types from '../types';

const initial_state = {
  globalData: {}
};
export default function (state = initial_state, action) {
    switch (action.type) {
      case types.Applaunch:
        const data = action.payload;
        return {
            globalData: data,
        };
        break;
        case types.AppClose:
      return {
        globalData: {},
      };
      break;
      default:
      return {...state};
      break;
  }
}