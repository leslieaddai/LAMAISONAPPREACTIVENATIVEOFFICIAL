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
    case types.UpdateProfilePicture:
      const Picture = action.payload;
      return {...state, userData: {...state.userData,profile_image:Picture}};
      break;
    case types.UpdateShippingInfo:
      const Desc = action.payload;
      return {...state, userData: {...state.userData,Shipping_information:{...state.userData.Shipping_information,description:Desc}}};
      break;
    default:
      return {...state};
      break;
  }
}
