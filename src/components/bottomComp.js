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
import { useNavigation } from '@react-navigation/native';

export default function BottomComp(props) {
  //console.log(props);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity   onPress={() => navigation.navigate('FTS100')}  style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.fts}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity   onPress={() => navigation.navigate('searchScreen')} style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.search}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.iconText}>Discovery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('homeScreen')} style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.logosmall}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('basketScreen')} style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.bag}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.iconText}>Basket</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('editorProfileScreen')} style={{alignItems: 'center'}}>
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
    width: wp2(100),
    height: hp2(10),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
  },
  iconWrap: {
    width: wp2(10),
    height: wp2(10),
    overflow: 'hidden',
  },
  iconText: {
    color: '#A1A1A1',
    fontWeight: '700',
  },
});
