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
  Alert,
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
import BottomComp from '../../components/bottomComp';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { LogoutUrl } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

export default function SettingsScreen(props) {

  const [loading, setLoading] = useState(false);
  //const user = useSelector(state => state.userData)
  //console.log(props?.route?.params?.user)
  
  const dispatch = useDispatch()

    const settingOptions = (name,badge,navScreen) => {
        return(
            <TouchableOpacity onPress={()=>props.navigation.navigate(navScreen,{user:props.route.params.user})} style={styles.filters}>
            <Text style={{color: name=='LOGOUT'?"#EB1414":'black',fontWeight:name=='LOGOUT'?"700":'normal'}}>{name}</Text>
           {badge=='blue' && (
             <View style={styles.circle}>
                <Text style={{color:'white'}}>1</Text>
             </View>
           )}
             {badge=='red' && (
             <View style={[styles.circle,{backgroundColor:'#B00002'}]}></View>
           )}
           {name!='LOGOUT' && (
             
             <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
            
           )}
          </TouchableOpacity>
        )
    }

  const logoutButton = () => {

    const logoutHandle = () => {
      Alert.alert('Confirmation', 'Do you want to logout?', [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {

          setLoading(true);
          console.log(props?.route?.params?.user?.token)

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: LogoutUrl,
            headers: { 
              'Authorization': `Bearer ${props?.route?.params?.user?.token}`, 
              'Accept': 'application/json'
            },
          };
          
          // axios
          // .post(LogoutUrl,
          //   {
          //     headers: {'Authorization': `Bearer ${user.token}`},
          //   }
          // )
          axios.request(config)
          .then(async function (res) {
             console.log(res.data);

            //  props.navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'settingsScreen',params:{user:props?.route?.params?.user} }],
            // });

             dispatch({
              type: types.Logout
            });

             setLoading(false);
             successMessage('Logout Success')
          }) 
          .catch(function (error) {
            console.log(error.response.data)
            setLoading(false);
            errorMessage('Logout Failed')
            //errorMessage(errorHandler(error))
          });

          // props.navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'settingsScreen',params:{user:props.route.params.user} }],
          // });
          // dispatch({
          //   type: types.Logout
          // });
          
          // props.navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'guestScreen' }],
          // });
        }
        },
      ]);
    }

    return(
      <TouchableOpacity onPress={logoutHandle} style={styles.filters}>
            <Text style={{color: "#EB1414",fontWeight:"700"}}>LOGOUT</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
     <View style={{position:'absolute',zIndex:999}}>
{loading && (
      <LoaderComp/>
    )}
</View>
     <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Settings</Text>
      </View>

      {props?.route?.params?.user?.userData?.role?.[0]?.id === 3 ?(
        <>
        {settingOptions('PROFILE','','editProfile')}
        {settingOptions('IMAGE/PRODUCT UPLOAD','','destinationScreen')}
        {settingOptions('INVENTORY','red','inventory')}
        {settingOptions('STANDARD SHIPPING','','shippingLocation')}
        {settingOptions('ANALYTICS','','analyticsScreen')}
        {settingOptions('ALL ORDERS','blue','orderTrackingScreen')}
        {settingOptions('TERM OF USE','','termsScreen')}
        {settingOptions('PRIVACY & SECURITY','','privacyScreen')}
        {settingOptions('CUSTOMER ADVICE','','customerSupportScreen')}
        {/* {settingOptions('LOGOUT','','guestScreen')} */}
        {logoutButton()}
        </>
      ):(
        <>
        {settingOptions('PROFILE','','editProfile')}
        {settingOptions('NOTIFICATIONS','','notificationScreen')}
        {settingOptions('SHIPPING ADDRESS','','shippingAddress')}
        {settingOptions('ALL ORDERS','','orderTrackingScreen')}
        {settingOptions('TERM OF USE','','termsScreen')}
        {settingOptions('PRIVACY & SECURITY','','privacyScreen')}
        {settingOptions('CUSTOMER ADVICE','','customerSupportScreen')}
        {/* {settingOptions('LOGOUT','','guestScreen')} */}
        {logoutButton()}
        </>
      )}

      {/* <BottomComp /> */}
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
  headWrap: {
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  heading: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
  },
  filters: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(2),
  },
  circle:{
    width:wp2(6),
    height:wp2(6),
    backgroundColor:'#0F2ABA',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:wp2(8),
  },
});
