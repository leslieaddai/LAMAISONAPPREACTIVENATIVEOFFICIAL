import {store} from '../Redux/Reducer';
import axios from 'react-native-axios';
import { RegisterUrl } from './Urls';
import { useDispatch } from 'react-redux';
import { IMAGES } from '../theme';
import { Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';

let statusCode = 'ghjkl';

export const errorHandler = err => {
  let msg = 'Network Request Failed.';
  // console.log(err?.response)
  if (parseInt(err?.response?.status) === 422) {
    msg = String(Object.values(err?.response?.data['errors'])[0][0]);
  } else {
    msg = err?.response?.data?.error;
  }
  return msg;
};
export const OneSignalMessage = (message,description) => {
  showMessage({
    type: 'success',
    icon: props => <Image source={IMAGES.logo} style={{ width:40,height:40,marginHorizontal:20}}/>,
    message: message,
    description: description,
    floating: true,
    backgroundColor: 'white',
    color:'black',
    style: {alignItems: 'center',marginTop:Platform.OS ==='android'&&hp2(4)},
  });
}

// if(error.response.data.message === 'Call to a member function tokens() on null'){
//   dispatch({
//     type: types.Clearcart,
//   });
//   dispatch({
//     type: types.Logout,
//   });
// }