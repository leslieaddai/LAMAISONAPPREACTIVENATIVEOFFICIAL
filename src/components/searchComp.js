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
import fonts from '../theme/fonts';
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
} from '../theme';

export default function SearchComp(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={IMAGES.lookbook}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text}>arrivals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: wp2(2),
    width: wp2(28),
    marginHorizontal: wp2(2),
    marginVertical: hp2(2),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: wp2(28),
    height: hp2(18),
    overflow: 'hidden',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: rfv(11),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
