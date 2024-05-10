import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ContinueButton = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        width: '90%',paddingHorizontal:10 ,
        height: 50,
        backgroundColor: '#5D5FEF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
   
      },
      buttonText: {
        fontSize: 16,
        // fontWeight: '400',
        color: 'white',
        fontFamily: 'Poppins-Medium', // Assuming "Poppins-Regular" is the name of your font
    
    
      },
});

export default ContinueButton;
