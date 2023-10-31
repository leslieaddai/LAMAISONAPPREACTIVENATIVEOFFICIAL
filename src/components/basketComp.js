import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,

  Alert,
} from 'react-native';

import {
 
  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  
  ICONS,
  
  wp2,
  hp2,
 
} from '../theme';
import {useNavigation} from '@react-navigation/native';

import {errorMessage} from '../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../config/helperFunction';
import {API_BASED_URL, BasketQuantityIncreamentDecreament} from '../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function BasketComp(props) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const {products} = useSelector(state => state.GuestBasket);
  const [count, setCount] = useState(Number(props?.data?.qty));

  const onIncreament = (indexVal) => {
    props?.data?.data?.product_variations?.map((item,index)=>{
      if(item?.size_id === props?.data?.sizeId?.size_id && item?.color_id === props?.data?.colorId?.id){
        if(item?.quantity > props?.data?.Quantity){
          dispatch({
            type: types.IncreamentQuantity,
            payload: products[indexVal]
          });
        }else{
          errorMessage('Quantity Outreach')
        }
      }
    })
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

  const onIncreamentEditor = (basketId) => {
    setLoading2(true);

    axios
      .post(BasketQuantityIncreamentDecreament,{basket_id:basketId,type:'increment'}, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        let tempArr = props?.allData?.data;
        tempArr[props?.index].qty=tempArr[props?.index].qty+1;
        props?.allData?.setData(tempArr);

        setCount(count+1)
        setLoading2(false);
      })
      .catch(function (error) {
        setLoading2(false);
        errorMessage(errorHandler(error))
      });
}

const onDecreamentEditor = (basketId) => {
  if(count<2){
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
        setLoading2(true);

        axios
          .delete(`${API_BASED_URL}baskets/${basketId}`, {
            headers: {Authorization: `Bearer ${user?.token}`},
          })
          .then(async function (res) { 
          
            dispatch({
              type: types.RemoveFromBasket
            });
        
            props?.basket?.getBasket();
            setLoading2(false);
          })
          .catch(function (error) {
           
            setLoading2(false);
   
            errorMessage(errorHandler(error))
          });
      },
    },
  ],
);    
}else{
setLoading2(true);

axios
  .post(BasketQuantityIncreamentDecreament,{basket_id:basketId,type:'decrement'}, {
    headers: {Authorization: `Bearer ${user?.token}`},
  })
  .then(async function (res) {
 
    let tempArr = props?.allData?.data;
    tempArr[props?.index].qty=tempArr[props?.index].qty-1;
    props?.allData?.setData(tempArr);

    setCount(count-1);
    setLoading2(false);
  })
  .catch(function (error) {

    setLoading2(false);

    errorMessage(errorHandler(error))
  });
}
}


  return (
    <View style={styles.container}>
      {user?.token!==''?(
        <>
        <TouchableOpacity
        onPress={() => navigation.navigate('imageViewScreen',{item:props?.data?.product?.product_images})}
        style={styles.imageWrap}>
        <Image
        
          source={{uri:props?.data?.product?.product_images[0].image[0]?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleTxt}>{props?.data?.product?.name}</Text>
        <View style={{flexDirection:'row',alignItems:'center',marginVertical:hp2(1)}}>
          <View style={{width:wp2(9),height:wp2(9),backgroundColor:props?.data?.color?.color_code,borderRadius:wp2(2),borderWidth:1}}></View>
          <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold',marginLeft:wp2(2)}}>SIZE : {props?.data?.size?.size}</Text>
          </View>
        <Text style={styles.priceTxt}>£{props?.data?.product?.price}</Text>
        
        

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {loading2?(
             
                <SkypeIndicator size={20} style={{position:'absolute'}} color={'black'} />
              
          ):(
            <Text style={[styles.quantityTxt,{position:'absolute',}]}>
             
              {count}
              </Text>
          )}
          <TouchableOpacity disabled={loading2} onPress={()=>onIncreamentEditor(props?.data?.id)} style={[styles.button,{marginLeft:wp2(8)}]}>
            <ICONS.Entypo name="plus" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity disabled={loading2} onPress={()=>onDecreamentEditor(props?.data?.id)}
            style={[
              styles.button,
              {backgroundColor: 'white', borderColor: 'black'},
            ]}>
            <ICONS.Entypo name="minus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
        </>
      ):(
        <>
        <TouchableOpacity
        onPress={() => navigation.navigate('imageViewScreen',{item:props?.data?.data?.product_images})}
        style={styles.imageWrap}>
        <Image
       
          source={{uri:props?.data?.data?.product_images[0].image[0]?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleTxt}>{props?.data?.data?.name}</Text>
        <View style={{flexDirection:'row',alignItems:'center',marginVertical:hp2(1)}}>
          <View style={{width:wp2(9),height:wp2(9),backgroundColor:props?.data?.colorId?.color_code,borderRadius:wp2(2),borderWidth:1}}></View>
          <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold',marginLeft:wp2(2)}}>SIZE : {props?.data?.sizeId?.size?.size}</Text>
          </View>
        <Text style={styles.priceTxt}>£{props?.data?.data?.price}</Text>
        
      

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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp2(4),
    paddingVertical:hp2(1),
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
