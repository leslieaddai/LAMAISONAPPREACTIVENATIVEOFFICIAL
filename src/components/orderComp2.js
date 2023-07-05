import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../theme/fonts';
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
} from '../theme';

import {errorMessage, successMessage} from '../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../config/helperFunction';
import {GetBrandOrders} from '../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function OrderComp2(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  return (
    <View style={styles.container}>
      <View style={styles.imgWrap}>
        <Image
          //source={IMAGES.randomProfile}
          source={{uri:props?.data?.product?.product_images?.[0]?.image?.[0]?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={{marginLeft: wp2(3)}}>
        <Text style={{color: '#065521', fontWeight: '600', fontSize: rfv(14)}}>
          Delivered
        </Text>
        <Text style={{color: 'black'}}>{props?.data?.product?.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(92),
    height: hp2(10),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp2(0.5),
  },
  imgWrap: {
    width: wp2(16),
    height: wp2(18),
    overflow: 'hidden',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
