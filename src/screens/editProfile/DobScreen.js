import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import {
  ICONS,
  COLORS,
  wp2,
  hp2,
} from '../../theme';
import DatePicker from 'react-native-date-picker';
import axios from 'react-native-axios';
import { ChnageDob, ChnagePhone, GetPhone } from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import { successMessage } from '../../config/NotificationMessage';
import {SkypeIndicator} from 'react-native-indicators';
import types from '../../Redux/types';

const DobScreen = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.userData);
    const [open, setOpen] = useState(false);
      const [prevnumber,setPrevNumber] = useState(user?.userData?.dob)
      const [Birthday,setBirthday] = useState(subtractYears(new Date(),6))
      const [userdata,setUser] = useState({})
      const [data,setData] = useState({
          access_token:user?.token,
          user:''
      })
      const updateDataState = (response) => {
          setData({
            access_token: user?.token, 
            user: response.user || '', 
          });
        };
        useEffect(()=>{
          if(data.user!=''){
              console.log("user store",data)
              dispatch({
                  type: types.Login,
                  payload: data,
                });
              props.navigation.navigate('editProfile')
          }
        },[data])
      function subtractYears(date, years) {
          date.setFullYear(date.getFullYear() - years);
          return date;
        }
  
      const ChangePhoneNumber = () =>{
        setLoading(true);
        axios
        .post(ChnageDob,
          {dob:Birthday.toISOString().split('T')[0]},
        {
          headers: {Authorization: `Bearer ${user?.token}`},
        })
        .then(async function (res) {
          // console.log("res",res.data)
          setLoading(false);
          updateDataState(res.data);
          successMessage("DOB Update Successfully")
          
  
        })
        .catch(function (error) {
          setLoading(false);
          console.log("error",error.response.data)
        });
      }
    return (
  
      <SafeAreaView style={styles.container}>
        <View style={{position: 'absolute', zIndex: 999}}>
        {loading &&
        <SkypeIndicator
        style={{
          width: wp2(100),
          height: hp2(100),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        color={'black'}
      />}
        </View>
        <View style={styles.headWrap}>
          <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.heading}>DOB</Text>
        </View>
  
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(4)}}>
        <View style={styles.inputBox}>
              <TextInput
                style={{
                  flex: 1,
                  color: 'black',
                  paddingHorizontal: wp2(2),
                  fontSize: rfv(13),
                  fontWeight: '700',
                }}
                editable={false}
                placeholder={'CURRENT PHONE NUMBER'}
                onChangeText={(e)=>{setPrevNumber(e)}}
                value={prevnumber}
                keyboardType={"number-pad"}
                placeholderTextColor={'grey'}
                maxLength={11}
              />
            </View>
            <TouchableOpacity
            style={styles.BDaystyle}
            onPress={() => setOpen(true)}>
            <Text style={styles.textBox}>{Birthday == null?`BIRTHDAY DD/MM/YYYY`:` ${Birthday.getDate()} - ${ Birthday.getMonth()+1} - ${Birthday.getFullYear()}`}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={Birthday}
            maximumDate={subtractYears(new Date(),6)}
            onConfirm={date => {
              setOpen(false);
             setBirthday(date)
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{ChangePhoneNumber()}}>
            <Text style={styles.buttonText}>CONFIRM</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
}

export default DobScreen

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
      fontSize: rfv(24),
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
      marginTop: hp2(16),
      alignSelf:'flex-end',
      marginRight:wp2(10),
    },
    buttonText: {
      color: 'white',
      fontWeight: '400',
      fontSize: rfv(14),
    },
    BDaystyle: {
      width: wp2(80),
      height: hp2(5),
      backgroundColor: 'white',
      borderRadius: wp2(4),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      flexDirection: 'row',
      alignItems: 'center',
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      marginVertical: hp2(2),
      alignSelf: 'center',
    },
    textBox: {
      flex: 1,
      color: 'black',
      paddingHorizontal: wp2(2),
      fontSize: rfv(13),
      fontWeight: '700',
    },
  });