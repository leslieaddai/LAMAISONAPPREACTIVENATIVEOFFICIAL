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

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {PostReview} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import LoaderComp from '../../components/loaderComp';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import ContinueButton from '../auth/componnets/ContinueBtn';

export default function AddReview(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  pid = props?.route?.params?.data;

  const onSend = () => {
    if (selected !== '' && desc !== '') {
      setLoading(true);

      let obj = {
        user_id: user?.userData?.id,
        product_id: pid,
        review: desc,
        feeling: selected,
      };
      axios
        .post(PostReview, obj, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
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
            styles.circle,
            {backgroundColor: selected == text ? COLORS.main : 'white'},
          ]}
        />
        <Text style={{color: 'black'}}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>

      <SafeAreaView style={{backgroundColor: 'white'}}>
        <NewHeaderComp
          title={'Add review'}
          movePreviousArrow={true}
          arrowNavigation={() => props.navigation.goBack()}
        />
        <View style={styles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: hp2(12),
            }}>
            {/* <View style={styles.headWrap}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{position: 'absolute', left: wp2(4)}}>
                <ICONS.AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.customerText}>Write Review</Text>
            </View> */}

            <View style={styles.textBox}>
              <TextInput
                placeholder={'Write review'}
                placeholderTextColor={'grey'}
                multiline={true}
                style={styles.inputTxt}
                onChangeText={val => setDesc(val)}
                value={desc}
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
              }}>
              <Text style={{fontSize: 18}}>How do you feel?</Text>
            </View>
            {options('Angry')}
            {options('Worried')}
            {options('Upset')}
            {options('Excited')}
            {options('Confused')}
            {options('Panicked')}
            <View style={{marginTop: 20, width: '100%'}}>
              <ContinueButton onPress={onSend} text={'Send'} />
            </View>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={{color: 'white'}}>SEND</Text>
            </TouchableOpacity> */}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp2(100),
  },
  customerText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(20),
  },
  textBox: {
    width: wp2(88),
    height: 121,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: wp2(2),
    borderColor: '#D4D4D8',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionWrap: {
    width: wp2(90),
    gap: 15,

    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: hp2(2),
  },
  circle: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#00000030',
    borderRadius: 3,
    backgroundColor: 'white',
  },
  button: {
    width: wp2(32),
    height: wp2(8),
    backgroundColor: 'black',
    borderRadius: wp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: hp2(6),
  },
  inputTxt: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  txt: {color: 'black', fontWeight: '400', marginBottom: hp2(2)},
});
