import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Animated,
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
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import BottomComp from '../../components/bottomComp';

export default function CheckoutScreen(props) {
  const [continueButton, setContinueButton] = useState('continue');

  const scrollX = new Animated.Value(0);

  const textBox = (place) => {
    return (
      <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={place} keyboardType={place=='CARD NUMBER' ? 'number-pad' : 'default'} />
      </View>
    );
  };

  const textBox2 = () => {
    return (
      <>
        {textBox('EMAIL')}
        {textBox('NAME ON CARD')}
        {textBox('CARD NUMBER')}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            width: wp2(80),
          }}>
          <View style={[styles.inputBox, {width: wp2(48)}]}>
            <TextInput style={styles.textInput} placeholder="EXPIRY DATE MM/YY" />
          </View>
          <View style={[styles.inputBox, {width: wp2(28)}]}>
            <TextInput style={styles.textInput} placeholder="CVV" keyboardType='number-pad' />
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.checkout}>Check Out</Text>
        <ICONS.Entypo name="lock" size={30} color="black" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: hp2(2), paddingBottom: hp2(12)}}>
        <View style={styles.checkoutWrap}>
          <View style={styles.scrollViewWrap}>
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}>
              <View style={styles.productImage}>
                <Image
                  source={IMAGES.vinDiesel}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.productImage}>
                <Image
                  source={IMAGES.randomPic}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
            </Animated.ScrollView>
            <View
              style={{
                width: wp2(36),
                position: 'absolute',
                zIndex: 999,
                bottom: hp2(1),
              }}>
              <RNAnimatedScrollIndicators
                numberOfCards={2}
                scrollWidth={wp2(36)}
                activeColor={'#707070'}
                inActiveColor={'#D9D9D9'}
                scrollAnimatedValue={scrollX}
              />
            </View>
          </View>

          <View style={styles.itemArea}>
            <Text style={styles.text}>Wilde Chestnut X White penny Loafer</Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>price</Text>
              <Text style={styles.text}>£299.00</Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Shipping</Text>
              <Text style={styles.text}>£9.00</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: wp2(42),
            paddingRight: wp2(6),
            marginVertical: hp2(2),
          }}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.text}>£308.00</Text>
        </View>

        {continueButton == 'confirm' ? (
          <View style={styles.detailInputArea}>{textBox2()}</View>
        ) : continueButton == 'continue' ? (
          <View style={[styles.detailInputArea, {height: hp2(38)}]}>
            {textBox('ADDRESS LINE 1')}
            {textBox('ADDRESS LINE 2')}
            {textBox('CITY')}
            {textBox('COUNTRY')}
            {textBox('POSTCODE')}
          </View>
        ) : (
          <>
            <View style={[styles.detailInputArea, {height: hp2(38)}]}>
            {textBox('ADDRESS LINE 1')}
            {textBox('ADDRESS LINE 2')}
            {textBox('CITY')}
            {textBox('COUNTRY')}
            {textBox('POSTCODE')}
            </View>
            <View style={[styles.detailInputArea, {borderBottomWidth: 0}]}>
              {textBox2()}
            </View>
            <View style={styles.iconsWrap}>
              <TouchableOpacity style={styles.iconImage}>
                <Image
                  source={IMAGES.applePay}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconImage}>
                <Image
                  source={IMAGES.paypal}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconImage}>
                <Image
                  source={IMAGES.gPay}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity
          onPress={() => {
            continueButton == 'continue'
              ? setContinueButton('confirm')
              : continueButton == 'confirm'
              ? setContinueButton('purchase')
              :  props.navigation.navigate('confirmationScreen');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>
            {continueButton == 'continue'
              ? 'CONTINUE'
              : continueButton == 'confirm'
              ? 'CONFIRM'
              : 'PURCHASE'}
          </Text>
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
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  checkout: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
    marginRight: wp2(2),
  },
  productImage: {
    width: wp2(36),
    height: hp2(20),
    overflow: 'hidden',
    borderRadius: wp2(4),
    alignSelf: 'center',
    //marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutWrap: {
    width: wp2(92),
    height: hp2(24),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    flexDirection: 'row',
  },
  scrollViewWrap: {
    width: wp2(36),
    height: hp2(20),
    overflow: 'hidden',
    borderRadius: wp2(4),
    alignSelf: 'center',
  },
  itemArea: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: wp2(2),
    paddingVertical: hp2(2),
  },
  text: {fontWeight: '700', textTransform: 'uppercase', color: 'black'},
  detailInputArea: {
    width: wp2(92),
    height: hp2(34),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    justifyContent: 'space-evenly',
  },
  inputBox: {
    width: wp2(80),
    height: hp2(5),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    //marginVertical: hp2(1),
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
  iconsWrap: {
    width: wp2(94),
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    width: wp2(66),
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
  iconImage: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
    //borderRadius: wp2(4),
    //alignSelf:'center',
    //marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
