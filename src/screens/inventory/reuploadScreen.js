import React, {useState, useEffect} from 'react';
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
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import ColorBox from '../../components/colorBox';
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
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { BottomSheet } from 'react-native-btr';
import Icons from '../../theme/icons';
import { FlatList } from 'react-native-gesture-handler';

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
  const [shippingname, setshippingname] = useState('')
  const [selectedImage, setSelectedImage] = useState([]);

  const routeitem = props?.route?.params?.data
  
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
  const [selectedText, setSelectedText] = useState(
    routeitem?.style?.name,
  );
  

  useEffect(()=>{            
    if(isOpenedShipping){
      uibottomesheetvisiblity(true)
    }
  },[isOpenedShipping])
  useEffect(() => {
    let tempArr = [];
    routeitem?.product_variations?.map(item => {
      //console.log(item.quantity)
      tempArr.push({
        color_id: String(item?.color?.id),
        color: String(item?.color?.color_code),
        size_id: String(item?.size?.id),
        size: String(item?.size?.size),
        quantity: String(item?.quantity),
        product_variation_id: item?.id,
      });
    });
    //console.log(tempArr)
    setQuantity(tempArr);

    let tempImgArr = [];
    routeitem?.product_images?.[0]?.image?.map(
      (item, index) => {
        tempImgArr.push({
          uri: item?.original_url,
          name: item?.file_name,
          type: item?.mime_type,
          id: item?.id,
        });
      },
    );
    setSelectedImage(tempImgArr);

    axios
      .get(StylesUrl, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(async function (res) {
        setData(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
      getShippingInfo()
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
    setIsOpenedShipping(false)
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
        console.log("skjjk",res?.data.data[0].shipping);
        // setshippingname(res?.data?.data[0]?.shipping.name)
        addRegions(res?.data?.data[0])
        if (res?.data?.data?.length > 0) {
          setShippingData(res?.data?.data);
        } else {
          setShippingData('');
        }
      })
      .catch(function (error) {
        errorMessage(errorHandler(error))
      });
  };
  const addRegions = (item) => {
    regions?.some(e => e?.regionId === item?.shipping_id)
      ? setRegions(regions?.filter(e => e?.regionId !== item?.shipping_id))
      : setRegions([
          ...regions,
          {regionName: item?.shipping?.name, regionId: item?.shipping_id},
        ]);
    console.log(regions);
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
      console.log(item);
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
        console.log(res.data);
        setLoading(false);
        successMessage('Reupload Success');
        setUploadButton(true);

        setTimeout(() => {
          props.navigation.goBack();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Reupload Failed');
        errorMessage(errorHandler(error))
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
        Alert.alert("","Are you sure you want to update this image",
        [
          {
            text:"Cancel"
          },{
            text:"Ok",
            onPress: ()=>{
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
                    console.log(res.data);
                    array[id] = {uri, name: filename, type, id: res?.data?.data?.id};
                    setSelectedImage(array);
                    setLoading2(false);
                    successMessage('Image Updated');
                  })
                  .catch(function (error) {
                    console.log(error.response.data);
                    setLoading2(false);
                    errorMessage(errorHandler(error))
                  });
              }
            }
          }
        ])
        
      }
    };

    changeNow(id);
  };

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

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => goBackFunction()}
            style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.heading}>Lookbook</Text>
        </View>

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
                    //source={IMAGES.randomPic}
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
              //numberOfCards={props?.route?.params?.data?.product_images?.[0]?.image?.length}
              numberOfCards={selectedImage?.length}
              scrollWidth={wp2(94)}
              activeColor={'#707070'}
              inActiveColor={'#D9D9D9'}
              scrollAnimatedValue={scrollX}
            />
          </View>
        </View>

        {showQuantity && !confirmButton ? (
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
            <View style={styles.quantityWrap}>
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
              <Text
                style={{color: 'white', fontWeight: '700', fontSize: rfv(13)}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        ) : confirmButton ? (
          <ScrollView contentContainerStyle={{paddingVertical: hp2(1)}}>
            <View
              style={[
                styles.inputBox,
                {justifyContent: 'center', paddingHorizontal: wp2(2)},
              ]}>
              <Text style={styles.previewTxt}>{stateChange?.productName}</Text>
            </View>
            <View
              style={[
                styles.inputBox,
                {justifyContent: 'center', paddingHorizontal: wp2(2)},
              ]}>
              <Text style={styles.previewTxt}>{stateChange?.pieces}</Text>
            </View>
            <View
              style={[
                styles.inputBox,
                {justifyContent: 'center', paddingHorizontal: wp2(2)},
              ]}>
              <Text style={styles.previewTxt}>{stateChange?.description}</Text>
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
              <Text style={styles.previewTxt}>{stateChange?.price}</Text>
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
              <Text style={styles.previewTxt}>{selectedText}</Text>
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
              <Text style={styles.reuploadTxt}>REUPLOAD</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={{paddingVertical: hp2(1)}}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.txtInput}
                placeholder="PRODUCT NAME"
                placeholderTextColor={'grey'}
                value={stateChange?.productName}
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
                  color: stateChange?.pieces !== '' ? 'black' : 'grey',
                  paddingHorizontal: wp2(2),
                }}>
                {stateChange?.pieces !== '' ? stateChange?.pieces : 'PIECES'}
              </Text>
            </TouchableOpacity>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.txtInput}
                placeholder="DESCRIPTION"
                placeholderTextColor={'grey'}
                value={stateChange?.description}
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
              {/* <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>SELECT SHIPPING DETAILS</Text> */}
              <Text style={[styles.selectTxt,{width:wp2(70)}]}>
                {regions.length !== 0
                  ? regions.map((item, index) => item?.regionName + ' ')
                  : shippingname}
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
                style={styles.txtInput}
                placeholder="PRICE"
                placeholderTextColor={'grey'}
                keyboardType="number-pad"
                value={stateChange?.price}
                onChangeText={val => updateState({price: val})}
              />
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
              <Text style={styles.selectedTxt}>{selectedText}</Text>
              <TouchableOpacity
                onPress={() =>
                  isOpened ? setIsOpened(false) : setIsOpened(true)
                }>
                <ICONS.FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#A1A1A1'}
                  size={22}
                />
              </TouchableOpacity>
            </View>

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
              <Text style={styles.reuploadTxt}>NEXT</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        )}
        <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
        >
           <View style={styles.bottomcontainer}>
        <ScrollView style={[styles.bottomcontainer,{height: '35%',marginBottom:hp(2)}]}>
        <View style={[styles.bottomstyleBox]}>
          <FlatList
          data={shippingData}
          renderItem={({item,index})=>{
            console.log(item)
            return(
              <TouchableOpacity
                     onPress={() => {
                      uibottomesheetvisiblity(true)
                      setIsOpenedShipping(false)
                        addRegions(item)
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
            )
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
    fontSize: rfv(13)
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
