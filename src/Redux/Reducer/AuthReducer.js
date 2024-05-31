import types from '../types';

const initial_state = {
  userData: {},
  token: '',
  warning: 0,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.Login:
      const data = action.payload;
      return {
        userData: data.user,
        token: data.access_token,
        warning: data.warning,
      };
      break;
    case types.Logout:
      return {
        userData: {},
        token: '',
        warning: 0,
      };
      break;
    case types.UpdateProfilePicture:
      const Picture = action.payload;
      return {...state, userData: {...state.userData, profile_image: Picture}};
      break;
    case types.UpdateShippingInfo:
      const Desc = action.payload;
      return {
        ...state,
        userData: {
          ...state?.userData,
          Shipping_information: {
            ...state?.userData?.Shipping_information,
            description: Desc,
          },
        },
      };
      break;
    default:
      return {...state};
      break;
  }
}
