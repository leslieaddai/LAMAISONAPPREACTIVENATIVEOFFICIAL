import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { hp2 } from '../../../theme';

const MyCheckBox = ({ value, onValueChange }) => {
  return (
    <CheckBox
      onTintColor="black"
      tintColor="black"
      onFillColor="black"
      onCheckColor="white"
      boxType="square"
      value={value}
      onValueChange={onValueChange}
      tintColors={{true: 'black', false: 'black'}}
      style={{
        marginBottom: Platform.OS === 'android' ? hp2(-0.5) : hp2(0),
        borderColor: '#D4D4D8', // Set the border color here
        borderWidth: 1, // Optional: You can adjust the border width if needed
      }}
    />
  );
};

export default MyCheckBox;
