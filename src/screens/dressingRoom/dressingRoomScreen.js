import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  SafeAreaView,
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
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import BottomComp from '../../components/bottomComp';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { AddToBasketUrl,AddWishListUrl } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function DressingRoomScreen(props) {
  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const [hanger, setHanger] = useState(false);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)

  const AddBasket = () => {
    Alert.alert('Confirmation', 'Do you want to add this product into your basket?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => {

        setLoading(true);

        let obj = {
          user_id: user?.userData?.id,
          product_id:1,
          qty:1,
          size_id:1,
          color_id:1,
          style_id:1,
          category_id: 1,
          piece_id:1
      };

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: AddToBasketUrl,
          headers: { 
            'Authorization': `Bearer ${user.token}`, 
            'Accept': 'application/json'
          },
          data : obj
        };

        axios.request(config)
        .then(async function (res) {
           console.log(res.data);

           dispatch({
            type: types.AddToBasket
          });
          
           setLoading(false);
           successMessage('Success')
        }) 
        .catch(function (error) {
          console.log(error.response.data)
          setLoading(false);
          errorMessage('Failed')
        });

      }
      },
    ]);
  }

  const AddWishlist = () => {
    Alert.alert('Confirmation', 'Do you want to add this product into your wishlist?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => {

        setLoading(true);

        let obj = {
          user_id: user?.userData?.id,
          product_id:66
      };

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: AddWishListUrl,
          headers: { 
            'Authorization': `Bearer ${user.token}`, 
            'Accept': 'application/json'
          },
          data : obj
        };

        axios.request(config)
        .then(async function (res) {
           console.log(res.data);
           setLoading(false);
           successMessage('Success')
        }) 
        .catch(function (error) {
          console.log(error.response.data)
          setLoading(false);
          errorMessage('Failed')
        });

      }
      },
    ]);
  }

  const scrollX = new Animated.Value(0);
  return (
    <>
    {loading && 
    <View style={{ width: wp2(100), height: hp2(100), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <SkypeIndicator color={'black'} />
    </View>
    }
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{marginLeft: wp2(3), marginRight: wp2(5)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.dressingText}>DRESSING ROOM</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp2(12), paddingTop: hp2(2)}}>
          <View style={styles.iconWraper}>
            <View style={styles.shadow}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('brandProfileScreen')}
                style={styles.brandImage}>
                <Image
                  source={IMAGES.randomPic}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                heart ? setHeart(false) : setHeart(true);
              }}>
              <ICONS.AntDesign
                name="heart"
                size={24}
                color={heart ? '#FC0004' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>1000</Text>
            <TouchableOpacity
              onPress={() => {
                hanger ? setHanger(false) : setHanger(true);
              }}>
              <ICONS.MaterialCommunityIcons
                name="hanger"
                size={34}
                color={hanger ? '#162FAC' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>1500</Text>
            <TouchableOpacity
              onPress={() => {
                share ? setShare(false) : setShare(true);
              }}>
              <ICONS.FontAwesome
                name="retweet"
                size={24}
                color={share ? '#13D755' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>3000</Text>
          </View>

          <View style={{flexDirection: 'row', marginVertical: hp2(1)}}>
            <View style={styles.imagesWrap}>
              <View style={styles.shadow}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('imageViewScreen')}
                  style={[
                    styles.brandImage,
                    {width: wp2(54), height: hp2(28), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    source={IMAGES.randomPic}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {
                      width: wp2(54),
                      height: hp2(28),
                      borderRadius: wp2(2),
                      backgroundColor: '#F0F0F0',
                    },
                  ]}>
                  <Animated.ScrollView
                    //style={{flexGrow:0,}}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {x: scrollX}}}],
                      {useNativeDriver: true},
                    )}>
                      <View style={styles.textBox}>
                      <Text style={[styles.headingText,{alignSelf:'flex-start',marginLeft:wp2(1),fontSize:rfv(14),marginBottom:hp2(1)}]}>
                        VADER IV
                      </Text>
                      <Text style={{color:'black',fontSize:rfv(12),marginLeft:wp2(1),marginBottom:hp2(1)}} >PRICE: £795</Text>
                      <Text style={styles.text}>
                      Description: The arrivals Vader IV features a vergetable tanned leather, treated with natural compunds and a light water resistant finish. details include outer pockets, custom branding and excella hardware finishing. 
                      </Text>
                    </View>

                    <View style={styles.textBox}>
                      <Text style={styles.headingText}>
                        shipping information
                      </Text>
                      <Text style={styles.text}>
                        Free shipping Worldwide, you may be subject to taxes
                        depending on where the item will be shipped to.
                      </Text>
                    </View>

                    <View style={styles.textBox}>
                      <Text style={styles.headingText}>
                        La maison App Notice
                      </Text>
                      <Text style={styles.text}>
                        the cost of shipping is <Text style={{color:'#0F2ABA',fontWeight:'700'}}>not</Text> decided by LA Maison App.
                        this is decided by the brands themselves. <Text style={{color:'#0F2ABA',fontWeight:'700'}}>the country
                        the product is delivered to may add additional taxes.</Text>
                      </Text>
                    </View>
                  </Animated.ScrollView>
                  <View
                    style={{
                      width: wp2(54),
                      height: hp2(2),
                    }}>
                    <RNAnimatedScrollIndicators
                      numberOfCards={3}
                      scrollWidth={wp2(54)}
                      activeColor={'#707070'}
                      inActiveColor={'#D9D9D9'}
                      scrollAnimatedValue={scrollX}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.imagesWrap, {width: wp2(40)}]}>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {width: wp2(34), height: hp2(14), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    source={IMAGES.randomPic}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {width: wp2(34), height: hp2(14), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    source={IMAGES.vinDiesel}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {width: wp2(34), height: hp2(14), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    source={IMAGES.randomPic}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.shadow}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('colourClothing')}
                  style={[
                    styles.brandImage,
                    {
                      width: wp2(34),
                      height: hp2(14),
                      borderRadius: wp2(2),
                      backgroundColor: '#168B16',
                    },
                  ]}></TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.filters}>
            <Text style={{color: 'black'}}>SIZE</Text>
            <Text
              style={{color: 'black', fontSize: rfv(22), marginLeft: wp2(66)}}>
              9
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('sizeClothing')}>
              <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
            </TouchableOpacity>
          </View>
          <View style={styles.filters}>
            <Text style={{color: 'black'}}>REVIEWS</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('review')}>
              <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('checkoutScreen')}
            style={[
              styles.button,
              {alignSelf: 'center', marginVertical: hp2(4)},
            ]}>
            <Text style={styles.buttonText}>BUY NOW</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={AddBasket}
              style={[
                styles.button,
                {width: wp2(36), marginHorizontal: wp2(2)},
              ]}>
              <Text style={styles.buttonText}>ADD TO BASKET</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={AddWishlist}
              style={[
                styles.button,
                {width: wp2(36), marginHorizontal: wp2(2)},
              ]}>
              <Text style={styles.buttonText}>ADD TO WISHLIST</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
  },
  dressingText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  iconWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp2(1),
  },

  brandImage: {
    width: wp2(16),
    height: hp2(8),
    overflow: 'hidden',
    borderRadius: wp2(6),
    //marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //elevation: 5,
  },
  imagesWrap: {
    height: hp2(60),
    width: wp2(60),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textBox: {width: wp2(54), height: hp2(28)},
  headingText: {
    fontSize: rfv(12),
    fontWeight: '600',
    color: 'black',
    textTransform: 'uppercase',
    marginVertical: hp2(2),
    alignSelf: 'center',
  },
  text: {
    textTransform: 'uppercase',
    color: 'black',
    textAlign: 'auto',
    fontSize: rfv(10),
    paddingHorizontal: wp2(1),
  },
  filters: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(1),
  },
  button: {
    width: wp2(26),
    height: hp2(5),
    backgroundColor: 'black',
    borderRadius: wp2(10),
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
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(11),
  },
});
