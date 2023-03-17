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
import BottomComp from '../../components/bottomComp';
import BasketComp from '../../components/basketComp';

export default function BasketScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.basket}>Basket</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: hp2(4),
          paddingBottom: hp2(12),
        }}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <View style={styles.imageWrap}>
            <Image
              source={IMAGES.randomPic}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={{color: 'black', textTransform: 'uppercase'}}>
              wild chestnut X white penny loather
            </Text>
            <Text
              style={{
                color: 'black',
                textTransform: 'uppercase',
                marginVertical: hp2(4),
              }}>
              £299
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  fontSize: rfv(20),
                  marginRight: wp2(4),
                }}>
                1
              </Text>
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
        <BasketComp />
        <BasketComp />
        <BasketComp />
        <TouchableOpacity onPress={() => props.navigation.navigate('checkoutScreen')} style={styles.checkoutButton}>
          <Text style={styles.buttonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  basket: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: hp2(4),
    marginLeft: wp2(8),
  },
  imageWrap: {
    width: wp2(52),
    height: hp2(32),
    borderRadius: wp2(4),
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
    width: wp2(44),
    height: hp2(32),
    paddingHorizontal: wp2(3),
    paddingVertical: hp2(2),
  },
  checkoutButton: {
    width: wp2(36),
    height: hp2(5),
    backgroundColor: 'black',
    borderRadius: wp2(10),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp2(4),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(13),
  },
});
