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

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';

import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function SelectSizes(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  //console.log(props?.route?.params?.color?.id)

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://lamaison.clickysoft.net/api/v1/product/${props?.route?.params?.data?.id}/color/${props?.route?.params?.color?.id}`,
      )
      .then(async function (res) {
        //console.log(res.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  }, []);

  const options = text => {
    return (
      <View style={styles.optionWrap}>
        <Text style={{color: 'black'}}>{text?.size?.size}</Text>
        <Text style={styles.quantityTxt}>{text?.quantity + ' remaining!'}</Text>

        <TouchableOpacity
        disabled={text?.quantity < 1 ? true : false}
          onPress={() => {
            props?.route?.params?.state?.setSizeId(text);
            props?.navigation.goBack();
          }}
          style={[
            styles.circle,
            {
              backgroundColor:
                props?.route?.params?.state?.sizeId?.id === text?.id
                  ? 'black'
                  : '#D9D9D9',
            },
          ]}></TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>SIZE</Text>
      </View>
      <Text style={styles.titleTxt}>
        {props?.route?.params?.data?.category_id === 1
          ? 'Footwear  (U.K)  - select all available sizes'
          : 'Clothing  (U.K)  - select your size'}
      </Text>

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
          {data?.map(item => {
            //console.log("item=======>",item);
            return <>{options(item)}</>;
          })}
        </>
      )}
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
  quantityTxt: {color: '#E81717', position: 'absolute', left: wp2(28)},
  titleTxt: {
    marginVertical: hp2(1),
    alignSelf: 'center',
    color: 'black',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
