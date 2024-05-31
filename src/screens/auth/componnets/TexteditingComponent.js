import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {wp2} from '../../../theme';
import {RFValue} from 'react-native-responsive-fontsize';

const TextEditingComponent = ({
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  keyboardType,
  mystyles
}) => {
  return (
    <View style={[styles.inputBox,mystyles]}>
      <TextInput
        style={styles.inputTxt}
        placeholder={placeholder || 'Password'}
        secureTextEntry={isPassword}
        placeholderTextColor={'#4D4D4D'}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType} // Add keyboardType prop
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputBox: {
    // width: 374,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: 2,
    alignSelf: 'center',
    // padding: '16px 20px', // Padding top, right, bottom, left
    borderWidth: 1,
    borderColor: '#D4D4D4',
    // position: 'absolute',
  },
  inputTxt: {
    flex: 1,
    color: '#4D4D4D',
    paddingHorizontal: wp2(2),
    fontSize: RFValue(16),
    fontWeight: '400',
  },
});

export default TextEditingComponent;
