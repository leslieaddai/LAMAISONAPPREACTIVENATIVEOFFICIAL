import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetRegions, SaveShippingInfo} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import ShippingComp from './shippingComp';

import LoaderComp from '../../components/loaderComp';

export default function ShippingLocation(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const [shippingDescription, setShippingDescription] = useState(
    user?.userData?.Shipping_information?.description
      ? user?.userData?.Shipping_information?.description
      : '',
  );
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    getAllRegions();
  }, []);

  const getAllRegions = () => {
    setLoading(true);

    axios
      .get(GetRegions, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        //console.log(res?.data);
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        errorMessage('Something went wrong!');
      });
  };

  const saveShipping = () => {
    if (shippingDescription !== '') {
      setLoading2(true);

      let obj = {
        description: shippingDescription,
      };

      axios
        .post(SaveShippingInfo, obj, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            Accept: 'application/json',
          },
        })
        .then(async function (res) {
          console.log(res.data);
          dispatch({
            type: types.UpdateShippingInfo,
            payload: shippingDescription,
          });
          setLoading2(false);
          successMessage('Shipping Information Added Successfully');
        })
        .catch(function (error) {
          console.log(error.response.data);
          setLoading2(false);
          errorMessage('Something went wrong!');
        });
    } else {
      errorMessage('Please enter shipping information');
    }
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading2 && <LoaderComp />}
      </View>

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp2(2)}}>
            <Text style={styles.heading}>Shipping Information</Text>

            <View style={styles.textBox}>
              <TextInput
                placeholder={
                  'PLEASE INPUT YOUR BRANDS GENERAL SHIPPING INFORMATION'
                }
                placeholderTextColor={'grey'}
                multiline={true}
                style={styles.inputTxt}
                value={shippingDescription}
                onChangeText={val => setShippingDescription(val)}
              />
            </View>
            <View style={{width: wp2(88), alignSelf: 'center'}}>
              <Text style={styles.shippingTxt}>Select Shipping Location</Text>
            </View>
            {loading && data.length === 0 ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: hp2(6),
                }}>
                <SkypeIndicator color={'black'} />
              </View>
            ) : (
              <>
                {data?.map((item, index) => {
                  //console.log("item=======>",item);
                  return (
                    <ShippingComp
                      key={index}
                      data={item}
                      state={{getAllRegions}}
                      disable={item?.name === 'Asia' ? false : true}
                    />
                  );
                })}
              </>
            )}
            {/* {options('ASIA')}
      {options('AFRICA')}
      {options('NORTH AMERICA')}
      {options('SOUTH AMERICA')}
      {options('EUROPE')}
      {options('AUSTRALIA')} */}
            <TouchableOpacity
              onPress={() => saveShipping()}
              style={styles.button}>
              <Text style={{color: 'white'}}>CONFIRM</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(20),
    textTransform: 'uppercase',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignSelf: 'center',
  },
  textBox: {
    width: wp2(88),
    height: hp2(30),
    backgroundColor: 'white',
    borderRadius: wp2(2),
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: hp2(4),
    marginBottom: hp2(2),
    paddingHorizontal: wp2(2),
    paddingVertical: wp2(2),
  },
  optionWrap: {
    width: wp2(90),
    height: hp2(4),
    //backgroundColor:'red',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp2(1),
    marginTop: hp2(2),
    alignSelf: 'center',
  },
  circle: {
    width: wp2(5),
    height: wp2(5),
    //backgroundColor:'#D9D9D9',
    borderRadius: 100,
  },
  button: {
    width: wp2(28),
    height: wp2(10),
    backgroundColor: 'black',
    borderRadius: wp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: hp2(6),
    alignSelf: 'flex-end',
    marginRight: wp2(6),
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(14),
    textAlignVertical: 'top',
  },
  shippingTxt: {
    color: 'black',
    fontWeight: '700',
    marginBottom: hp2(2),
  },
});
