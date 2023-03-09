import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../../theme/fonts';
import {
  IMAGES,
  ICONS,
  COLORS,
  SIZES,
  screenHeight,
  screenWidth,
  wp2,
  hp2,
  getFont,
  FONTS,
} from '../../theme';

export default function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Hi ICEY.B</Text>
      <View style={styles.imgWrap}>
        <Image
          source={IMAGES.randomProfile}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <Text style={[styles.text,{fontSize:rfv(32),textAlign:'center'}]}>Welcome to{'\n'}the La Maison App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imgWrap: {
    width: wp(50),
    height: wp(60),
    overflow: 'hidden',
    borderRadius: wp(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text:{
    color:'black',
    fontWeight:'700',
    fontSize:rfv(40),
  },
});
