import {store} from '../Redux/Reducer';
import axios from 'react-native-axios';
import {RegisterUrl} from './Urls';
import {useDispatch} from 'react-redux';
import {IMAGES, hp2} from '../theme';
import {Image} from 'react-native';
import {showMessage} from 'react-native-flash-message';

let statusCode = 'ghjkl';

export const errorHandler = err => {
  console.log();
  console.log('5555 error happened ');
  console.log('Request URL:', err.config.url); // Log the request URL
  console.log(err.response.data);
  let msg = 'Network Request Failed.';

  if (parseInt(err?.response?.status) === 422) {
    msg = String(Object.values(err?.response?.data['errors'])[0][0]);
  } else {
    msg = err?.response?.data?.error;
  }
  return msg;
};

export const OneSignalMessage = (message, description) => {
  showMessage({
    type: 'success',
    icon: props => (
      <Image
        source={IMAGES.logoblack}
        style={{width: 40, height: 40, marginHorizontal: 20}}
        resizeMode="contain"
      />
    ),
    message: message,
    description: description,
    floating: true,
    backgroundColor: 'white',
    color: 'black',
    style: {
      alignItems: 'center',
      marginTop: Platform.OS === 'android' && hp2(4),
    },
  });
};

// if(error.response.data.message === 'Call to a member function tokens() on null'){
//   dispatch({
//     type: types.Clearcart,
//   });
//   dispatch({
//     type: types.Logout,
//   });
// }
