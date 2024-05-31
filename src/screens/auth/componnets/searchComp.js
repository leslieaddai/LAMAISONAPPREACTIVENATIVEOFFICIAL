import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Image} from 'react-native'; // Import Image component
import {ICONS, IMAGES, wp2, COLORS} from '../../../theme';
import {RFValue} from 'react-native-responsive-fontsize';
import Search from '../../../assets/icons/search.svg';

const SearchComponnetTextEditCont = ({
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  keyboardType,
  mystyles,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.searchSection, mystyles, isFocused && styles.focused]}>
      {/* Use Image component to render the search icon */}
      {/* <ICONS.MaterialIcons
        name="search"
        size={wp2(8)}
        color={isFocused ? '#4D50E0' : ''}
        style={styles.searchIcon}
      /> */}
      <Search
        width={20}
        height={20}
        color={isFocused ? COLORS.main : COLORS.gray}
        style={{marginRight: 10}}
      />
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
    width: '100%',
    maxWidth: 317,
    height: 45,
    // borderWidth: 1,
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
    borderColor: '#D4D4D4',
    backgroundColor: COLORS.gray50,
  },
  inputTxt: {
    flex: 1,
    color: '#4D4D4D',
    fontSize: RFValue(13),
    fontWeight: '400',
    maxWidth: 317,
  },
  focused: {
    borderColor: '#4D50E0', // Change border color when focused
  },
});

export default SearchComponnetTextEditCont;
