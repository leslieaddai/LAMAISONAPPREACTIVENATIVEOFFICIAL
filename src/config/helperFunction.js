import {store} from '../Redux/Reducer';
import axios from 'react-native-axios';
import { RegisterUrl } from './Urls';
import { useDispatch } from 'react-redux';

let statusCode = 'ghjkl';

export const errorHandler = err => {
  let msg = 'Network Request Failed.';
  if (parseInt(err.response.status) === 422) {
    msg = err.response.data.error;
  } else {
    msg = err.response.data.error;
  }
  return msg;
};