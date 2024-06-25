import React, {useState} from 'react';
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

import {COLORS, wp2, hp2} from '../../theme';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {CustomerAdvisesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import LoaderComp from '../../components/loaderComp';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function CustomerSupportScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const onSend = () => {
    if (selected !== '' && desc !== '') {
      setLoading(true);
      let obj = {
        user_id: props?.route?.params?.user?.userData?.id,
        description: desc,
        emotion: selected,
      };
      axios
        .post(CustomerAdvisesUrl, obj, {
          headers: {
            Authorization: `Bearer ${props?.route?.params?.user?.token}`,
          },
        })
        .then(async function (res) {
          setLoading(false);
          successMessage('Done!');
          props.navigation.goBack();
        })
        .catch(function (error) {
          setLoading(false);

          errorMessage(errorHandler(error));
        });
    } else {
      errorMessage('Please fill all details!');
    }
  };

  const [selected, setSelected] = useState('');
  const [desc, setDesc] = useState('');

  const options = text => {
    return (
      <TouchableOpacity
        onPress={() => setSelected(text)}
        style={styles.optionWrap}>
        <View
          style={[
            styles.checkbox,
            {backgroundColor: selected == text ? COLORS.main : 'white', borderWidth: 1, borderColor: COLORS.gray400},
          ]}></View>
        <Text style={{color: 'black', fontSize: 16,}}>{text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <NewHeaderComp
            title={'Customer Advice'}
            arrowNavigation={() => props.navigation.goBack()}
            movePreviousArrow={true}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: hp2(12),
              paddingHorizontal: 20,
            }}>
            <View style={styles.textBox}>
              <TextInput
                placeholder={'Write Review'}
                placeholderTextColor={'black'}
                multiline={true}
                value={desc}
                onChangeText={val => setDesc(val)}
                style={styles.inputTxt}
              />
            </View>

            <Text style={styles.txt}>How do you feel?</Text>

            {options('Angry')}
            {options('Worried')}
            {options('Upset')}
            {options('Excited')}
            {options('Confused')}
            {options('Panicked')}
            <TouchableOpacity onPress={onSend} style={styles.button}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 16,}}>Send</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
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
  customerText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(20),
  },
  textBox: {
    width: '100%',
    height: 121,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    marginTop: hp2(4),
    marginBottom: hp2(2),
    padding: 10,
  },
  optionWrap: {
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.gray100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  checkbox: {
    width: wp2(5),
    height: wp2(5),
    borderRadius: 4,
  },
  button: {
    marginTop: 40,
    width: '100%',
    paddingVertical: 15,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    fontWeight: '400',
    fontSize: rfv(14),
    textAlignVertical: 'top',
  },
  txt: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
});
