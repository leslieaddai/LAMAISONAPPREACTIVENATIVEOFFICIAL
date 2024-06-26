import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BottomSheet} from 'react-native-btr';
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
import {SkypeIndicator} from 'react-native-indicators';
import BottomSheetView from '../../components/bottomSheet/BottomsheetView';
import LoaderComp from '../../components/loaderComp';
import NewInputComp from '../../components/NewInputComp';
import ContinueButton from '../auth/componnets/ContinueBtn';

import ArrowDown from '../../assets/icons/arrow-down.svg';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function ShippingAddress(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const user = useSelector(state => state.userData);

  const [stateChange, setStateChange] = useState({
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    country: null,
    postcode: null,
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {address_1, address_2, city, country, region, postcode} = stateChange;

  const [isOpenedRegions, setIsOpenedRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Select Region');
  const [regionsData, setRegionsData] = useState([]);

  const [isOpenedCountries, setIsOpenedCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [countriesData, setCountriesData] = useState([]);
  const [modalData, setModalData] = useState();

  useEffect(() => {
    setLoading(true);

    axios
      .get(GetShippingAddress, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setStateChange({
          address_1: res?.data?.data?.address_1,
          address_2: res?.data?.data?.address_2,
          city: res?.data?.data?.city,
          country: res?.data?.data?.country?.country_id,
          region: res?.data?.data?.region?.id,
          postcode: res?.data?.data?.postcode,
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
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        errorMessage(errorHandler(error));
      });
  }, []);

  useEffect(() => {
    getAllRegions();
  }, []);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
    uibottomesheetvisiblity(!visible);
    setIsOpenedRegions(false);
    setIsOpenedCountries(false);
  };
  const uibottomesheetvisiblity = Bool => {
    setVisible(Bool);
  };

  const onConfirm = () => {
    setLoading(true);

    axios
      .post(ChangeShippingAddress, stateChange, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setLoading(false);
        successMessage('Shipping address saved successfully.');
      })
      .catch(function (error) {
        setLoading(false);
        errorMessage(errorHandler(error));
      });
  };

  const getAllRegions = () => {
    axios
      .get(GetRegionsAll, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setRegionsData(res?.data?.data);
      })
      .catch(function (error) {
        errorMessage(errorHandler(error));
      });
  };

  const SelectRegion = (Bool, regionname, regionid, regioncode) => {
    setSelectedRegion(regionname);
    updateState({region: Number(regionid)});
    setIsOpenedRegions(false);
    setSelectedCountry('Select Country');
    updateState({country: null});
    setIsOpenedRegions(Bool);
    getAllCountries(regioncode);
  };

  const SelectCountry = (Bool, countryname, countryid) => {
    setSelectedCountry(countryname);
    updateState({country: Number(countryid)});
    setIsOpenedCountries(Bool);
  };

  const getAllCountries = country_code => {
    setCountryLoading(true);
    axios
      .get(GetCountries + country_code, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setCountriesData(res?.data?.data);
        setCountryLoading(false);
      })
      .catch(function (error) {
        errorMessage(errorHandler(error));
        setCountryLoading(false);
      });
  };

  useEffect(() => {
    if (isOpenedRegions) {
      setModalData(regionsData);
      uibottomesheetvisiblity(true);
    }
  }, [isOpenedRegions]);

  useEffect(() => {
    if (isOpenedCountries) {
      uibottomesheetvisiblity(true);
      setModalData(countriesData);
    }
  }, [isOpenedCountries]);

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {countryLoading && <LoaderComp />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        <NewHeaderComp
          title={'Shipping adress'}
          movePreviousArrow={true}
          arrowNavigation={() => props.navigation.goBack()}
        />

        {/* <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.heading}>SHIPPING ADDRESS</Text>
        </View> */}

        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: hp2(6),
            }}>
            <SkypeIndicator color={'black'} />
          </View>
        ) : (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <NewInputComp
              value={stateChange.address_1}
              handleOnChange={val => updateState({address_1: val})}
              inputText={'Address Line 1'}
            />
            <View style={{marginVertical: -20}}>
              <NewInputComp
                value={stateChange.address_2}
                handleOnChange={val => updateState({address_2: val})}
                inputText={'Address Line 2'}
              />
            </View>
            <NewInputComp
              value={stateChange.city}
              handleOnChange={val => updateState({city: val})}
              inputText={'City'}
            />
            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder={'ADDRESS LINE 1'}
                value={stateChange.address_1}
                onChangeText={val => updateState({address_1: val})}
              />
            </View> */}

            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder={'ADDRESS LINE 2'}
                value={stateChange.address_2}
                onChangeText={val => updateState({address_2: val})}
              />
            </View> */}

            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder={'CITY'}
                value={stateChange.city}
                onChangeText={val => updateState({city: val})}
              />
            </View> */}

            <TouchableOpacity
              onPress={() =>
                isOpenedRegions
                  ? setIsOpenedRegions(false)
                  : setIsOpenedRegions(true)
              }
              style={{
                borderWidth: 1,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 10,
                borderColor: '#ccc',
                height: 50,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: '#4D4D4D',
                  fontWeight: '400',
                  fontSize: 16,
                }}>
                {selectedRegion}
              </Text>
              <View
                style={isOpenedRegions ? {transform: 'rotate(180deg)'} : {}}>
                <ArrowDown
                  width={16}
                  height={8}
                  color={isOpenedRegions ? COLORS.main : COLORS.main}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={selectedRegion === 'Select Region' ? true : false}
              onPress={() =>
                isOpenedCountries
                  ? setIsOpenedCountries(false)
                  : setIsOpenedCountries(true)
              }
              style={{
                borderWidth: 1,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 10,
                borderColor: '#ccc',
                height: 50,
              }}>
              <Text style={styles.selectedTxt}>{selectedCountry}</Text>
              <View
                style={isOpenedCountries ? {transform: 'rotate(180deg)'} : {}}>
                <ArrowDown
                  width={16}
                  height={8}
                  color={isOpenedCountries ? COLORS.main : COLORS.main}
                />
              </View>
            </TouchableOpacity>
            <View style={{marginTop: -10}}>
              <NewInputComp
                inputText={'Postcode'}
                handleOnChange={val => updateState({postcode: val})}
                value={stateChange.postcode}
              />
            </View>

            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder={'POSTCODE'}
                value={stateChange.postcode}
                onChangeText={val => updateState({postcode: val})}
                maxLength={10}
              />
            </View> */}
            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <ContinueButton onPress={onConfirm} text={'Confirm'} />
            </View>
            {/* <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity> */}
          </KeyboardAwareScrollView>
        )}
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}>
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
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',

    justifyContent: 'center',
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(20),
  },
  inputBox: {
    width: wp2(80),
    height: hp2(6),
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
  button: {
    width: wp2(28),
    height: hp2(6),
    backgroundColor: 'black',
    borderRadius: wp2(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: hp2(2),
    alignSelf: 'flex-end',
    marginRight: wp2(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
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
  selectedTxt: {color: '#4D4D4D', fontWeight: '400', fontSize: 16},
});
