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
  Animated,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import QuantityComp from '../../components/quantityComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  StylesUrl,
  ProductUploadUrl,
  ProductImageUpdate,
  GetBrandShippingInfo,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

import {launchImageLibrary} from 'react-native-image-picker';
import {BottomSheet} from 'react-native-btr';
import Icons from '../../theme/icons';
import {FlatList} from 'react-native-gesture-handler';
import NewInputComp from '../../components/NewInputComp';
import {Modal} from 'react-native-paper';
import ContinueButton from '../auth/componnets/ContinueBtn';
import UploadSuccess from '../../assets/icons/uploaded-success.svg';
import Twitter from '../../assets/icons/twitter.svg';
import Facebook from '../../assets/icons/facebook.svg';
import LinkedIn from '../../assets/icons/linkedin.svg';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function ReuploadScreen(props) {
  const scrollX = new Animated.Value(0);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [shippingData, setShippingData] = useState('');
  const user = useSelector(state => state?.userData);
  const [regions, setRegions] = useState([]);
  const [isOpenedShipping, setIsOpenedShipping] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);

  const routeitem = props?.route?.params?.data;

  const [visible, setVisible] = useState(false);
  const [stateChange, setStateChange] = useState({
    productName: routeitem?.name,
    pieces: routeitem?.piece?.piece_name,
    piece_id: routeitem?.piece_id,
    description: routeitem?.description,
    price: routeitem?.price,
    style_id: routeitem?.style?.id,
    category: routeitem?.category_id,
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
    {
      color_id: '',
      color: '',
      size_id: '',
      size: '',
      quantity: '',
      product_variation_id: '',
    },
  ]);

  const [confirmButton, setConfirmButton] = useState(false);
  const [uploadButton, setUploadButton] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedText, setSelectedText] = useState(routeitem?.style?.name);

  useEffect(() => {
    if (isOpenedShipping) {
      uibottomesheetvisiblity(true);
    }
  }, [isOpenedShipping]);
  useEffect(() => {
    let tempArr = [];
    routeitem?.product_variations?.map(item => {
      tempArr.push({
        color_id: String(item?.color?.id),
        color: String(item?.color?.color_code),
        size_id: String(item?.size?.id),
        size: String(item?.size?.size),
        quantity: String(item?.quantity),
        product_variation_id: item?.id,
      });
    });

    setQuantity(tempArr);

    let tempImgArr = [];
    routeitem?.product_images?.[0]?.image?.map((item, index) => {
      tempImgArr.push({
        uri: item?.original_url,
        name: item?.file_name,
        type: item?.mime_type,
        id: item?.id,
      });
    });
    setSelectedImage(tempImgArr);

    axios
      .get(StylesUrl, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(async function (res) {
        setData(res?.data?.data);
      })
      .catch(function (error) {
        errorMessage(errorHandler(error));
      });
    getShippingInfo();
  }, []);

  const goBackFunction = () => {
    if (!showQuantity && !confirmButton) {
      props.navigation.goBack();
    }
    if (showQuantity && !confirmButton) {
      setShowQuantity(false);
    }
    if (showQuantity && confirmButton) {
      setConfirmButton(false);
    }
  };
  const uibottomesheetvisiblity = Bool => {
    setVisible(Bool);
  };
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
    uibottomesheetvisiblity(!visible);
    setIsOpenedShipping(false);
  };
  const productDetails = () => {
    if (
      stateChange?.productName !== '' &&
      stateChange?.pieces !== '' &&
      stateChange?.description !== '' &&
      stateChange?.price !== '' &&
      selectedText !== 'SELECT STYLE' &&
      regions.length !== 0
    ) {
      setShowQuantity(true);
    } else {
      errorMessage('Please fill all details!');
    }
  };
  const getShippingInfo = () => {
    axios
      .get(GetBrandShippingInfo, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        if (res?.data?.data?.length > 0) {
          setShippingData(res?.data?.data);
          addRegions(res?.data?.data?.[0]);
        } else {
          setShippingData('');
        }
      })
      .catch(function (error) {
        errorMessage(errorHandler(error));
      });
  };
  const addRegions = item => {
    regions?.some(e => e?.regionId === item?.shipping_id)
      ? setRegions(regions?.filter(e => e?.regionId !== item?.shipping_id))
      : setRegions([
          ...regions,
          {regionName: item?.shipping?.name, regionId: item?.shipping_id},
        ]);
  };
  const verifyQuantity = () => {
    let tempDuplicate = quantity.filter(
      (v, i, a) =>
        a.findIndex(
          v2 => v2.color_id == v.color_id && v2.size_id == v.size_id,
        ) == i,
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
        // setConfirmButton(true);
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

  const uploadProduct = () => {
    setLoading(true);

    var formdata = new FormData();

    let colorArr = [];
    let sizeArr = [];
    let quantityArr = [];
    let productVariationArr = [];
    let newColorArr = [];
    let newSizeArr = [];
    let newQuantityArr = [];

    quantity.map((item, index) => {
      if (item.product_variation_id === null) {
        newColorArr.push(item.color_id);
        formdata.append('color_new[]', item.color_id);

        newSizeArr.push(item.size_id);
        formdata.append('size_new[]', item.size_id);

        newQuantityArr.push(Number(item.quantity));
        formdata.append('qty_new[]', Number(item.quantity));
      } else {
        colorArr.push(item.color_id);
        formdata.append('color[]', item.color_id);

        sizeArr.push(item.size_id);
        formdata.append('size[]', item.size_id);

        quantityArr.push(Number(item.quantity));
        formdata.append('qty[]', Number(item.quantity));

        productVariationArr.push(Number(item.product_variation_id));
        formdata.append(
          'product_variation_id[]',
          Number(item.product_variation_id),
        );
      }
    });

    formdata.append('user_id', user?.userData?.id);
    formdata.append('category_id', stateChange?.category);
    formdata.append('name', stateChange?.productName);
    formdata.append('sku', routeitem?.sku);
    formdata.append('description', stateChange?.description);
    formdata.append('price', parseFloat(stateChange?.price).toFixed(2));
    formdata.append('piece_id', stateChange?.piece_id);
    formdata.append('style', String(stateChange?.style_id));
    formdata.append('status', 1);

    regions.map((item, index) => {
      formdata.append('regions[]', item?.regionId);
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ProductUploadUrl + `/${routeitem?.id}`,
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
        successMessage('Reupload Success');
        setUploadButton(true);

        setTimeout(() => {
          props.navigation.goBack();
        }, 3000);
      })
      .catch(function (error) {
        setLoading(false);
        errorMessage(errorHandler(error));
      });
  };

  const changeImage = id => {
    const changeNow = async id => {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (!result.didCancel) {
        const uri =
          Platform.OS === 'android'
            ? result?.assets[0]?.uri
            : result?.assets[0]?.uri.replace('file://', '');
        const filename = result?.assets[0]?.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const ext = match?.[1];
        const type = match ? `image/${match[1]}` : `image`;

        var array = [...selectedImage];
        Alert.alert('', 'Are you sure you want to update this image', [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
            onPress: () => {
              if (id !== -1) {
                setLoading2(true);

                var formdata = new FormData();

                formdata.append('product_image_id', array?.[id]?.id);
                formdata.append('image', {uri, name: filename, type});
                formdata.append('product_id', routeitem?.id);

                let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: ProductImageUpdate,
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
                    array[id] = {
                      uri,
                      name: filename,
                      type,
                      id: res?.data?.data?.id,
                    };
                    setSelectedImage(array);
                    setLoading2(false);
                    successMessage('Image Updated');
                  })
                  .catch(function (error) {
                    setLoading2(false);
                    errorMessage(errorHandler(error));
                  });
              }
            },
          },
        ]);
      }
    };

    changeNow(id);
  };

  if (uploadButton) {
    return (
      // width="146" height="146"
      <View
        style={[
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        {/* <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" /> */}
        <UploadSuccess width="146" height="146" />
        <View style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
          <Text style={styles.uploadTxt}>Successfully Uploaded!</Text>
          <Text style={{fontSize: 14}}>Product updated</Text>
        </View>
        <View
          style={{
            backgroundColor: '#F6F6F6',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 10,
            marginTop: '15%',
          }}>
          <Text style={{fontSize: 14}}>
            Tell your friends about your great choice:
          </Text>
          <View style={{flexDirection: 'row', gap: 10, paddingTop: 20}}>
            <View
              style={{
                backgroundColor: 'white',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 999,
              }}>
              <Twitter width="22" height="22" />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 999,
              }}>
              <Facebook width="20" height="20" />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 999,
              }}>
              <LinkedIn width="20" height="20" />
            </View>
          </View>
        </View>
        <View style={{width: '90%', marginTop: '10%'}}>
          <ContinueButton
            text={'Got it!'}
            onPress={() => props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => goBackFunction()}
            style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.heading}>Lookbook</Text>
        </View> */}
        <NewHeaderComp
          title={'Lookbook'}
          movePreviousArrow={true}
          arrowNavigation={() => props.navigation.goBack()}
        />

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
                <TouchableOpacity
                  disabled={loading2}
                  onPress={() => {
                    changeImage(index);
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: 999,
                    right: 10,
                    top: 10,
                  }}>
                  <ICONS.FontAwesome5
                    name="pencil-alt"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                {loading2 ? (
                  <SkypeIndicator key={index} color={'black'} />
                ) : (
                  <Image
                    key={index}
                    source={{uri: item?.uri}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                )}
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

        {showQuantity && !confirmButton ? (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            {quantity?.map((item, index) => (
              <View style={{marginTop: 20, gap: 20}}>
                <QuantityComp
                  key={index}
                  key2={index}
                  state={{quantity, setQuantity, stateChange}}
                />
                <View style={{borderWidth: 1, borderColor: '#00000010'}} />
              </View>
            ))}

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                width: '50%',
              }}>
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
                      product_variation_id: null,
                    },
                  ])
                }
                style={{
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  gap: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  borderRadius: 10,
                  backgroundColor: '#162FAC',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 19,
                    width: 19,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ICONS.AntDesign
                    name="pluscircle"
                    color={'#162FAC'}
                    size={20}
                  />
                </View>
                <Text style={{fontSize: 16, color: 'white'}}>Add item</Text>
              </TouchableOpacity>
              <View style={{marginHorizontal: 20, marginTop: 10, width: '60%'}}>
                <ContinueButton text={'Next'} onPress={verifyQuantity} />
              </View>
            </View>

            {/* <TouchableOpacity
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
              <Text
                style={{color: 'white', fontWeight: '700', fontSize: rfv(13)}}>
                Nex
              </Text>
            </TouchableOpacity> */}
          </KeyboardAwareScrollView>
        ) : confirmButton ? (
          <ScrollView
            contentContainerStyle={{paddingVertical: hp2(1), gap: 20}}>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 16, color: COLORS.gray500}}>
                {stateChange?.productName}
              </Text>
            </View>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 16, color: COLORS.gray500}}>
                {stateChange?.pieces}
              </Text>
            </View>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 16, color: COLORS.gray500}}>
                {stateChange?.description}
              </Text>
            </View>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 16, color: COLORS.gray500}}>
                {regions.map((item, index) => item?.regionName + ' ')}
              </Text>
            </View>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 16, color: COLORS.gray500}}>
                {stateChange?.price}
              </Text>
            </View>

            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 16, color: COLORS.gray500}}>
                {selectedText}
              </Text>
              {/* <ICONS.FontAwesome
                name={'chevron-down'}
                color={'#A1A1A1'}
                size={12}
              /> */}
            </View>
            <View style={{marginHorizontal: 20}}>
              <ContinueButton onPress={uploadProduct} text={'Reupload'} />
            </View>
            {/* <TouchableOpacity
              onPress={uploadProduct}
              style={[
                styles.button,
                {width: wp2(54), alignSelf: 'center', marginTop: hp2(2)},
              ]}>
              <Text style={styles.reuploadTxt}>REUPLOAD</Text>
            </TouchableOpacity> */}
          </ScrollView>
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={{paddingVertical: hp2(1)}}>
            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.txtInput}
                placeholder="PRODUCT NAME"
                placeholderTextColor={'grey'}
                value={stateChange?.productName}
                onChangeText={val => updateState({productName: val})}
              />
            </View> */}
            <NewInputComp
              value={stateChange?.productName}
              handleOnChange={val => updateState({productName: val})}
              inputText={'Product name'}
            />
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('pieces', {stateChange, updateState})
              }
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text
                style={{
                  fontSize: rfv(13),
                  fontWeight: '400',
                  color:
                    stateChange?.pieces !== '' ? COLORS.gray500 : COLORS.black,
                }}>
                {stateChange?.pieces !== undefined
                  ? stateChange?.pieces
                  : 'Pieces'}
              </Text>
            </TouchableOpacity>
            <NewInputComp
              inputText={'Description'}
              handleOnChange={val => updateState({description: val})}
              value={stateChange?.description}
            />
            {/* <View style={styles.inputBox}>
              
              <TextInput
                style={styles.txtInput}
                placeholder="DESCRIPTION"
                placeholderTextColor={'grey'}
                value={stateChange?.description}
                onChangeText={val => updateState({description: val})}
              />
            </View> */}

            <TouchableOpacity
              onPress={() =>
                isOpenedShipping
                  ? setIsOpenedShipping(false)
                  : setIsOpenedShipping(true)
              }
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text
                style={{width: wp2(70), fontSize: 16, color: COLORS.gray500}}>
                {regions.length !== 0
                  ? regions.map((item, index) => item?.regionName + ' ')
                  : 'Select shipping details'}
              </Text>
              <View>
                <ICONS.FontAwesome
                  name={isOpenedShipping ? 'chevron-up' : 'chevron-down'}
                  color={'#A1A1A1'}
                  size={12}
                />
              </View>
            </TouchableOpacity>
            <NewInputComp inputText={'Price'} />
            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.txtInput}
                placeholder="PRICE"
                placeholderTextColor={'grey'}
                keyboardType="number-pad"
                value={stateChange?.price}
                onChangeText={val => updateState({price: val})}
              />
            </View> */}
            <TouchableOpacity
              onPress={() => setIsOpened(!isOpened)}
              style={[
                {
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flexDirection: 'row',
                  borderRadius: 10,
                  height: 50,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{fontSize: 16, color: COLORS.gray500}}>
                {selectedText !== undefined ? selectedText : 'Select type'}
              </Text>
              <TouchableOpacity>
                <ICONS.FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#A1A1A1'}
                  size={12}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            {isOpened && (
              <View style={[styles.styleBox]}>
                {data?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedText(item?.name);
                      updateState({style_id: item?.id});
                      setIsOpened(false);
                    }}
                    key={index}
                    style={{
                      width: wp2(80),
                      height: hp2(6),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedText === item?.name ? '#F6F5F3' : 'white',
                      borderRadius: wp2(2),
                      overflow: 'hidden',
                    }}>
                    <Text style={styles.selectedTxt}>{item?.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <ContinueButton text={'Next'} onPress={productDetails} />
            </View>
            {/* <TouchableOpacity
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
              <Text style={styles.reuploadTxt}>NEXT</Text>
            </TouchableOpacity> */}
          </KeyboardAwareScrollView>
        )}
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}>
          <View style={styles.bottomcontainer}>
            <ScrollView
              style={[
                styles.bottomcontainer,
                {height: '35%', marginBottom: hp(2)},
              ]}>
              <View style={[styles.bottomstyleBox]}>
                <FlatList
                  data={shippingData}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          uibottomesheetvisiblity(true);
                          setIsOpenedShipping(false);
                          addRegions(item);
                        }}
                        key={index}
                        style={styles.bottomitemWrap}>
                        <Text style={styles.bottomitemTxt}>
                          {item?.shipping?.name}
                        </Text>
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
                    );
                  }}
                />
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
  selectTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
  },
  headWrap: {
    width: wp2(100),
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
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
  uploadTxt: {
    marginTop: hp2(2),
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: rfv(16),
  },
  scrollIndicatorWrap: {
    width: wp2(94),
    position: 'absolute',
    zIndex: 999,
    bottom: hp2(1),
  },
  quantityWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: hp2(1),
  },
  previewTxt: {color: 'black', fontWeight: '700', fontSize: rfv(13)},
  reuploadTxt: {color: 'white', fontWeight: '700', fontSize: rfv(13)},
  txtInput: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
  selectedTxt: {color: 'black', fontWeight: '700', fontSize: rfv(13)},

  bottomcontainer: {
    width: wp('100'),
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
  bottomCardView: {
    width: wp('95'),
    height: hp('6'),
    marginVertical: hp('1'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    borderRadius: 10,
    backgroundColor: 'white',
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: hp(1),
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
