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

import DateComp from './dateComp';
import CommentComp from './commentComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {ColorsUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function CommentScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{marginLeft: wp2(3), marginRight: wp2(5)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.commentText}>Comments</Text>
      </View>
      <ScrollView contentContainerStyle={{paddingVertical: hp2(2)}}>
        <DateComp />
        <CommentComp text="I ordered an item from represent and I still have not received my items I ordered an item from represent and I still have not received my items" />
        <CommentComp text="I still have not received my items" />
        <CommentComp text="I ordered an item from represent and I still have not received my items" />
        <CommentComp text="I ordered an item from represent and I still have not received my items I ordered" />
        <DateComp />
        <CommentComp text="I ordered an item from represent" />
        <CommentComp text="from represent and I still have not received my items I ordered" />
        <CommentComp text="still have not received my items I ordered an item from represent" />
        <CommentComp text="and I still have not received my items I ordered" />
      </ScrollView>

      <View style={styles.textBox}>
        <TextInput
          placeholder={'Write your text here...'}
          placeholderTextColor={'grey'}
          style={styles.inputTxt}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add your comment</Text>
      </TouchableOpacity>
    </View>
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
  },
  commentText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  textBox: {
    width: wp2(88),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    height: hp2(6),
    //marginVertical:hp2(1),
  },
  button: {
    width: wp2(88),
    height: hp2(6),
    backgroundColor: 'white',
    borderRadius: wp2(4),
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
    marginVertical: hp2(1),
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: rfv(14),
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(14),
  },
});
