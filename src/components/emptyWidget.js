import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { IMAGES, hp2 } from '../theme';
import fonts from '../theme/fonts';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import ContinueButton from '../screens/auth/componnets/ContinueBtn';

const EmptyWidget=  ({ image,upperText, lowerText, buttonText, onButtonPress }) => {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={image}
          style={styles.image}
        />

<Text style={styles.bigTxt}>{upperText}</Text>

        <Text style={styles.text}>{lowerText}</Text>

  <ContinueButton
    text={buttonText}
    onPress={onButtonPress}
    style={{ width: '100%', paddingHorizontal:hp2(14) }}
  />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp2(10), // adjust as needed
width:'100%',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 140,
  },
  bigTxt: {
    paddingTop:40,
    fontFamily: fonts.PoppinsBold,
    // fontWeight: '400',
    fontSize: rfv(17),
    textAlign: 'center',
    color: 'black',
  },
  text: {
    paddingTop:0,
    fontFamily: fonts.PoppinsRegular,
    // fontWeight: '400',
    fontSize: rfv(13),
    textAlign: 'center',
    color: '#A1A1AA',
    textAlign: 'center',
    marginBottom: 30, // adjust as needed
  },
});

export default EmptyWidget
