import { Platform } from 'react-native';
import {showMessage} from 'react-native-flash-message';
import { hp2 } from '../theme';

export const errorMessage = description => {
  showMessage({
    type: 'danger',
    icon: 'auto',
    message: 'Warning',
    description: description,
    floating: true,
    backgroundColor: 'red',
    style: {alignItems: 'center',marginTop:Platform.OS ==='android'&&hp2(4)},
  });
};

export const successMessage = description => {
  showMessage({
    type: 'success',
    icon:'auto',
    message: 'Success',
    description: description,
    floating: true,
    backgroundColor: '#039C8A',
    style: {alignItems: 'center',marginTop:Platform.OS ==='android'&&hp2(4)},
  });
};
