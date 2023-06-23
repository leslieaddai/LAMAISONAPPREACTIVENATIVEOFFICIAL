import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
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
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import BottomSheetView from '../../components/bottomSheet/BottomsheetView';

export default function ShippingAddress(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
  const [selectedRegion, setSelectedRegion] = useState('SELECT REGION');
  const [regionsData, setRegionsData] = useState([]);

  const [isOpenedCountries, setIsOpenedCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('SELECT COUNTRY');
  const [countriesData, setCountriesData] = useState([]);
  const [modalData, setModalData] = useState()

  useEffect(() => {
    setLoading(true);

    axios
      .get(GetShippingAddress, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        console.log(res.data);
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
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  }, []);

  useEffect(() => {
    getAllRegions();
  }, []);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
    uibottomesheetvisiblity(!visible);
    setIsOpenedRegions(false)
    setIsOpenedCountries(false)
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
        console.log(res.data);
        //setStateChange(res.data.data);
        setLoading(false);
        successMessage('Shipping address saved successfully.');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Something went wrong!')
        //errorMessage(error.response.data.message);
        errorMessage(errorHandler(error))
      });
  };

  const getAllRegions = () => {
    axios
      .get(GetRegionsAll, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        //console.log(res.data);
        //setStateChange(res.data.data);
        setRegionsData(res?.data?.data);
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoading(false);
        //errorMessage('Something went wrong to get regions list!');
        errorMessage(errorHandler(error))
        //errorMessage(error.response.data.message)
      });
  };

  const SelectRegion = (Bool,regionname, regionid,regioncode)=>{
    setSelectedRegion(regionname);
    updateState({region: Number(regionid)});
    setIsOpenedRegions(false);
    setSelectedCountry('SELECT COUNTRY');
    updateState({country: null});
    setIsOpenedRegions(Bool)
    getAllCountries(regioncode);
  }

  const SelectCountry = (Bool,countryname,countryid)=>{
    setSelectedCountry(countryname);
    updateState({country: Number(countryid)});
    setIsOpenedCountries(Bool)
  }

  const getAllCountries = country_code => {
    axios
      .get(GetCountries + country_code, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        //console.log(res.data);
        //setStateChange(res.data.data);
        setCountriesData(res?.data?.data);
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoading(false);
        //errorMessage('Something went wrong to get countries list!');
        errorMessage(errorHandler(error))
        //errorMessage(error.response.data.message)
      });
  };

  useEffect(()=>{            
    if(isOpenedRegions){
      setModalData(regionsData)
      uibottomesheetvisiblity(true)

    }
  },[isOpenedRegions])

  useEffect(()=>{            
    if(isOpenedCountries){
      setModalData(countriesData)
      uibottomesheetvisiblity(true)

    }
  },[isOpenedCountries])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>SHIPPING ADDRESS</Text>
      </View>

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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: hp2(4)}}>
          {/* {textBox('ADDRESS LINE 1')}
     {textBox('ADDRESS LINE 2')}
     {textBox('CITY')}
     {textBox('COUNTRY')}
     {textBox('POSTCODE')} */}

          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputTxt}
              placeholderTextColor={'grey'}
              placeholder={'ADDRESS LINE 1'}
              value={stateChange.address_1}
              onChangeText={val => updateState({address_1: val})}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputTxt}
              placeholderTextColor={'grey'}
              placeholder={'ADDRESS LINE 2'}
              value={stateChange.address_2}
              onChangeText={val => updateState({address_2: val})}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputTxt}
              placeholderTextColor={'grey'}
              placeholder={'CITY'}
              value={stateChange.city}
              onChangeText={val => updateState({city: val})}
            />
          </View>

          {/* <View style={styles.inputBox}>
            <TextInput
              style={styles.inputTxt}
              placeholderTextColor={'grey'}
              placeholder={'REGION'}
              value={stateChange.region}
              onChangeText={(val) => updateState({region:val})}
            />
          </View> */}

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
              style={styles.inputTxt}
              placeholderTextColor={'grey'}
              placeholder={'POSTCODE'}
              value={stateChange.postcode}
              onChangeText={val => updateState({postcode: val})}
              //keyboardType='number-pad'
              maxLength={10}
            />
          </View>

          <TouchableOpacity onPress={onConfirm} style={styles.button}>
            <Text style={styles.buttonText}>CONFIRM</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      )}
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
          countryinfo = {selectedCountry}
        />

        </BottomSheet>
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
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
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
  selectedTxt: {color: 'black', fontWeight: '700', fontSize: rfv(13)},
});
