import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
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
import {useNavigation} from '@react-navigation/native';

import {errorMessage, successMessage} from '../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../config/helperFunction';
import {GetUserBasket} from '../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function BasketComp(props) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const {products} = useSelector(state => state.GuestBasket);

  const onIncreament = (indexVal) => {
    dispatch({
      type: types.IncreamentQuantity,
      payload: products[indexVal]
    });
  }

  const onDecreament = (indexVal) => {
    if(products[indexVal]?.Quantity===1){
      Alert.alert(
        'Confirmation',
        'Do you want to remove this product from your basket?',
        [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              dispatch({
                type: types.RemoveFromBasketGuest,
                payload: products[indexVal]
              });
            },
          },
        ],
      );    
    }else{
      dispatch({
        type: types.DecreamentQuantity,
        payload: products[indexVal]
      });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('imageViewScreen')}
        style={styles.imageWrap}>
        <Image
          //source={IMAGES.randomPic}
          source={{uri:props?.data?.data?.product_images[0].image[0]?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleTxt}>{props?.data?.data?.name}</Text>
        <Text style={styles.priceTxt}>£{props?.data?.data?.price}</Text>
        
        <View style={{flexDirection:'row',alignItems:'center',marginVertical:hp2(2)}}>
          <View style={{width:wp2(9),height:wp2(9),backgroundColor:props?.data?.colorId?.color_code,borderRadius:wp2(2),borderWidth:1}}></View>
          <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold',marginLeft:wp2(2)}}>{props?.data?.sizeId?.size?.size}</Text>
          </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.quantityTxt}>{props?.data?.Quantity}</Text>
          <TouchableOpacity onPress={()=>onIncreament(props?.index)} style={styles.button}>
            <ICONS.Entypo name="plus" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onDecreament(props?.index)}
            style={[
              styles.button,
              {backgroundColor: 'white', borderColor: 'black'},
            ]}>
            <ICONS.Entypo name="minus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp2(4),
  },
  titleTxt: {color: 'black', textTransform: 'uppercase'},
  priceTxt: {
    color: 'black',
    textTransform: 'uppercase',
  },
  quantityTxt: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: rfv(20),
    marginRight: wp2(4),
  },

  imageWrap: {
    width: wp2(38),
    height: hp2(18),
    borderRadius: wp2(3),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: wp2(12),
    height: wp2(10),
    backgroundColor: 'black',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    width: wp2(58),
    height: hp2(18),
    paddingHorizontal: wp2(3),
    paddingVertical: hp2(0.5),
    justifyContent: 'space-between',
  },
});
