import {store} from '../Redux/Reducer';
import axios from 'react-native-axios';
import { RegisterUrl } from './Urls';
import { useDispatch } from 'react-redux';

let statusCode = 'ghjkl';

export const errorHandler = err => {
  let msg = 'Network Request Failed.';
  if (parseInt(err?.response?.status) === 422) {
    msg = String(Object.values(err?.response?.data['errors'])[0][0]);
  } else {
    msg = err?.response?.data?.error;
  }
  return msg;
};

// if(error.response.data.message === 'Call to a member function tokens() on null'){
//   dispatch({
//     type: types.Clearcart,
//   });
//   dispatch({
//     type: types.Logout,
//   });
// }