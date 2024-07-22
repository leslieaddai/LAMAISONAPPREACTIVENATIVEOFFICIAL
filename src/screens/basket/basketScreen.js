import React, {useState, useEffect} from 'react';
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
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {ICONS, COLORS, wp2, hp2, IMAGES} from '../../theme';
import BasketComp from '../../components/basketComp';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  GetUserBasket,
  BasketQuantityIncreamentDecreament,
  EditorDecrementbasket,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import OneSignal from 'react-native-onesignal';
import EmptyWidget from '../../components/emptyWidget';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../auth/componnets/HeaderComponnet';
import {Divider} from 'react-native-paper';
import fonts from '../../theme/fonts';
import ContinueButton from '../auth/componnets/ContinueBtn';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function BasketScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const {products} = useSelector(state => state.GuestBasket);
  const [count, setCount] = useState();
  const navigation = useNavigation();

  const [totalPrice2, setTotalPrice] = useState(0); // State for total price

  useEffect(() => {
    user?.token !== '' && getBasket();
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
        if (error.response.data.message === 'Unauthenticated.') {
          dispatch({
            type: types.Clearcart,
          });
          dispatch({
            type: types.Logout,
          });
          OneSignal.removeExternalUserId();
        }
      });
  };

  const onIncreament = indexVal => {
    products[0].data?.product_variations?.map((item, index) => {
      if (
        item?.size_id === products[0].sizeId?.size_id &&
        item?.color_id === products[0].colorId?.id
      ) {
        if (item?.quantity > products[0].Quantity) {
          dispatch({
            type: types.IncreamentQuantity,
            payload: products[indexVal],
          });
        } else {
          errorMessage('Quantity Outreach');
        }
      }
    });
  };

  const onIncreamentEditor = basketId => {
    setLoading2(true);
    axios
      .post(
        BasketQuantityIncreamentDecreament,
        {basket_id: basketId, type: 'increment'},
        {
          headers: {Authorization: `Bearer ${user?.token}`},
        },
      )
      .then(async function (res) {
        let tempArr = data;
        tempArr[0].qty = tempArr[0].qty + 1;
        setCount(count + 1);
        setData(tempArr);
        setLoading2(false);
      })
      .catch(function (error) {
        setLoading2(false);
        errorMessage(errorHandler(error));
      });
  };

  const onDecreamentEditor = basketId => {
    if (count < 2) {
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
                    type: types.RemoveFromBasket,
                  });
                  getBasket();
                  setLoading2(false);
                })
                .catch(function (error) {
                  setLoading2(false);
                  errorMessage(errorHandler(error));
                });
            },
          },
        ],
      );
    } else {
      setLoading2(true);

      axios
        .post(
          BasketQuantityIncreamentDecreament,
          {basket_id: basketId, type: 'decrement'},
          {
            headers: {Authorization: `Bearer ${user?.token}`},
          },
        )
        .then(async function (res) {
          let tempArr = data;
          tempArr[0].qty = tempArr[0].qty - 1;
          setCount(count - 1);
          setData(tempArr);
          setLoading2(false);
        })
        .catch(function (error) {
          setLoading2(false);

          errorMessage(errorHandler(error));
        });
    }
  };

  const onDecreament = indexVal => {
    if (products[indexVal]?.Quantity === 1) {
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
                payload: products[indexVal],
              });
            },
          },
        ],
      );
    } else {
      dispatch({
        type: types.DecreamentQuantity,
        payload: products[indexVal],
      });
    }
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <NewHeaderComp
            arrowNavigation={() => props.navigation.goBack()}
            movePreviousArrow={true}
            title={'Basket'}
          />
          {user?.token !== '' ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}>
              {loading && data?.length === 0 ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <SkypeIndicator color={'black'} />
                </View>
              ) : !loading && data?.length === 0 ? (
                <EmptyWidget
                  image={IMAGES.nobacket}
                  upperText="Nothing In Your Basket"
                  lowerText="There are no products added in the basket"
                  buttonText="Add Items"
                  onButtonPress={() => props.navigation.navigate('homeScreen')}
                />
              ) : (
                <>
                  {console.log(data)}
                  {/* <SafeAreaView */}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({item, index}) => (
                      <View>
                        <BasketComp
                          totprice={{totalPrice2, setTotalPrice}}
                          allData={{data, setData}}
                          data={item}
                          index={index}
                          basket={{getBasket}}
                        />

                        <Divider
                          style={{
                            marginTop: 15,
                          }}
                        />
                      </View>
                    )}
                    ItemSeparatorComponent={() => <Divider></Divider>}
                  />

                  {data?.length !== 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        backgroundColor: 'black',
                        paddingHorizontal: 20,
                      }}>
                      {/* {totalPrice2} */}
                      <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={styles.txt}>Total Price:</Text>
                        <Text style={styles.txtcount}>£{totalPrice2}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('checkoutScreen', {data})
                        }
                        style={styles.checkoutButton}>
                        <Text style={styles.buttonText}>CHECKOUT</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: hp2(4),
                paddingBottom: hp2(12),
                flexGrow: 1,
              }}>
              {products?.length !== 0 ? (
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('imageViewScreen', {
                        item: products[0]?.data?.product_images,
                      })
                    }
                    style={styles.imageWrap}>
                    <Image
                      source={{
                        uri: products[0]?.data?.product_images[0].image[0]
                          ?.original_url,
                      }}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View style={styles.detailsContainer}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: fonts.PoppinsMedium,
                        fontSize: rfv(14),
                      }}>
                      {products[0]?.data?.name}
                    </Text>
                    <View
                      style={{
                        width: '45%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'rgba(122, 122, 122, 0.1)',
                        borderRadius: 20,
                      }}>
                      <TouchableOpacity
                        disabled={loading2}
                        onPress={() => onDecreament(0)}
                        style={[
                          styles.button,
                          {
                            backgroundColor: 'white',
                            borderColor: 'white',
                          },
                        ]}>
                        <ICONS.Entypo name="minus" size={30} color="grey" />
                      </TouchableOpacity>

                      {loading2 ? (
                        <SkypeIndicator size={20} style={{}} color={'black'} />
                      ) : (
                        <Text
                          style={[
                            styles.quantityTxt,
                            //  {position: 'absolute'}
                            {
                              paddingHorizontal: 10,
                            },
                          ]}>
                          {products[0]?.Quantity}
                        </Text>
                      )}

                      <TouchableOpacity
                        disabled={loading2}
                        onPress={() => onIncreament(0)}
                        style={[
                          styles.button,
                          {
                            // marginRight:5,
                          },
                        ]}>
                        <ICONS.Entypo name="plus" size={30} color="grey" />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        color: 'black',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        fontSize: 18,
                      }}>
                      £{products[0]?.data?.price}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginTop: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    flex: 1,
                  }}>
                  <Image
                    style={{width: 116, height: 128}}
                    source={IMAGES.empty_basket}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      gap: 10,
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>
                      Nothing In Your Basket
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        color: '#A1A1AA',
                        textAlign: 'center',
                      }}>
                      Start exploring and add items in your basket
                    </Text>
                  </View>
                  <ContinueButton
                    onPress={() => props.navigation.goBack()}
                    style={{
                      marginTop: 60,
                      width: '95%',
                    }}
                    text={'Add Items'}
                  />
                </View>
              )}

              <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={({item, index}) => {
                  return (
                    index !== 0 && <BasketComp data={item} index={index} />
                  );
                }}
              />
              {products?.length !== 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                    alignItems: 'flex-start',
                    backgroundColor: 'black',
                    paddingHorizontal: 20,
                  }}>
                  {/* {totalPrice2} */}
                  <View style={{flex: 1, marginLeft: 10}}>
                    <Text style={styles.txt}>Total Price:</Text>
                    <Text style={styles.txtcount}>
                      £{products[0]?.data?.price}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('checkoutScreen', {data})
                    }
                    style={styles.checkoutButton}>
                    <Text style={styles.buttonText}>CHECKOUT</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    paddingVertical: 100,
    width: '100%',
    // flexDirection: 'row', // Make it a row
    borderWidth: 1,
    // alignItems: 'center',
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  basket: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    marginLeft: wp2(4),
  },
  imageWrap: {
    width: wp2(38),
    height: hp2(18),
    borderRadius: 5,
    overflow: 'hidden',
  },
  button: {
    width: wp2(8),
    height: wp2(8),
    marginVertical: 1,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    width: wp2(58),
    height: hp2(18),
    paddingHorizontal: wp2(3),
    paddingVertical: hp2(0.5),
    justifyContent: 'space-between',
  },
  checkoutButton: {
    width: wp2(36),
    height: hp2(5),
    backgroundColor: 'white',
    borderRadius: wp2(2),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: hp2(4),
    marginVertical: 30,
  },
  buttonText: {
    color: 'black',
    fontFamily: fonts.PoppinsBold,
    fontSize: rfv(11),
  },

  txt: {
    color: 'white',
    fontFamily: fonts.PoppinsMedium,
    fontSize: rfv(14),
    paddingTop: 30,
  },
  txtcount: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: rfv(24),
    paddingBottom: 20,
    // paddingTop:30
  },
});
