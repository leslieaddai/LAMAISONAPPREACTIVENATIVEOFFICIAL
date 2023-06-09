import React, {useState,useEffect} from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { GetBrandAbout, SaveBrandAbout} from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function About(props) {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)

  const [description, setDescription] = useState(null);

  useEffect(()=>{
    setLoading(true);

    axios
    .get(GetBrandAbout, {
        headers:{'Authorization':`Bearer ${user?.token}`},
    })
    .then(async function (res) {
       console.log(res.data);
       setDescription(res?.data?.data)
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
    .post(SaveBrandAbout, {about:description}, {
        headers:{'Authorization':`Bearer ${user?.token}`},
    })
    .then(async function (res) {
       console.log(res.data);
       //setStateChange(res.data.data);
       setLoading(false);
       successMessage('Done');   
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading(false);
      //errorMessage('Something went wrong!')
      errorMessage(error.response.data.message)
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>ABOUT</Text>
      </View>

      {loading ? 
    <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical:hp2(6)}}>
      <SkypeIndicator color={'black'} />
    </View>
    :
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(4)}}>
      <View style={styles.textBox}>
        <TextInput
          placeholder="MAXIMUM OF 300 CHARACTERS"
          placeholderTextColor={'grey'}
          multiline={true}
          maxLength={300}
          style={{
            flex: 1,
            color: 'black',
            fontWeight: '700',
            fontSize: rfv(14),
            textAlignVertical: 'top',
          }}
          value={description}
          onChangeText={(val) => setDescription(val)}
        />
      </View>
        <TouchableOpacity onPress={onConfirm}
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
    fontSize: rfv(26),
  },
  textBox: {
    width: wp2(88),
    height: hp2(30),
    backgroundColor: 'white',
    borderRadius: wp2(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    alignSelf:'center',
    paddingHorizontal: wp2(2),
    paddingVertical: wp2(2),
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
    marginTop: hp2(14),
    alignSelf:'flex-end',
    marginRight:wp2(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
});
