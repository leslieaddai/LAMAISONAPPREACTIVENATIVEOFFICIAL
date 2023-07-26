import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  Platform,
  SafeAreaView
} from 'react-native';
import {
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import {
  ICONS,
  COLORS,
  wp2,
  hp2
} from '../../theme';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import LoaderComp from '../../components/loaderComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomSheet } from 'react-native-btr';
import { errorMessage, successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import {
  GetShippingAddress,
  GetRegionsAll,
  GetCountries,
  BuyNowOrderEditor,
  BuyNowOrderGuest,
  ShippingAvailability,
} from '../../config/Urls';
import { useDispatch, useSelector } from 'react-redux';
import { SkypeIndicator } from 'react-native-indicators';
import BottomSheetView from '../../components/bottomSheet/BottomsheetView';

export default function BuyNow(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingContinue, setLoadingContinue] = useState(false);
  const user = useSelector(state => state.userData);
  const guestUser = useSelector(state => state.guestData);
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState()
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
  const updateState = data => setStateChange(prev => ({ ...prev, ...data }));
  const { address_1, address_2, city, country, region, postcode, email, name, card, expiry, cvv } = stateChange;
  const [isOpenedRegions, setIsOpenedRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('SELECT REGION');
  const [regionsData, setRegionsData] = useState([]);
  const [isOpenedCountries, setIsOpenedCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('SELECT COUNTRY');
  const [countriesData, setCountriesData] = useState([]);
  const [total, setTotal] = useState(0);
  const [commission, setCommission] = useState(15);
  const propsparams = props?.route?.params

  useEffect(() => {
    if (loading) {
      const parent = props.navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    }
    else {
      const parent = props.navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
          width: wp2(100),
          height: Platform.OS === 'ios' ? hp2(10) : hp2(8),
          backgroundColor: 'white'
        },
      });
    }
  }, [loading])

  useEffect(() => {
    getAllRegions();
  }, []);

  useEffect(() => {
    if (user?.token !== '') {
      setLoadingAddress(true);

      axios
        .get(GetShippingAddress, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(async function (res) {
          console.log("buynow 01=====>", res.data);
          setStateChange({
            address_1: res?.data?.data?.address_1,
            address_2: res?.data?.data?.address_2,
            city: res?.data?.data?.city,
            country: res?.data?.data?.country !== null ? res?.data?.data?.country?.country_id : null,
            region: res?.data?.data?.region !== null ? res?.data?.data?.region?.id : null,
            postcode: res?.data?.data?.postcode,
            email: null,
            name: null,
            card: null,
            expiry: null,
            cvv: null,
          });
          if (res?.data?.data?.region !== null) {
            setSelectedRegion(res?.data?.data?.region?.name);
          }
          if (
            res?.data?.data?.region !== null &&
            res?.data?.data?.country !== null
          ) {
            getAllCountries(res?.data?.data?.region?.code);
            setSelectedCountry(res?.data?.data?.country?.name);
          }
          setLoadingAddress(false);
        })
        .catch(function (error) {
          console.log(error.response.data);
          setLoadingAddress(false);
          errorMessage(errorHandler(error))
        });
    }
  }, []);

  useEffect(() => {
    if (region !== null && region !== '') {
      let val = 0;
      val = val + Number(propsparams?.data?.price * propsparams?.qty);
      propsparams?.data?.product_region?.map((item, index) => {
        if (region === item?.region_id) {
          val = val + Number(item?.price)
        }
      })
      setTotal(val);
    }
  }, [region])

  useEffect(() => {
    if (isOpenedRegions) {
      setModalData(regionsData)
      uibottomesheetvisiblity(true)

    }
  }, [isOpenedRegions])

  useEffect(() => {
    if (isOpenedCountries) {
      setTimeout(() => {
        uibottomesheetvisiblity(true)
        setModalData(countriesData)
      }, 1000);

    }
  }, [isOpenedCountries])

  const getAllRegions = () => {
    axios
      .get(GetRegionsAll)
      .then(async function (res) {
        setRegionsData(res?.data?.data);
      })
      .catch(function (error) {
        errorMessage(errorHandler(error))
      });
  };

  const getAllCountries = country_code => {
    axios
      .get(GetCountries + country_code)
      .then(async function (res) {
        setCountriesData(res?.data?.data);
      })
      .catch(function (error) {
        errorMessage(errorHandler(error))
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

  function constainalphabet(str) {
    return (/^[A-Za-z ]+$/).test(str);
  }
  function emailvalidation(str) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
  }

  const onContinue = () => {

    if (
      (address_1 !== '' && address_1 !== null) &&
      (city !== '' && city !== null) &&
      (region !== '' && region !== null) &&
      (country !== '' && country !== null) &&
      (postcode !== '' && postcode !== null)) {

      if (constainalphabet(city)) {
        setLoadingContinue(true);
        axios
          .post(
            ShippingAvailability, 
            {
            region: region,
             product_id: [propsparams?.data?.id] 
            })
          .then(async function (res) {
            setLoadingContinue(false);
            if (res?.data?.status) {
              setContinueButton('confirm')
            } else {
              errorMessage(String(Object.values(res?.data['message'])[0]))
            }
          })
          .catch(function (error) {
            setLoadingContinue(false);
            errorMessage(error?.response?.data?.message)
          })
      } else {
        errorMessage('Invalid city name')
      }
    } else {
      errorMessage('Please fill all fields!')
    }

  }

  const onConfirm = () => {

    if (
      (email !== '' && email !== null) &&
      (name !== '' && name !== null) &&
      (card !== '' && card !== null) &&
      (expiry !== '' && expiry !== null) &&
      (cvv !== '' && cvv !== null)
    ) {
      if (emailvalidation(email)) {
        if (cvv.length >= 3) {
          setContinueButton('purchase')
        }
        else {
          errorMessage('CVV should have at least three numbers.')
        }
      }
      else {
        errorMessage('Please enter correct email')
      }
    }
    else {
      errorMessage('Please fill all fields!')
    }

  }

  const createOrder = () => {
    if (user?.token !== '') {
      createEditorOrder();
    } else {
      createGuestOrder();
    }
  }

  const createGuestOrder = () => {
    setLoading(true);

    var formdata = new FormData();

    formdata.append('product_id[]', propsparams?.data?.id);
    formdata.append('color_id[]', propsparams?.colorId?.id);
    formdata.append('size_id[]', propsparams?.sizeId?.size_id);
    formdata.append('qty[]', Number(propsparams?.qty));
    formdata.append('device_id', guestUser?.device_id);
    formdata.append('status_id', 3);
    formdata.append('payment_method', 'stripe');
    formdata.append('address1',address_1);
    formdata.append('address2',address_2);
    formdata.append('region',region);
    formdata.append('city',city);
    formdata.append('country',country);
    formdata.append('post_code',postcode);
    formdata.append('email',email);
    formdata.append('title',name);
    formdata.append('acc_number',card);
    formdata.append('expiry',expiry);
    formdata.append('cvv',cvv);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: BuyNowOrderGuest,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        setLoading(false);
        props.navigation.replace('bottomNavigationGuest', { screen: 'confirmationScreen', })
        successMessage('Order Done');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        errorMessage(errorHandler(error))
      });

  }

  const createEditorOrder = () => {
    setLoading(true);

    var formdata = new FormData();

    formdata.append('product_id[]', propsparams?.data?.id);
    formdata.append('color_id[]', propsparams?.colorId?.id);
    formdata.append('size_id[]', propsparams?.sizeId?.size_id);
    formdata.append('qty[]', Number(propsparams?.qty));
    formdata.append('user_id', user?.userData?.id);
    formdata.append('status_id', 3);
    formdata.append('payment_method', 'stripe');
    formdata.append('address1', address_1);
    formdata.append('address2', address_2);
    formdata.append('region', region);
    formdata.append('city', city);
    formdata.append('country',country);
    formdata.append('post_code',postcode);
    formdata.append('email', email);
    formdata.append('title', name);
    formdata.append('acc_number',card);
    formdata.append('expiry',expiry);
    formdata.append('cvv', cvv);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: BuyNowOrderEditor,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        setLoading(false);
        props.navigation.goBack();
        props.navigation.navigate('confirmationScreen');
        successMessage('Order Done');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        errorMessage(errorHandler(error))
      });

  }

  const scrollX = new Animated.Value(0);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
    uibottomesheetvisiblity(!visible);
    setIsOpenedRegions(false)
    setIsOpenedCountries(false)
  };

  const uibottomesheetvisiblity = Bool => {
    setVisible(Bool);
  };

  const SelectRegion = (Bool, regionname, regionid, regioncode) => {
    setSelectedRegion(regionname);
    updateState({ region: Number(regionid) });
    setIsOpenedRegions(false);
    setSelectedCountry('SELECT COUNTRY');
    updateState({ country: null });
    setIsOpenedRegions(Bool)
    getAllCountries(regioncode);
  }

  const SelectCountry = (Bool, countryname, countryid) => {
    setSelectedCountry(countryname);
    updateState({ country: Number(countryid) });
    setIsOpenedCountries(Bool)
  }

  return (
    <>
      <View style={{ position: 'absolute', zIndex: 999 }}>
        {loading && <LoaderComp />}
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headWrap}>
            <TouchableOpacity onPress={() => goBackFunction()} style={{ position: 'absolute', left: wp2(4) }}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.checkout}>Check Out</Text>
            <ICONS.Entypo name="lock" size={30} color="black" />
          </View>

          {loadingAddress ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: hp2(6),
              }}>
              <SkypeIndicator color={'black'} />
            </View>
          ) : (
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: hp2(2), paddingBottom: hp2(12) }}>
              <View style={styles.checkoutWrap}>

                <View style={styles.dataWrap}>

                  <View style={{ 
                    width: wp2(36), 
                    height: hp2(20), 
                    overflow: 'hidden', 
                    borderRadius: wp2(4), 
                    alignSelf: 'center', 
                    }}>
                    <Animated.ScrollView
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true },
                      )}>
                      {propsparams?.data?.product_images[0]?.image?.map((item, index) => {
                        return (
                          <View key={index} style={styles.productImage}>
                            <Image
                              source={{ uri: item?.original_url }}
                              style={{ width: '100%', height: '100%' }}
                              resizeMode="cover"
                            />
                          </View>
                        )
                      })}
                    </Animated.ScrollView>
                    {propsparams?.data?.product_images[0]?.image?.length > 1 && (
                      <View
                        style={{
                          width: wp2(36),
                          position: 'absolute',
                          bottom: hp2(1),
                          zIndex: 999,
                        }}>
                        <RNAnimatedScrollIndicators
                          numberOfCards={propsparams?.data?.product_images[0]?.image?.length}
                          scrollWidth={wp2(36)}
                          activeColor={'#D9D9D9'}
                          inActiveColor={'#D9D9D9'}
                          scrollAnimatedValue={scrollX}
                        />
                      </View>
                    )}
                  </View>

                  <View style={styles.itemArea}>
                    <Text style={styles.text}>{propsparams?.data?.name}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{
                         width: wp2(9), 
                         height: wp2(9), 
                         backgroundColor: propsparams?.colorId?.color_code, 
                         borderRadius: wp2(2), 
                         borderWidth: 1 
                         }}>
                         </View>
                      <Text style={{ 
                        color: 'black', 
                        fontSize: rfv(12), 
                        fontWeight: 'bold', 
                        marginLeft: wp2(2) 
                        }}> SIZE : {propsparams?.sizeId?.size?.size}</Text>
                    </View>

                    <Text style={{ 
                      color: 'black', 
                      fontSize: rfv(12), 
                      fontWeight: 'bold' 
                      }}>Quantity: {propsparams?.qty}</Text>

                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.text}>price</Text>
                      <Text style={styles.text}>£{propsparams?.data?.price}</Text>
                    </View>

                    {continueButton === 'purchase' &&
                      <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.text}>Shipping</Text>
                        <Text style={styles.text}>{propsparams?.data?.product_region.map((item, index) => {
                          if (region === item?.region_id) {
                            return (
                              '£' + item?.price
                            )
                          }
                        })}</Text>
                      </View>
                    }
                  </View>
                </View>

              </View>

              {continueButton === 'purchase' &&
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: wp2(42),
                      paddingRight: wp2(6),
                      marginVertical: hp2(1),
                    }}>
                    <Text style={styles.text}>Sub Total</Text>
                    <Text style={styles.text}>£{total}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: wp2(42),
                      paddingRight: wp2(6),
                      marginVertical: hp2(1),
                    }}>
                    <Text style={styles.text}>Commission {commission}%</Text>
                    <Text style={styles.text}>£{total * (commission / 100)}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: wp2(42),
                      paddingRight: wp2(6),
                      marginVertical: hp2(1),
                    }}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={styles.text}>£{total + (total * (commission / 100))}</Text>
                  </View>
                </>
              }

              {continueButton == 'confirm' ? (
                <View style={styles.detailInputArea}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: wp2(39),
                      paddingRight: wp2(2),
                      marginVertical: hp2(1),
                    }}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={styles.text}>£{total + (total * (commission / 100))}</Text>
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder={'EMAIL'} 
                    placeholderTextColor={'grey'} 
                    value={email}
                    onChangeText={val => updateState({ email: val })} />
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder={'NAME ON CARD'} 
                    placeholderTextColor={'grey'} 
                    value={name}
                    onChangeText={val => updateState({ name: val })} />
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder={'CARD NUMBER'}
                    placeholderTextColor={'grey'} 
                    value={card}
                    onChangeText={val => updateState({ card: val })} 
                    keyboardType='number-pad' 
                    maxLength={19} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'space-between',
                      width: wp2(80),
                    }}>
                    <View style={[styles.inputBox, { width: wp2(48) }]}>
                      <TextInput 
                      style={styles.textInput} 
                      placeholderTextColor={'grey'} 
                      placeholder="EXPIRY DATE MM/YY" 
                      maxLength={5} 
                      value={expiry}
                      onChangeText={text => 
                        updateState({expiry: text.length === 3 && !text.includes("/")
                       ? `${text.substring(0, 2)}/${text.substring(2)}`
                       : text})} />
                    </View>
                    <View style={[styles.inputBox, { width: wp2(28) }]}>
                      <TextInput 
                      style={styles.textInput} 
                      placeholderTextColor={'grey'} 
                      placeholder="CVV" 
                      keyboardType='number-pad' 
                      maxLength={4} 
                      value={cvv}
                      onChangeText={val => updateState({ cvv: val })} />
                    </View>
                  </View>
                </View>
              ) 
              : 
              continueButton == 'continue' ? (
                <View style={[styles.detailInputArea2]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: wp2(39),
                      paddingRight: wp2(2),
                      marginVertical: hp2(1),
                    }}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={styles.text}>£{total + (total * (commission / 100))}</Text>
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder={'ADDRESS LINE 1'} 
                    placeholderTextColor={'grey'} 
                    value={address_1}
                    onChangeText={val => updateState({ address_1: val })} />
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder={'ADDRESS LINE 2'} 
                    placeholderTextColor={'grey'} 
                    value={address_2}
                    onChangeText={val => updateState({ address_2: val })} />
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder={'CITY'} 
                    placeholderTextColor={'grey'} 
                    value={city}
                    onChangeText={val => updateState({ city: val })} />
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
                      style={{ 
                        color: 'black', 
                        fontWeight: '700', 
                        fontSize: rfv(13) }}>
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
                  <View style={styles.inputBox}>
                    <TextInput 
                    style={styles.textInput} 
                    placeholder={'POSTCODE'} 
                    placeholderTextColor={'grey'} 
                    value={postcode}
                    onChangeText={val => updateState({ postcode: val })} 
                    maxLength={10} />
                  </View>
                </View>
              ) 
              : 
              (
                <>
                  <View style={[styles.detailInputArea2]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: wp2(39),
                        paddingRight: wp2(2),
                        marginVertical: hp2(1),
                      }}>
                      <Text style={styles.text}>Total</Text>
                      <Text style={styles.text}>£{total + (total * (commission / 100))}</Text>
                    </View>

                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{address_1}</Text>
                    </View>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{address_2}</Text>
                    </View>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{city}</Text>
                    </View>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{selectedRegion}</Text>
                    </View>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{selectedCountry}</Text>
                    </View>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{postcode}</Text>
                    </View>
                  </View>
                  <View style={[styles.detailInputArea, { borderBottomWidth: 0 }]}>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{email}</Text>
                    </View>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{name}</Text>
                    </View>
                    <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2) }]}>
                      <Text style={styles.selectedTxt}>{card}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                        width: wp2(80),
                      }}>
                      <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2), width: wp2(48) }]}>
                        <Text style={styles.selectedTxt}>{expiry}</Text>
                      </View>
                      <View style={[styles.inputBox, { justifyContent: 'center', paddingHorizontal: wp2(2), width: wp2(28) }]}>
                        <Text style={styles.selectedTxt}>{cvv}</Text>
                      </View>
                    </View>
                  </View>
                </>
              )}

              <TouchableOpacity
                disabled={loadingContinue}
                onPress={() => {
                  continueButton == 'continue'
                    ? onContinue()
                    : continueButton == 'confirm'
                      ? onConfirm()
                      : createOrder();
                }}
                style={styles.button}>
                {loadingContinue ? (
                  <SkypeIndicator color={'white'} />
                ) 
                : 
                (
                  <Text style={styles.buttonText}>
                    {continueButton == 'continue'
                      ? 'CONTINUE'
                      : continueButton == 'confirm'
                        ? 'CONFIRM'
                        : 'PURCHASE'}
                  </Text>
                )}
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          )}
        </View>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <BottomSheetView
            Data={modalData}
            regioninfo={selectedRegion}
            uibottomesheetvisiblity={uibottomesheetvisiblity}
            SelectRegion={SelectRegion}
            SelectCountry={SelectCountry}
            countryinfo={selectedCountry}
          />


        </BottomSheet>
      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === "ios" ? hp2(0) : hp2(4),
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
    width: wp2(54),
    justifyContent: 'space-evenly',
    paddingLeft: wp2(2),
    paddingVertical: hp2(2),
  },
  text: { fontWeight: '700', textTransform: 'uppercase', color: 'black' },
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
  selectedTxt: { color: 'black', fontWeight: '700', fontSize: rfv(13) },
  dataWrap: {
    width: wp2(92),
    flexDirection: 'row',
  },
});
