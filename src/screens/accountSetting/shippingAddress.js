import React, {useState,useEffect} from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { GetShippingAddress,ChangeShippingAddress } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function ShippingAddress(props) {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)

  const [stateChange, setStateChange] = useState({
    address_1:'',
    address_2:'',
    city:'',
    country:'',
    postcode:'',
  })
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {
    address_1,
    address_2,
    city,
    country,
    postcode,
  } = stateChange;

  useEffect(()=>{
    setLoading(true);

    axios
    .get(GetShippingAddress, {
        headers:{'Authorization':`Bearer ${user?.token}`},
    })
    .then(async function (res) {
       console.log(res.data);
       setStateChange(res.data.data);
       setLoading(false);   
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading(false);
      errorMessage('Something went wrong!')
    });

  },[])

  const onConfirm = () => {
    setLoading(true);

    axios
    .post(ChangeShippingAddress, stateChange, {
        headers:{'Authorization':`Bearer ${user?.token}`},
    })
    .then(async function (res) {
       console.log(res.data);
       //setStateChange(res.data.data);
       setLoading(false);   
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading(false);
      //errorMessage('Something went wrong!')
      errorMessage(error.response.data.message)
    });
  }

    // const textBox = (place) => {
    //     return(
    //         <View style={styles.inputBox}>
    //         <TextInput
    //           style={{
    //             flex: 1,
    //             color: 'black',
    //             paddingHorizontal: wp2(2),
    //             fontSize: rfv(13),
    //             fontWeight: '700',
    //           }}
    //           placeholderTextColor={'grey'}
    //           placeholder={place}
    //           value={stateChange.productName}
    //           onChangeText={(val) => updateState({productName:val})}
    //         />
    //       </View>
    //     )
    // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>SHIPPING ADDRESS</Text>
      </View>

      {loading ? 
    <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical:hp2(6)}}>
      <SkypeIndicator color={'black'} />
    </View>
    :
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(4)}}>
     {/* {textBox('ADDRESS LINE 1')}
     {textBox('ADDRESS LINE 2')}
     {textBox('CITY')}
     {textBox('COUNTRY')}
     {textBox('POSTCODE')} */}

<View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholderTextColor={'grey'}
              placeholder={'ADDRESS LINE 1'}
              value={stateChange.address_1}
              onChangeText={(val) => updateState({address_1:val})}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholderTextColor={'grey'}
              placeholder={'ADDRESS LINE 2'}
              value={stateChange.address_2}
              onChangeText={(val) => updateState({address_2:val})}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholderTextColor={'grey'}
              placeholder={'CITY'}
              value={stateChange.city}
              onChangeText={(val) => updateState({city:val})}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholderTextColor={'grey'}
              placeholder={'COUNTRY'}
              value={stateChange.country}
              onChangeText={(val) => updateState({country:val})}
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholderTextColor={'grey'}
              placeholder={'POSTCODE'}
              value={stateChange.postcode}
              onChangeText={(val) => updateState({postcode:val})}
              keyboardType='number-pad'
            />
          </View>
          
        <TouchableOpacity
          onPress={onConfirm}
          style={styles.button}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    }
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
    alignSelf:'center',
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
    alignSelf:'flex-end',
    marginRight:wp2(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
});
