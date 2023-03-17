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
import { useNavigation } from '@react-navigation/native';

export default function Lookbook(props) {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity  onPress={() => navigation.navigate('lookbookScreen')} style={styles.lookbook}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(28)}}>
          LOOKBOOK
        </Text>
      </TouchableOpacity>
      <View style={styles.galaryContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lookbook: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp2(2),
  },
  galaryContainer: {
    width: wp2(90),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  imageContainer: {
    width: wp2(28),
    height: hp2(12),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
});
