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
import {useNavigation} from '@react-navigation/native';

export default function BasketComp(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('imageViewScreen')}
        style={styles.imageWrap}>
        <Image
          source={IMAGES.randomPic}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleTxt}>wild chestnut X white penny loather</Text>
        <Text style={styles.priceTxt}>£299</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.quantityTxt}>1</Text>
          <TouchableOpacity style={styles.button}>
            <ICONS.Entypo name="plus" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: 'white', borderColor: 'black'},
            ]}>
            <ICONS.Entypo name="minus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp2(4),
  },
  titleTxt: {color: 'black', textTransform: 'uppercase'},
  priceTxt: {
    color: 'black',
    textTransform: 'uppercase',
  },
  quantityTxt: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: rfv(20),
    marginRight: wp2(4),
  },

  imageWrap: {
    width: wp2(38),
    height: hp2(18),
    borderRadius: wp2(3),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: wp2(12),
    height: wp2(10),
    backgroundColor: 'black',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    width: wp2(58),
    height: hp2(18),
    paddingHorizontal: wp2(3),
    paddingVertical: hp2(0.5),
    justifyContent: 'space-between',
  },
});
