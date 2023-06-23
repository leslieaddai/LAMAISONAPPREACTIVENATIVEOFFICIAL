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
import BottomComp from '../../components/bottomComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {PostReview} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

export default function AddReview(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  pid = props?.route?.params?.data

  const onSend = () => {
    if (selected !== '' && desc !== '') {
      setLoading(true);

      let obj = {
        user_id: user?.userData?.id,
        product_id:pid,
        review: desc,
        feeling: selected,
      };

      //console.log(obj)

      axios
        .post(PostReview, obj, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(async function (res) {
          console.log(res.data);
          setLoading(false);
          successMessage('Done!');
          props.navigation.goBack();
        })
        .catch(function (error) {
          console.log(error.response.data);
          setLoading(false);
          //errorMessage('Something went wrong!');
          errorMessage(errorHandler(error))
        });
    } else {
      errorMessage('Please fill all details!');
    }
  };

  const [selected, setSelected] = useState('');
  const [desc, setDesc] = useState('');

  const options = text => {
    return (
      <TouchableOpacity  onPress={() => setSelected(text)} style={styles.optionWrap}>
        <Text style={{color: 'black'}}>{text}</Text>
        <View
          style={[
            styles.circle,
            {backgroundColor: selected == text ? 'black' : '#D9D9D9'},
          ]}></View>
      </TouchableOpacity>
    );
  };

  return (
    <>
    <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>

    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: hp2(12),
          }}>
          <View style={styles.headWrap}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{position: 'absolute', left: wp2(4)}}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.customerText}>Add Review</Text>
          </View>

          <View style={styles.textBox}>
            <TextInput
              placeholder={'ADD REVIEW'}
              placeholderTextColor={'grey'}
              multiline={true}
              style={styles.inputTxt}
              onChangeText={val => setDesc(val)}
              value={desc}
            />
          </View>
          <View style={{width: wp2(88)}}>
            <Text style={styles.txt}>How do you feel?</Text>
          </View>
          {options('ANGRY')}
          {options('WORRIED')}
          {options('UPSET')}
          {options('EXCITED')}
          {options('CONFUSED')}
          {options('PANICKED')}
          <TouchableOpacity onPress={onSend} style={styles.button}>
            <Text style={{color: 'white'}}>SEND</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
    alignItems: 'center',
    //justifyContent:'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
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
    marginTop: hp2(4),
    marginBottom: hp2(2),
    paddingHorizontal: wp2(2),
    paddingVertical: wp2(2),
  },
  optionWrap: {
    width: wp2(90),
    height: hp2(4),
    //backgroundColor:'red',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp2(1),
    marginTop: hp2(2),
  },
  circle: {
    width: wp2(5),
    height: wp2(5),
    //backgroundColor:'#D9D9D9',
    borderRadius: 100,
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
    flex: 1,
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(14),
    textAlignVertical: 'top',
  },
  txt: {color: 'black', fontWeight: '700', marginBottom: hp2(2)},
});
