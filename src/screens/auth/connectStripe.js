import React, {useState,useEffect,useRef} from 'react';
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
  Modal,
  Linking,
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

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {ConnectAccountLink} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

import WebView from 'react-native-webview';

export default function ConnectStripe(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState('');

  const webView = useRef();

  const handleMessage = (event) => {
    // Handle the received message from the web page
    console.log('Received message from web page:', event.nativeEvent.data);
    if(event?.nativeEvent?.data == 'Hello from Web Page!'){
        setShowModal(false);
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'loginScreen' }] 
          })
    }
  };
  const injectedJS = `
    console.log("WebView console log: Hello from WebView");
  `;

  const onStripeConnect = () => {
    axios
      .post(ConnectAccountLink, {stripe_account_id:props?.route?.params?.data?.id})
      .then(async function (res) {
       
        setConnectUrl(res?.data?.data?.url)
        setShowModal(true);
      })
      .catch(function (error) {
       
        errorMessage(errorHandler(error))
      });
}

  return (
    <View style={styles.container}>
        <SafeAreaView></SafeAreaView>
        <Text style={styles.connectText}>Connect Stripe Account</Text>
 
      <Modal animationType="slide"
        transparent={true} visible={showModal}
       
        >
                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={()=> setShowModal(!showModal)} style={styles.cancelButton}>
                              <ICONS.MaterialIcons name="cancel" size={30} color="red" />
                        </TouchableOpacity>
                            <WebView 
                                style={{ flex : 1 }} 
                                source={{uri: connectUrl}}
                                javaScriptEnabled={true}
                                ref={webView}
                               
                            onMessage={handleMessage}
        injectedJavaScript={injectedJS}
        javaScriptEnabledAndroid={true}
                            />
                        </View>
                    </View>
          </Modal>
          <TouchableOpacity onPress={onStripeConnect} style={styles.button}>
              <Text style={styles.buttonText}>Connect Stripe</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
   
  },
  connectText: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignSelf:'center',
  },
  button: {
    width: wp2(60),
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
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(11),
    textTransform: 'uppercase',
  },

  modal : {
    flex : 1,
    justifyContent:'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
},
modalContainer : {
    width : '100%',
    height : '75%',
},
cancelButton:{
  alignItems:'flex-end',
  paddingHorizontal:wp2(1),
},
});
