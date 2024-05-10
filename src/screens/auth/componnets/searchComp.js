import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native'; // Import Image component
import { ICONS, IMAGES, wp2 } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Icon } from 'react-native-paper';

const SearchComponnetTextEditCont = ({
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  keyboardType,
  mystyles
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.searchSection, mystyles, isFocused && styles.focused]}>
      {/* Use Image component to render the search icon */}
      <ICONS.MaterialIcons 
        name="search" 
        size={wp2(8)} 
        color={ isFocused ?'#4D50E0':''}
        style={styles.searchIcon}/>
      <TextInput
        style={styles.inputTxt}
        placeholder={placeholder || 'Password'}
        secureTextEntry={isPassword}
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType} // Add keyboardType prop
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    marginRight: wp2(2), // Adjust as needed
  },
  searchSection: {
    flexDirection: 'row', // Align icon and text input horizontally
    alignItems: 'center', // Center vertically
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
    paddingHorizontal: wp2(2), // Adjust as needed
    borderWidth: 1,
    borderColor: '#D4D4D4',
  },
  inputTxt: {
    flex: 1,
    color: '#4D4D4D',
    fontSize: RFValue(13),
    fontWeight: '400',
  },
  focused: {
    borderColor: '#4D50E0', // Change border color when focused
  },
});

export default SearchComponnetTextEditCont;
