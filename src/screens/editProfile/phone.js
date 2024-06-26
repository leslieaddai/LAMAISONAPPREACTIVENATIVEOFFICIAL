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
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {ICONS, COLORS, wp2, hp2} from '../../theme';
import axios from 'react-native-axios';
import {ChnagePhone} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import {successMessage} from '../../config/NotificationMessage';
import {SkypeIndicator} from 'react-native-indicators';
import types from '../../Redux/types';
import NewInputComp from '../../components/NewInputComp';
import ContinueButton from '../auth/componnets/ContinueBtn';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function Phone(props) {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.userData);
  const [prevnumber, setPrevNumber] = useState(user?.userData?.phone);
  const [newnumber, setNewNumber] = useState('');
  const dispatch = useDispatch();
  const [data, setData] = useState({
    access_token: user?.token,
    user: '',
  });
  const updateDataState = response => {
    setData({
      access_token: user?.token,
      user: response.user || '',
    });
  };
  useEffect(() => {
    if (data.user != '') {
      dispatch({
        type: types.Login,
        payload: data,
      });
      props.navigation.navigate('editProfile');
    }
  }, [data]);

  const ChangePhoneNumber = () => {
    setLoading(true);
    axios
      .post(
        ChnagePhone,
        {phone: newnumber},
        {
          headers: {Authorization: `Bearer ${user?.token}`},
        },
      )
      .then(async function (res) {
        setLoading(false);
        updateDataState(res.data);
        successMessage('Phone Number Update Successfully');
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        <View style={{position: 'absolute', zIndex: 999}}>
          {loading && (
            <SkypeIndicator
              style={{
                width: wp2(100),
                height: hp2(100),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
              color={'black'}
            />
          )}
        </View>
        <NewHeaderComp movePreviousArrow={true} title={'Phone'} arrowNavigation={() => props.navigation.goBack()}/>
        {/* <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.heading}>PHONE</Text>
        </View> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: hp2(4)}}>
          {/* <View style={styles.inputBox}>
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
              onChangeText={e => {
                setPrevNumber(e);
              }}
              value={prevnumber}
              keyboardType={'number-pad'}
              placeholderTextColor={'grey'}
              maxLength={11}
            />
          </View> */}
          {/* <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              maxLength={11}
              placeholder={'NEW PHONE NUMBER'}
              keyboardType={'number-pad'}
              placeholderTextColor={'grey'}
              value={newnumber}
              onChangeText={e => {
                setNewNumber(e);
              }}
            />
          </View> */}
          <NewInputComp
            value={prevnumber}
            handleOnChange={e => {
              setPrevNumber(e);
            }}
            keyboardCustomType="number-pad"
            inputText={'Current Phone Number'}
          />
          <View style={{marginTop: -20}}>
            <NewInputComp
              value={newnumber}
              handleOnChange={e => {
                setNewNumber(e);
              }}
              keyboardCustomType="number-pad"
              inputText={'New Phone Number'}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <ContinueButton onPress={ChangePhoneNumber} text={'Confirm'} />
          </View>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              ChangePhoneNumber();
            }}>
            <Text style={styles.buttonText}>CONFIRM</Text>
          </TouchableOpacity> */}
        </ScrollView>
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
    marginTop: hp2(16),
    alignSelf: 'flex-end',
    marginRight: wp2(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
});
