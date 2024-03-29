import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import {
  ICONS,
  COLORS,
  wp2,
  hp2,
} from '../../theme';
import BasketComp from '../../components/basketComp';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetUserBasket,BasketQuantityIncreamentDecreament, EditorDecrementbasket} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import OneSignal from 'react-native-onesignal';

export default function BasketScreen(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const {products} = useSelector(state => state.GuestBasket);
  const [count, setCount] = useState();

  useEffect(() => {
   user?.token!=='' && getBasket()
  }, []);

  const getBasket = () => {
    setLoading(true);

    axios
      .get(GetUserBasket, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setData(res?.data?.data);
        setCount(res?.data?.data?.[0]?.qty);
        dispatch({
          type: types.CartCount,
          payload: res?.data?.data?.length,
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response);
        setLoading(false);
        errorMessage(errorHandler(error));
        if(error.response.data.message === 'Unauthenticated.'){
          dispatch({
            type: types.Clearcart,
          });
          dispatch({
            type: types.Logout,
          });
          OneSignal.removeExternalUserId()
        }
      });
  }

  const onIncreament = (indexVal) => {
    products[0].data?.product_variations?.map((item,index)=>{
      if(
        item?.size_id === products[0].sizeId?.size_id && 
        item?.color_id === products[0].colorId?.id
        ){
        if(item?.quantity > products[0].Quantity){
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

  const onIncreamentEditor = (basketId) => {
          setLoading2(true);
          axios
            .post(BasketQuantityIncreamentDecreament,{basket_id:basketId,type:'increment'}, {
              headers: {Authorization: `Bearer ${user?.token}`},
            })
            .then(async function (res) {
             
              let tempArr = data;
              tempArr[0].qty=tempArr[0].qty+1;
              setCount(count+1)
              setData(tempArr);
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
                .delete(`${EditorDecrementbasket}${basketId}`, {
                  headers: {Authorization: `Bearer ${user?.token}`},
                })
                .then(async function (res) { 
                 
                  dispatch({
                    type: types.RemoveFromBasket
                  });
                  getBasket()
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
          
          let tempArr = data;
          tempArr[0].qty=tempArr[0].qty-1;
          setCount(count-1);
          setData(tempArr);
          setLoading2(false);
        })
        .catch(function (error) {
          
          setLoading2(false);
          
          errorMessage(errorHandler(error))
        });
    }
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
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <Text style={styles.basket}>Basket</Text>
      {user?.token !== '' ? (
              <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: hp2(4),
                paddingBottom: hp2(12),
              }}>
                {loading && data?.length===0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SkypeIndicator color={'black'} />
        </View>
      ) : !loading && data?.length === 0 ? (
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          flex:1,}}>
          <Text>There are no product added in basket</Text>
          </View>
      ) : (
        <>
              {data?.length!==0 && 
              <View style={{
                flexDirection: 'row', 
                alignSelf: 'center'}}>
              <TouchableOpacity 
              onPress={()=>props.navigation.navigate('imageViewScreen',{item:data[0]?.product?.product_images})} 
              style={styles.imageWrap}>
                <Image
                  source={{uri:data[0]?.product?.product_images[0]?.image[0]?.original_url}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={styles.detailsContainer}>
                <Text style={{
                  color: 'black', 
                  textTransform: 'uppercase'
                  }}>
                  {data[0]?.product?.name}
                </Text>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:hp2(4)}}>
                <View style={{
                  width:wp2(9),
                  height:wp2(9),
                  backgroundColor:data[0]?.color?.color_code,
                  borderRadius:wp2(2),
                  borderWidth:1
                  }}></View>
                <Text style={{
                  color:'black',
                  fontSize:rfv(12),
                  fontWeight:'bold',
                  marginLeft:wp2(2)}}>SIZE : {data[0]?.size?.size}</Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    textTransform: 'uppercase',
                    marginVertical: hp2(4),
                  }}>
                  £{data[0]?.product?.price}
                </Text>      
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {loading2 ? (
                    <SkypeIndicator size={20} style={{position:'absolute'}} color={'black'} />
                  ) : (
                    <Text
                    style={{
                      color: 'black',
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      fontSize: rfv(20),
                      position:'absolute',
                    }}>
                    {count}
                  </Text>
                  )}
                  <TouchableOpacity 
                  disabled={loading2} 
                  onPress={()=>onIncreamentEditor(data[0]?.id)} 
                  style={[styles.button,
                  {marginLeft:wp2(8)}]}>
                    <ICONS.Entypo 
                    name="plus" 
                    size={30} 
                    color="white"/>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  disabled={loading2} 
                  onPress={()=>onDecreamentEditor(data[0]?.id)}
                    style={[
                      styles.button,
                        {
                        backgroundColor: 'white',
                         borderColor: 'black',
                        },
                    ]}>
                    <ICONS.Entypo 
                    name="minus" 
                    size={30} 
                    color="black"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            }
          
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={({item, index}) => {
                    return index!== 0 && <BasketComp allData={{data,setData}} data={item} index={index} basket={{getBasket}} /> ;
                  }}
                />
      
             {data?.length!==0 && 
              <TouchableOpacity onPress={() => props.navigation.navigate('checkoutScreen',{data})} style={styles.checkoutButton}>
              <Text style={styles.buttonText}>CHECKOUT</Text>
            </TouchableOpacity>
            }
               
        </>
      )}
            </ScrollView>
      ) : (
              <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: hp2(4),
                paddingBottom: hp2(12),
              }}>
      
              {products?.length!==0 ? 
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <TouchableOpacity 
              onPress={()=>props.navigation.navigate('imageViewScreen',{item:products[0]?.data?.product_images})} 
              style={styles.imageWrap}>
                <Image
                 
                  source={{uri:products[0]?.data?.product_images[0].image[0]?.original_url}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={styles.detailsContainer}>
                <Text style={{color: 'black', textTransform: 'uppercase'}}>
                  {products[0]?.data?.name}
                </Text>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:hp2(4)}}>
                <View style={{
                  width:wp2(9),
                  height:wp2(9),
                  backgroundColor:products[0]?.colorId?.color_code,
                  borderRadius:wp2(2),
                  borderWidth:1}}></View>
                <Text style={{
                  color:'black',
                  fontSize:rfv(12),
                  fontWeight:'bold',
                  marginLeft:wp2(2)}}>SIZE : {products[0]?.sizeId?.size?.size}</Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    textTransform: 'uppercase',
                    marginVertical: hp2(4),
                  }}>
                  £{products[0]?.data?.price}
                </Text>
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
            : 
            <View style={{
              alignItems:'center',
              justifyContent:'center',
              flex:1,}}>
                <Text>There are no product added in basket</Text>
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
              <TouchableOpacity 
              onPress={() => props.navigation.navigate('checkoutScreen')} 
              style={styles.checkoutButton}>
              <Text style={styles.buttonText}>CHECKOUT</Text>
            </TouchableOpacity>
            }
            </ScrollView>
      )}
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
