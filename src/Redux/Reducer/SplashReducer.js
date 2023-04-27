import types from '../types';

const initial_state = {
  showSplash: true,
  showWelcome: true,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.HideSplash:
      return {
        ...state, showSplash: false
      };
      break;
    case types.ShowSplash:
      return {
        ...state, showSplash: true
      };
      break;
    case types.HideWelcome:
      return {
        ...state, showWelcome: false
      };
      break;
    case types.ShowWelcome:
      return {
        ...state, showWelcome: true
      };
      break;
    default:
      return {...state};
      break;
  }
}
