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

export default function BottomComp(props) {
  //console.log(props);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.fts}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.search}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.iconText}>Discovery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.logosmall}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.bag}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.iconText}>Basket</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.profileicon}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.iconText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(10),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    overflow: 'hidden',
  },
  iconText: {
    color: '#A1A1A1',
    fontWeight: '700',
  },
});
