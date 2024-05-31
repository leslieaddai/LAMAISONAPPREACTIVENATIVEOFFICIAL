import React from 'react';
import {View, Image, Text} from 'react-native';
import {IMAGES, hp2} from '../../../theme';

const LogoComponent = prop => {
  return (
    <View>
      <View style={styles.logoWrap}>
        <Image
          source={IMAGES.logowhite}
          style={{width: '20%', height: '65%'}}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.signinText}>{prop.txt}</Text>
    </View>
  );
};

const styles = {
  logoWrap: {
    // width: wp2(30),
    height: hp2(10),
    // paddingBottom:100,
    // overflow: 'hidden',
    marginTop: hp2(10),
    marginBottom: hp2(4),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  signinText: {
    color: 'black',
    fontSize: 22, // Assuming rfv() returns the font size in pixels
    fontFamily: 'Poppins-Regular', // Use the Poppins font
    fontWeight: '400', // Font weight 400
    lineHeight: 33, // Line height 33px
    marginVertical: 8, // Adjust margin as needed
    marginTop: Platform.OS === 'ios' ? 0 : 4, // Adjust margin top based on platform
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 50,
  },
};

export default LogoComponent;
