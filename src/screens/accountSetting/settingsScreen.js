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
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';

export default function SettingsScreen(props) {
  
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
          dispatch({
            type: types.Logout
          });
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
    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Settings</Text>
      </View>

      {props.route.params.user == 'brand'?(
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

      <BottomComp />
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
