import types from '../types';

const initial_state = {
  id: '',
  device_id: '',
  ip_address:'',
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LoginGuest:
      const data = action.payload;
      return {
        id: data?.user?.id,
        device_id: data?.user?.device_id,
        ip_address:data?.user?.ip_address,
      };
      break;
    case types.LogoutGuest:
      return {
        id: '',
        device_id: '',
        ip_address:'',
      };
      break;
    default:
      return {...state};
      break;
  }
}
