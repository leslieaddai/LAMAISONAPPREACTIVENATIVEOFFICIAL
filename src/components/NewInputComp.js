import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {COLORS} from '../theme';

const NewInputComp = ({
  inputText,
  isWarningDetected,
  isLoading,
  isErrorDetected,
  value,
  handleOnChange,
  keyboardCustomType = 'default',
  resetPassword,
  multiline,
  maxLengthValue,
  resetNavigation,
  setPassword = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  // resetPassScreen
  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={[styles.container, isFocused && styles.containerFocused]}>
        {isFocused && <Text style={[styles.label]}>{inputText}</Text>}
        <TextInput
          maxLength={maxLengthValue}
          keyboardType={keyboardCustomType}
          multiline={multiline}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            isWarningDetected && {backgroundColor: '#FBBC0510'},
            isErrorDetected && {backgroundColor: '#E15A5A20'},
          ]}
          value={value}
          onChangeText={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={!isFocused ? inputText : ''}
          placeholderTextColor="#4D4D4D"
          secureTextEntry={setPassword}
        />
      </View>
      <View style={{flexDirection: 'row', width: '68%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          {isWarningDetected && (
            <View style={styles.warningDetected}>
              <Text style={styles.warningDetectedTextStyles}>Warning</Text>
            </View>
          )}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingTextStyles}>Loading</Text>
            </View>
          )}
          {isErrorDetected && (
            <View style={styles.errorDetectedContainer}>
              <Text style={styles.errorTextStyles}>Error</Text>
            </View>
          )}
        </View>
        {setPassword && resetPassword && (
          <TouchableOpacity
            onPress={resetNavigation}
            style={styles.remindPassword}>
            <Text style={styles.remindPasswordTextStyles}>Remind password</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  container: {
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    position: 'relative',
  },
  containerFocused: {
    borderColor: COLORS.main,
  },
  label: {
    position: 'absolute',
    top: 25,
    left: 25,
    fontSize: 12,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    color: COLORS.gray500,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 20,
    color: '#000',
  },
  inputFocused: {
    height: 55,
    borderColor: COLORS.main,
    paddingTop: Platform.OS === 'ios' ? 12 : 20,
  },
  remindPassword: {
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color: COLORS.main,
  },
  remindPasswordTextStyles: {
    color: COLORS.main,
  },
  warningDetected: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: COLORS.main,
  },
  warningContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    position: 'relative',
    backgroundColor: COLORS.warningPrimary,
  },
  warningDetectedTextStyles: {
    color: '#FE9B0E',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  loadingContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  loadingTextStyles: {
    color: '#ABBED1',
    fontSize: 12,
  },
  errorDetectedContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  errorTextStyles: {
    color: COLORS.errorPrimary,
    fontSize: 12,
  },
});

export default NewInputComp;
