import React, {useState} from 'react';
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
import AlertComp from '../../components/alertComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { ResetPasswordUrl,VerifyCodeUrl,ForgetPasswordUrl } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function ResetPassScreen(props) {

  const user = useSelector(state => state.userData)
  const dispatch = useDispatch()

  const [showReset, setShowReset] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);
  const [passMatch, setPassMatch] = useState(false);

  const [email, setEmail]=useState('');
  const [code, setCode]=useState();

  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    if(email!==''){

      setLoading(true);

      let obj = {
        email: email,
    }

      axios
          .post(ForgetPasswordUrl,obj)
          .then(async function (res) {
             console.log(res.data);

             setLoading(false);
             setVerifyCode(true);
             successMessage('Verification Code Has Been Sent!')
          }) 
          .catch(function (error) {
            console.log(error.response.data)
            setLoading(false);
            errorMessage('Something Went Wrong!')
            //errorMessage(errorHandler(error))
          });
    }else{
      errorMessage('Please Enter Email Address');
    }
  }

  const onVerifyCode = () => {
    if(code){

      setLoading(true);

      let obj = {
        email: email,
        password_reset_code: code
    }

      axios
          .post(VerifyCodeUrl,obj)
          .then(async function (res) {
             console.log(res.data);

             setLoading(false);
             setShowReset(true);
             successMessage('Code Has Been Verified!')
          }) 
          .catch(function (error) {
            console.log(error.response.data)
            setLoading(false);
            errorMessage('Something Went Wrong!')
            //errorMessage(errorHandler(error))
          });
    }else{
      errorMessage('Please Enter Verification Code');
    }
  }

  const resetPasswordComp = () => {
    return(
      <>
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
            placeholder="ENTER PASSWORD"
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
            placeholder="RE-ENTER PASSWORD"
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('loginScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        {!passMatch && (
            <AlertComp text='Password Does not Match'/>
        )}
      </>
    )
  }

  return (
    <>
     {loading && 
    <View style={{ width: wp2(100), height: hp2(100), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <SkypeIndicator color={'black'} />
    </View>
    }
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: hp2(4)}}>
        <Text style={styles.resetText}>Reset Password</Text>
        {showReset ? (
          resetPasswordComp()
        ) : verifyCode ? (
          <>
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
            placeholder="VERIFY CODE"
            value={code}
            onChangeText={(val) => setCode(val)}
            keyboardType={'number-pad'}
          />
        </View>
        <TouchableOpacity
          onPress={onVerifyCode}
          style={styles.button}>
          <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
          </>
        ) : (
          <>
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
                placeholder="EMAIL ADDRESS"
                value={email}
                onChangeText={(val) => setEmail(val)}
              />
            </View>
            <TouchableOpacity
              onPress={sendEmail}
              style={styles.button}>
              <Text style={styles.buttonText}>Send link to email address</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  resetText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginVertical: hp2(4),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    marginLeft: wp2(8),
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
    marginVertical: hp2(2),
    alignSelf: 'center',
  },
  button: {
    width: wp2(62),
    height: hp2(7),
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
    //marginVertical:hp(2),
    marginTop: hp2(2),
    alignSelf: 'center',
    marginBottom: hp2(8),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(11),
    textTransform: 'uppercase',
  },
});
