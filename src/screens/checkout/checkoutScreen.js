import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  SafeAreaView,
  Alert,
  FlatList,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  GetShippingAddress,
  ChangeShippingAddress,
  GetRegionsAll,
  GetCountries,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function CheckoutScreen(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const {products} = useSelector(state => state.GuestBasket);

  const [continueButton, setContinueButton] = useState('continue');

  const [stateChange, setStateChange] = useState({
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    country: null,
    postcode: null,
    email: null,
    name: null,
    card: null,
    expiry: null,
    cvv: null,
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {address_1, address_2, city, country, region, postcode, email, name, card, expiry, cvv} = stateChange;

  const [isOpenedRegions, setIsOpenedRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('SELECT REGION');
  const [regionsData, setRegionsData] = useState([]);

  const [isOpenedCountries, setIsOpenedCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('SELECT COUNTRY');
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    getAllRegions();
  }, []);

  const getAllRegions = () => {
    axios
      .get(GetRegionsAll)
      .then(async function (res) {
        //console.log(res.data);
        //setStateChange(res.data.data);
        setRegionsData(res?.data?.data);
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoading(false);
        errorMessage('Something went wrong to get regions list!');
        //errorMessage(error.response.data.message)
      });
  };

  const getAllCountries = country_code => {
    axios
      .get(GetCountries + country_code)
      .then(async function (res) {
        //console.log(res.data);
        //setStateChange(res.data.data);
        setCountriesData(res?.data?.data);
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoading(false);
        errorMessage('Something went wrong to get countries list!');
        //errorMessage(error.response.data.message)
      });
  };

  const goBackFunction = () => {
    if (continueButton === 'continue') {
      props.navigation.goBack();
    }
    if (continueButton === 'confirm') {
      setContinueButton('continue')
    }
    if (continueButton === 'purchase') {
      setContinueButton('confirm')
    }
  };

  const scrollX = new Animated.Value(0);

  // const textBox = (place) => {
  //   return (
  //     <View style={styles.inputBox}>
  //       <TextInput style={styles.textInput} placeholder={place}  placeholderTextColor={'grey'} keyboardType={place=='CARD NUMBER' ? 'number-pad' : 'default'} />
  //     </View>
  //   );
  // };

  // const textBox2 = () => {
  //   return (
  //     <>
  //       {textBox('EMAIL')}
  //       {textBox('NAME ON CARD')}
  //       {textBox('CARD NUMBER')}
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignSelf: 'center',
  //           justifyContent: 'space-between',
  //           width: wp2(80),
  //         }}>
  //         <View style={[styles.inputBox, {width: wp2(48)}]}>
  //           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="EXPIRY DATE MM/YY" />
  //         </View>
  //         <View style={[styles.inputBox, {width: wp2(28)}]}>
  //           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="CVV" keyboardType='number-pad' />
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

  return (
    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>goBackFunction()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.checkout}>Check Out</Text>
        <ICONS.Entypo name="lock" size={30} color="black" />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: hp2(2), paddingBottom: hp2(12)}}>
        <View style={styles.checkoutWrap}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={products}
            renderItem={({item, index}) => {
              return (
                <View style={styles.dataWrap}>
              <View style={styles.productImage}>
                <Image
                  //source={IMAGES.vinDiesel}
                  source={{uri:item?.data?.product_images[0]?.image[0]?.original_url}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              
          <View style={styles.itemArea}>
            <Text style={styles.text}>{item?.data?.name}</Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>price</Text>
              <Text style={styles.text}>£{item?.data?.price}</Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Shipping</Text>
              <Text style={styles.text}>£{item?.data?.price}</Text>
            </View>
          </View>
                </View>
              )
            }}
          />
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
          <View style={styles.detailInputArea}>
             <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'EMAIL'}  placeholderTextColor={'grey'}  value={stateChange.email}
              onChangeText={val => updateState({email: val})}  />
      </View>
      <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'NAME ON CARD'}  placeholderTextColor={'grey'}  value={stateChange.name}
              onChangeText={val => updateState({name: val})}/>
      </View>
      <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'CARD NUMBER'}  placeholderTextColor={'grey'}  value={stateChange.card}
              onChangeText={val => updateState({card: val})} keyboardType='number-pad' />
      </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            width: wp2(80),
          }}>
          <View style={[styles.inputBox, {width: wp2(48)}]}>
            <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="EXPIRY DATE MM/YY"  value={stateChange.expiry}
              onChangeText={val => updateState({expiry: val})} />
          </View>
          <View style={[styles.inputBox, {width: wp2(28)}]}>
            <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="CVV" keyboardType='number-pad'  value={stateChange.cvv}
              onChangeText={val => updateState({cvv: val})}/>
          </View>
        </View>
          </View>
        ) : continueButton == 'continue' ? (
          <View style={[styles.detailInputArea2]}>
            {/* {textBox('ADDRESS LINE 1')}
            {textBox('ADDRESS LINE 2')}
            {textBox('COUNTRY')}
            {textBox('CITY')}
            {textBox('POSTCODE')} */}
            <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'ADDRESS LINE 1'}  placeholderTextColor={'grey'}          value={stateChange.address_1}
              onChangeText={val => updateState({address_1: val})}  />
      </View>
      <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'ADDRESS LINE 2'}  placeholderTextColor={'grey'}   value={stateChange.address_2}
              onChangeText={val => updateState({address_2: val})}  />
      </View>
      <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'CITY'}  placeholderTextColor={'grey'} value={stateChange.city}
              onChangeText={val => updateState({city: val})} />
      </View>

      <TouchableOpacity
            onPress={() =>
              isOpenedRegions
                ? setIsOpenedRegions(false)
                : setIsOpenedRegions(true)
            }
            style={[
              styles.inputBox,
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp2(2),
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{color: 'black', fontWeight: '700', fontSize: rfv(13)}}>
              {selectedRegion}
            </Text>
            <View>
              <ICONS.FontAwesome
                name={isOpenedRegions ? 'chevron-up' : 'chevron-down'}
                color={'#A1A1A1'}
                size={22}
              />
            </View>
          </TouchableOpacity>

          {isOpenedRegions && (
            <View style={[styles.styleBox]}>
              {regionsData?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedRegion(item?.name);
                    updateState({region: Number(item?.id)});
                    setIsOpenedRegions(false);
                    setSelectedCountry('SELECT COUNTRY');
                    updateState({country: null});
                    getAllCountries(item?.code);
                  }}
                  key={index}
                  style={styles.itemWrap}>
                  <Text style={styles.itemTxt}>{item?.name}</Text>
                  {selectedRegion === item?.name && (
                    <ICONS.Entypo
                      name="check"
                      size={24}
                      color="black"
                      style={{position: 'absolute', right: 10}}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            disabled={selectedRegion === 'SELECT REGION' ? true : false}
            onPress={() =>
              isOpenedCountries
                ? setIsOpenedCountries(false)
                : setIsOpenedCountries(true)
            }
            style={[
              styles.inputBox,
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp2(2),
                justifyContent: 'space-between',
              },
            ]}>
            <Text style={styles.selectedTxt}>{selectedCountry}</Text>
            <View>
              <ICONS.FontAwesome
                name={isOpenedCountries ? 'chevron-up' : 'chevron-down'}
                color={'#A1A1A1'}
                size={22}
              />
            </View>
          </TouchableOpacity>

          {isOpenedCountries && countriesData.length !== 0 && (
            <View style={[styles.styleBox]}>
              {countriesData?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCountry(item?.name);
                    updateState({country: Number(item?.country_id)});
                    setIsOpenedCountries(false);
                  }}
                  key={index}
                  style={styles.itemWrap}>
                  <Text style={styles.itemTxt}>{item?.name}</Text>
                  {selectedCountry === item?.name && (
                    <ICONS.Entypo
                      name="check"
                      size={24}
                      color="black"
                      style={{position: 'absolute', right: 10}}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

      {/* <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'COUNTRY'}  placeholderTextColor={'grey'}  />
      </View> */}
      
      <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder={'POSTCODE'}  placeholderTextColor={'grey'}  value={stateChange.postcode}
              onChangeText={val => updateState({postcode: val})} maxLength={10} />
      </View>
          </View> 
        ) : (
          <>
            <View style={[styles.detailInputArea2]}>
            {/* {textBox('ADDRESS LINE 1')}
            {textBox('ADDRESS LINE 2')}
            {textBox('CITY')}
            {textBox('COUNTRY')}
            {textBox('POSTCODE')} */}

                <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{stateChange.address_1}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{stateChange.address_2}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{stateChange.city}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{selectedRegion}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{selectedCountry}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{stateChange.postcode}</Text>
      </View>
            </View>
            <View style={[styles.detailInputArea, {borderBottomWidth: 0}]}>
              {/* {textBox2()} */}
              <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{stateChange.email}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{stateChange.name}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
        <Text style={styles.selectedTxt}>{stateChange.card}</Text>
      </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            width: wp2(80),
          }}>
         <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2),width:wp2(48)}]}>
        <Text style={styles.selectedTxt}>{stateChange.expiry}</Text>
      </View>
      <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2),width:wp2(28)}]}>
        <Text style={styles.selectedTxt}>{stateChange.cvv}</Text>
      </View>
        </View>
            </View>

            {/* <View style={styles.iconsWrap}>
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
            </View> */}
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
      </KeyboardAwareScrollView>
      {/* <BottomComp /> */}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  checkout: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
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
    //flex: 1,
    width:wp2(54),
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
  detailInputArea2: {
    width: wp2(92),
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
    marginVertical: hp2(1),
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
  styleBox: {
    width: wp2(80),
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
    overflow: 'hidden',
    alignSelf: 'center',
  },
  itemWrap: {
    flexDirection: 'row',
    width: wp2(80),
    height: hp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp2(2),
    overflow: 'hidden',
  },
  itemTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    position: 'absolute',
    left: 10,
  },
  selectedTxt: {color: 'black', fontWeight: '700', fontSize: rfv(13)},
  dataWrap:{
    width:wp2(92),
    flexDirection:'row',
  },
});
