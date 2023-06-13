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
  FlatList,
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
import BasketComp from '../../components/basketComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetUserBasket} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function BasketScreen(props) {

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
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <Text style={styles.basket}>Basket</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: hp2(4),
          paddingBottom: hp2(12),
        }}>

        {products?.length!==0 && 
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('imageViewScreen')} style={styles.imageWrap}>
          <Image
            //source={IMAGES.randomPic}
            source={{uri:products[0]?.data?.product_images[0].image[0]?.original_url}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={{color: 'black', textTransform: 'uppercase'}}>
            {products[0]?.data?.name}
          </Text>
          <Text
            style={{
              color: 'black',
              textTransform: 'uppercase',
              marginVertical: hp2(4),
            }}>
            £{products[0]?.data?.price}
          </Text>

          <View style={{flexDirection:'row',alignItems:'center',marginBottom:hp2(4)}}>
          <View style={{width:wp2(9),height:wp2(9),backgroundColor:products[0]?.colorId?.color_code,borderRadius:wp2(2),borderWidth:1}}></View>
          <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold',marginLeft:wp2(2)}}>{products[0]?.sizeId?.size?.size}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                textTransform: 'uppercase',
                fontWeight: '700',
                fontSize: rfv(20),
                marginRight: wp2(4),
              }}>
              {products[0]?.Quantity}
            </Text>
            <TouchableOpacity onPress={()=>onIncreament(0)} style={styles.button}>
              <ICONS.Entypo name="plus" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onDecreament(0)}
              style={[
                styles.button,
                {backgroundColor: 'white', borderColor: 'black'},
              ]}>
              <ICONS.Entypo name="minus" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      }
    
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({item, index}) => {
              return index!== 0 && <BasketComp data={item} index={index} /> ;
            }}
          />

       {products?.length!==0 && 
        <TouchableOpacity onPress={() => props.navigation.navigate('checkoutScreen')} style={styles.checkoutButton}>
        <Text style={styles.buttonText}>CHECKOUT</Text>
      </TouchableOpacity>
      }

      </ScrollView>
      {/* <BottomComp /> */}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  basket: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    marginLeft: wp2(4),
  },
  imageWrap: {
    width: wp2(52),
    height: hp2(32),
    borderRadius: wp2(4),
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
    width: wp2(44),
    height: hp2(32),
    paddingHorizontal: wp2(3),
    paddingVertical: hp2(2),
  },
  checkoutButton: {
    width: wp2(36),
    height: hp2(5),
    backgroundColor: 'black',
    borderRadius: wp2(10),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp2(4),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(13),
  },
});
