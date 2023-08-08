import React, {useState, useEffect, useCallback, memo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Animated,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking,
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
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import QuantityComp from '../../components/quantityComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImageCard from './ImageCard';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {StylesUrl, ProductUploadUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import {BottomSheet} from 'react-native-btr';
import BottomSheetShippingView from '../../components/bottomSheet/BottomSheetShippingView';
import LoaderComp from '../../components/loaderComp';
import Icons from '../../theme/icons';

const PAGE_SIZE = 40;

export default function ImageUploadLookbook(props) {


  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const [modalData, setModalData] = useState()
  const [visible, setVisible] = useState(false);


  const scrollX = new Animated.Value(0);

  const [stateChange, setStateChange] = useState({
    productName: '',
    pieces: '',
    piece_id: '',
    description: '',
    price,
    style_id,
    category: props?.route?.params?.item?.id,

  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {
    productName,
    pieces,
    piece_id,
    description,
    price,
    style_id,
    category,

  } = stateChange;

  const [quantity, setQuantity] = useState([
    {color_id: '', color: '', size_id: '', size: '', quantity: ''},
  ]);

  
  const [selectedImage, setSelectedImage] = useState([]);
  const [nextButton, setNextButton] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [uploadButton, setUploadButton] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedText, setSelectedText] = useState('SELECT STYLE');
  const [isOpenedShipping, setIsOpenedShipping] = useState(false);
  const [regions, setRegions] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [after, setAfter] = useState();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [perm, setPerm] = useState(false);
  const [styleVisible, setStyleVisible]= useState(false)


  const toggleBottomNavigationView = () => {
    setVisible(!visible);
    uibottomesheetvisiblity(!visible);
    setIsOpenedShipping(false)
  };
  const togglestylebottomsheet = () =>{
    setStyleVisible(!styleVisible)
    uistylebottomsheetvisibility(!styleVisible)
    setIsOpened(false)
  }
  const uistylebottomsheetvisibility = Bool =>{
   setStyleVisible(Bool)
  }
   
  useEffect(()=>{
    if(isOpened){
      uistylebottomsheetvisibility(true)
    }
  },[isOpened])

  const uibottomesheetvisiblity = Bool => {
    setVisible(Bool);
  };

  useEffect(()=>{            
    if(isOpenedShipping){
      setModalData(props?.route?.params?.shippingData)
      uibottomesheetvisiblity(true)
    }
  },[isOpenedShipping])
  useEffect(() => {


    axios
      .get(StylesUrl, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(async function (res) {
       
        setData(res.data.data);
      
      })
      .catch(function (error) {
   
       
        errorMessage(errorHandler(error))
      });
  }, []);

  const loadMorePhotos = useCallback(async () => {
    if (!hasNextPage || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const {edges, page_info} = await CameraRoll.getPhotos({
        first: PAGE_SIZE,
        after: after,
        include: ['filename'],
      });

      setAfter(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
      setPhotos(prevPhotos => [...prevPhotos, ...edges]);
    } catch (error) {
      console.error('Failed to load more photos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [after, hasNextPage, isLoading]);

  useEffect(() => {
    async function runThis() {
      if (Platform.OS === 'android' && (await hasAndroidPermission())) {
        loadMorePhotos();
      }
      if (Platform.OS === 'ios' && (await hasIosPermission())) {
        loadMorePhotos();
      }
    }
    runThis();
  }, []);

  const checkCondition = async () => {
    if (Platform.OS === 'android' && perm === true) {
      if (!isLoading) {
        loadMorePhotos();
      }
    }
    if (Platform.OS === 'ios' && perm === true) {
      if (!isLoading) {
        loadMorePhotos();
      }
    }
  };


  async function hasAndroidPermission() {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      setPerm(true);
 
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    if (status === 'granted') {
      setPerm(true);
    }
 
    return status === 'granted';
  }

  async function hasIosPermission() {
    const hasPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            return false;
          //break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            return false;
          //break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            //setPerm(true);
            return true;
          //break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            //setPerm(true);
            return true;
          //break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert(
              'Photo Library Permission',
              'Photo Library permission is blocked in the device ' +
                'settings. Allow the app to access Photo Library to ' +
                'see images.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
                {text: 'CANCEL', onPress: () => props.navigation.goBack()},
              ],
            );
            return false;
          //break;
        }
      })
      .catch(error => {
        // …
      });

    if (hasPermission) {
      setPerm(true);
      return true;
    }

    const status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(result => {
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          return true;
        }
      })
      .catch(error => {});

    if (status) {
      setPerm(true);
    }

    return status === true;
  }


  if (uploadButton) {
    return (
      <View
        style={[
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" />
        <Text style={styles.uploadTxt}>Successfully Uploaded!</Text>
      </View>
    );
  }

  const goBackFunction = () => {
    if (nextButton && !showQuantity && !confirmButton) {
      setNextButton(false);
    }
    if (nextButton && showQuantity && !confirmButton) {
      setShowQuantity(false);
    }
    if (nextButton && showQuantity && confirmButton) {
      setConfirmButton(false);
    }
  };

  const productDetails = () => {
    if (
      stateChange.productName !== '' &&
      stateChange.pieces !== '' &&
      stateChange.description !== '' &&
      stateChange.price !== '' &&
      selectedText !== 'SELECT STYLE' &&
      regions.length !== 0
    ) {
      setShowQuantity(true);
    } else {
      errorMessage('Please fill all details!');
    }
  };

  const verifyQuantity = () => {
    let tempDuplicate = quantity.filter(
      (v, i, a) =>
        a.findIndex(
          v2 => v2.color_id === v.color_id && v2.size_id === v.size_id,
        ) === i,
    );
    let tempValue = 0;
    quantity.map((obj, index) => {
      if (
        obj.color === '' ||
        obj.color_id === '' ||
        obj.size === '' ||
        obj.size_id === '' ||
        obj.quantity === ''
      ) {
        errorMessage('Please fill all details!');
        return;
      } else {
        tempValue++;
      }
    });
    if (quantity.length === tempValue) {
      if (quantity.length === tempDuplicate.length) {
        setConfirmButton(true);
      } else {
        errorMessage('Please remove duplicate variations!');
      }
    }
  };

  const addRegions = (item) => {
    regions.some(e => e.regionId === item?.shipping_id)
      ? setRegions(regions.filter(e => e.regionId !== item?.shipping_id))
      : setRegions([
          ...regions,
          {regionName: item?.shipping?.name, regionId: item?.shipping_id},
        ]);
    
  };

  const uploadProduct = () => {
    
    setLoading(true);

    var formdata = new FormData();

    let colorArr = [];
    let sizeArr = [];
    let quantityArr = [];

    quantity.map((item, index) => {
      colorArr.push(item.color_id);
      formdata.append('color[]', item.color_id);

      sizeArr.push(item.size_id);
      formdata.append('size[]', item.size_id);

      quantityArr.push(Number(item.quantity));
      formdata.append('qty[]', Number(item.quantity));
    });

    formdata.append('user_id', user?.userData?.id);
    formdata.append('category_id', stateChange?.category);
    formdata.append('name', stateChange?.productName);
    formdata.append('sku', Math.floor(Math.random() * 899999 + 100000));
   
    formdata.append('description', stateChange?.description);
    formdata.append('price', parseFloat(stateChange?.price).toFixed(2));
    formdata.append('piece_id', stateChange?.piece_id);
    formdata.append('style', String(stateChange?.style_id));
    formdata.append('status', 1);
    selectedImage.map((item, index) => {
      formdata.append('image[]', item);
    });
    regions.map((item, index) => {
      formdata.append('regions[]', item?.regionId);
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ProductUploadUrl,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };

    axios
      .request(config)
      .then(async function (res) {
       
        setLoading(false);
        successMessage('Upload Success');
        setUploadButton(true);

        setTimeout(() => {
          props.navigation.goBack();
        }, 3000);
      })
      .catch(function (error) {
       
        setLoading(false);
       
        errorMessage(errorHandler(error))
      });
  };



  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        {selectedImage?.length !== 0 && !nextButton ? (
          <View style={styles.headWrap}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Lookbook</Text>
            <TouchableOpacity
              onPress={() => setNextButton(true)}
              style={styles.button}>
              <Text style={styles.nextTxt}>NEXT</Text>
            </TouchableOpacity>
          </View>
        ) : nextButton ? (
          <View style={[styles.headWrap, {justifyContent: 'center'}]}>
            <TouchableOpacity
              onPress={goBackFunction}
              style={{position: 'absolute', left: wp2(4)}}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Lookbook</Text>
          </View>
        ) : (
          <View style={[styles.headWrap, {justifyContent: 'center'}]}>
            <Text style={styles.heading}>Lookbook</Text>
          </View>
        )}

        {selectedImage?.length !== 0 ? (
          <View style={styles.scrollViewWrap}>
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}>
              {selectedImage?.map((item, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{uri: item.uri}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </Animated.ScrollView>
            <View style={styles.scrollIndicatorWrap}>
              <RNAnimatedScrollIndicators
                numberOfCards={selectedImage?.length}
                scrollWidth={wp2(94)}
                activeColor={'#707070'}
                inActiveColor={'#D9D9D9'}
                scrollAnimatedValue={scrollX}
              />
            </View>
          </View>
        ) : (
          <View style={styles.imageContainer}>
           
            <Image
              source={IMAGES.selectIMG}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
        )}

        {nextButton && !showQuantity && !confirmButton ? (
          <KeyboardAwareScrollView
            contentContainerStyle={{paddingVertical: hp2(1)}}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholder="PRODUCT NAME"
                placeholderTextColor={'grey'}
                value={stateChange.productName}
                maxLength={20}
                onChangeText={val => updateState({productName: val})}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('pieces', {stateChange, updateState})
              }
              style={[styles.inputBox, {justifyContent: 'center'}]}>
              <Text
                style={{
                  fontSize: rfv(13),
                  fontWeight: '700',
                  color: stateChange.pieces !== '' ? 'black' : 'grey',
                  paddingHorizontal: wp2(2),
                }}>
                {stateChange.pieces !== '' ? stateChange.pieces : 'PIECES'}
              </Text>
            </TouchableOpacity>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholder="DESCRIPTION"
                placeholderTextColor={'grey'}
                value={stateChange.description}
                onChangeText={val => updateState({description: val})}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                isOpenedShipping
                  ? setIsOpenedShipping(false)
                  : setIsOpenedShipping(true)
              }
              style={[
                styles.inputBox,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp2(2),
                  justifyContent: 'space-between',
                },
              ]}>
             
              <Text style={[styles.selectTxt,{width:wp2(70)}]}>
                {regions.length !== 0
                  ? regions.map((item, index) => item?.regionName + ' ')
                  : 'SELECT SHIPPING DETAILS'}
              </Text>
              <View>
                <ICONS.FontAwesome
                  name={isOpenedShipping ? 'chevron-up' : 'chevron-down'}
                  color={'#A1A1A1'}
                  size={22}
                />
              </View>
            </TouchableOpacity>
           
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholder="PRICE (£)"
                placeholderTextColor={'grey'}
                keyboardType="number-pad"
                value={stateChange.price}
                onChangeText={val => updateState({price: val})}
              />
            </View>
           

            <TouchableOpacity
              onPress={() =>
                isOpened ? setIsOpened(false) : setIsOpened(true)
              }
              style={[
                styles.inputBox,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp2(2),
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={styles.selectTxt}>{selectedText}</Text>
              <View>
                <ICONS.FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#A1A1A1'}
                  size={22}
                />
              </View>
            </TouchableOpacity>

            

            <TouchableOpacity
              onPress={productDetails}
              style={[
                styles.button,
                {
                  width: wp2(30),
                  alignSelf: 'flex-end',
                  marginRight: wp2(10),
                  marginTop: hp2(1),
                },
              ]}>
              <Text style={styles.nextTxt}>NEXT</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        ) :
        nextButton && showQuantity && !confirmButton ? (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: hp2(2)}}>
            {quantity?.map((item, index) => (
              <QuantityComp
                key={index}
                key2={index}
                state={{quantity, setQuantity, stateChange}}
              />
            ))}
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginVertical: hp2(1),
              }}>
              {quantity?.length > 1 && (
                <TouchableOpacity
                  onPress={() => {
                    var array = [...quantity];
                    setQuantity(array.slice(0, -1));
                  }}>
                  <ICONS.AntDesign name="minuscircle" size={34} color="red" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() =>
                  setQuantity([
                    ...quantity,
                    {
                      color_id: '',
                      color: '',
                      size_id: '',
                      size: '',
                      quantity: '',
                    },
                  ])
                }
                style={{marginRight: wp2(6), marginLeft: wp2(2)}}>
                <ICONS.AntDesign name="pluscircle" size={34} color="#162FAC" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={verifyQuantity}
              style={[
                styles.button,
                {
                  width: wp2(30),
                  alignSelf: 'flex-end',
                  marginRight: wp2(10),
                  marginTop: hp2(1),
                },
              ]}>
              <Text style={styles.nextTxt}>NEXT</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        ) : nextButton && confirmButton ? (
          <ScrollView contentContainerStyle={{paddingVertical: hp2(1)}}>
            <View
              style={[
                styles.inputBox,
                {justifyContent: 'center', paddingHorizontal: wp2(2)},
              ]}>
              <Text style={styles.selectTxt}>{stateChange.productName}</Text>
            </View>
            <View
              style={[
                styles.inputBox,
                {justifyContent: 'center', paddingHorizontal: wp2(2)},
              ]}>
              <Text style={styles.selectTxt}>{stateChange.pieces}</Text>
            </View>
            <View
              style={[
                styles.inputBox2,
                {
                  minHeight: hp2(6),
                  justifyContent: 'center',
                  paddingHorizontal: wp2(2),
                },
              ]}>
              <Text style={styles.selectTxt}>{stateChange.description}</Text>
            </View>
            
            <View
              style={[
                styles.inputBox,
                {justifyContent: 'center', paddingHorizontal: wp2(2)},
              ]}>
              <Text style={styles.selectTxt}>
                {regions.map((item, index) => item?.regionName + ' ')}
              </Text>
            </View>
            <View
              style={[
                styles.inputBox,
                {justifyContent: 'center', paddingHorizontal: wp2(2)},
              ]}>
              <Text style={styles.selectTxt}>{stateChange.price}</Text>
            </View>
            <View
              style={[
                styles.inputBox,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp2(2),
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={styles.selectTxt}>{selectedText}</Text>
              <ICONS.FontAwesome
                name={'chevron-down'}
                color={'#A1A1A1'}
                size={22}
              />
            </View>

            <TouchableOpacity
              onPress={uploadProduct}
              style={[
                styles.button,
                {width: wp2(54), alignSelf: 'center', marginTop: hp2(2)},
              ]}>
              <Text style={styles.nextTxt}>ADD TO LOOKBOOK</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <>
            {photos?.length > 0 ? (
              <>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingVertical: hp2(2),
                    paddingHorizontal: wp2(2),
                  }}
                  numColumns={4}
                  data={photos}
                  onEndReached={checkCondition}
                  onEndReachedThreshold={0.1}
                  renderItem={({item, i}) => {
                    return (
                      <ImageCard
                        item={item}
                        key={i}
                        state={{selectedImage, setSelectedImage}}
                      />
                    );
                  }}
                />
  
                {isLoading && (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color="black" size="large" />
                  </View>
                )}

    
              </>
            ) : (
              <View style={styles.noPhotos}>
                <Text>No Photos Available</Text>
              </View>
            )}
          </>
        )}
        <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
        >
          
           <View style={styles.bottomcontainer}>
        <ScrollView style={[styles.bottomcontainer,{height: '35%',marginBottom:hp(2)}]}>
        <View style={[styles.bottomstyleBox]}>
                 {props?.route?.params?.shippingData.map((item, index) =>
                   ( 
                     <TouchableOpacity
                     onPress={() => {
                      uibottomesheetvisiblity(false)
                      setIsOpenedShipping(false)
                        addRegions(item, index)
                    }}
                     key={index}
                     style={styles.bottomitemWrap}>
                     <Text style={styles.bottomitemTxt}>{item?.shipping?.name}</Text>
                     <Icons.AntDesign
                       name={
                         regions.some(e => e.regionId === item?.shipping_id)
                           ? 'checkcircle'
                           : 'checkcircleo'
                       }
                       size={24}
                       color={
                         regions.some(e => e.regionId === item?.shipping_id)
                           ? 'black'
                           : 'lightgray'
                       }
                       style={{position: 'absolute', right: 10}}
                     />
                   </TouchableOpacity>
                 ))}
              </View>
        </ScrollView>
      </View>

          </BottomSheet>
          <BottomSheet
        visible={styleVisible}
        onBackButtonPress={togglestylebottomsheet}
        onBackdropPress={togglestylebottomsheet}
        >
           <View style={styles.bottomcontainer}>
        <ScrollView style={[styles.bottomcontainer,{height: '35%',marginBottom:hp(2)}]}>
        <View style={[styles.bottomstyleBox]}>
        {data?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedText(item.name);
                      updateState({style_id: item.id});
                      setIsOpened(false);
                      uistylebottomsheetvisibility(false)
                    }}
                    key={index}
                    style={styles.bottomitemWrap}>
                    <Text style={styles.bottomitemTxt}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
        </View>
        </ScrollView>
        </View>


        </BottomSheet>

      
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
    width: wp2(92),
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  heading: {
    color: 'black',
    fontSize: rfv(22),
    fontWeight: '700',
  },
  button: {
    width: wp2(22),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
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
  imageContainer: {
    width: wp2(94),
    height: hp2(36),
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: wp2(80),
    height: hp2(6),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(1),
    alignSelf: 'center',
  },
  inputBox2: {
    width: wp2(80),
    
    paddingVertical: hp2(1),
    paddingHorizontal: wp2(2),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(1),
    alignSelf: 'center',
  },
  styleBox: {
    width: wp2(80),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  scrollViewWrap: {
    width: wp2(94),
    height: hp2(36),
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorsWrap: {
    width: wp2(96),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  noPhotos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTxt: {
    marginTop: hp2(2),
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: rfv(16),
  },
  nextTxt: {color: 'white', fontWeight: '700', fontSize: rfv(13)},
  scrollIndicatorWrap: {
    width: wp2(94),
    position: 'absolute',
    zIndex: 999,
    bottom: hp2(1),
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
  selectTxt: {color: 'black', fontWeight: '700', fontSize: rfv(13)},
  itemsWrap: {
    flexDirection: 'row',
    width: wp2(80),
    height: hp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp2(2),
    overflow: 'hidden',
  },
  itemsTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    position: 'absolute',
    left: 10,
  },
  





  bottomcontainer: {
    width:wp('100'),
    flexDirection: 'column',
    backgroundColor: '#D3D3D3',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  bottomText: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 2,
  },
  bottomTextInput: {
    fontSize: 14,
  },
  bottomButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    shadowRadius: 12,
    borderRadius: 12,
    width: 100,
    shadowOpacity: 0.4,
    shadowOffset: {height: 0, width: 1},
    shadowColor: 'grey',
  },
  bottomCardView:{
    width:wp('95'),
    height:hp('6'),
    marginVertical:hp('1'),
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:wp('4'),
    borderRadius:10,
    backgroundColor:'white'
  },
  bottomitemTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    position: 'absolute',
    left: 10,
  },
  bottomitemWrap: {
    flexDirection: 'row',
    width: wp(90),
    height: hp(6),
    alignSelf:"center",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    overflow: 'hidden',
    backgroundColor:'white',
    marginVertical:hp(1)
  },
  bottomstyleBox: {
    width: wp(100),
    backgroundColor: '#D3D3D3',
    borderRadius: wp(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
});
