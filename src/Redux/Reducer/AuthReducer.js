import types from '../types';

const initial_state = {
  userData: {},
  token: '',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Login:
      const data = action.payload;
      return {
        userData: data.user,
        token: data.access_token,
      };
      break;
    case types.Logout:
      return {
        userData: {},
        token: '',
      };
      break;
    case types.UpdateProfile:
      const updatedData = action.payload;
      return {...state, userData: updatedData.user};
      break;
    default:
      return {...state};
      break;
  }
}
