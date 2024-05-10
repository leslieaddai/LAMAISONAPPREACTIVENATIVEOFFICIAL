import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import { IMAGES } from '../../../theme';

const CustomDatePicker = ({ birthday, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.textBox}>
        {birthday == null
          ? `Birthday`
          : ` ${birthday.getDate()} - ${birthday.getMonth() + 1} - ${birthday.getFullYear()}`}
      </Text>
      <Image source={IMAGES.calender} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
  marginHorizontal:20,
  marginBottom:10,
    borderRadius: 10,
    borderWidth: 1,
    // padding: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#D4D4D4',
    flexDirection: 'row', // To align icon and text horizontally
    justifyContent: 'space-between', // To create space between icon and text
    alignItems: 'center', // To center items vertically
  },
  textBox: {
    // Adjust text styles here
  },
  icon: {
    // Adjust icon styles here
  },
});

export default CustomDatePicker;
