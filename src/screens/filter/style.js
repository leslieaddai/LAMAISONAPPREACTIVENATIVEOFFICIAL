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
import {useNavigation} from '@react-navigation/native';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {StylesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function Style(props) {
  const {Style, Id} = useSelector(state => state.Style);
  const [selected, setSelected] = useState(Id);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    setLoading(true);

    axios
      .get(StylesUrl)
      .then(async function (res) {
        //  console.log(res.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        errorMessage('Something went wrong!');
        //errorMessage(errorHandler(error))
        //errorMessage('Login Failed');
      });
  }, []);

  const options = text => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(text?.id);
          dispatch({
            type: types.Styleadd,
            payload: {style: text?.name, id: text?.id},
          });
          navigation.goBack();
        }}
        style={styles.optionWrap}>
        <Text style={{color: 'black'}}>{text?.name}</Text>
        <View
          style={[
            styles.circle,
            {backgroundColor: selected == text?.id ? 'black' : '#D9D9D9'},
          ]}></View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            // dispatch({
            //   type:types.Styleadd,
            //   payload:selected
            // })
          }}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>STYLE</Text>
      </View>

      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp2(6),
          }}>
          <SkypeIndicator color={'black'} />
        </View>
      ) : (
        <>
          {data?.map((item, index) => {
            //console.log("item=======>",item);
            return <View key={index}>{options(item)}</View>;
          })}
        </>
      )}

      {/* {options('ACTIVEWEAR')}
      {options('BEACHWEAR')}
      {options('NIGHTLIFE')}
      {options('OUTDOORWEAR')}
      {options('STREETWEAR')}
      {options('WORKWEAR')}
      {options('ACCESSORIES')} */}
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
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width: wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
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
    alignSelf: 'center',
  },
  circle: {
    width: wp2(5),
    height: wp2(5),
    //backgroundColor:'#D9D9D9',
    borderRadius: 100,
  },
});
