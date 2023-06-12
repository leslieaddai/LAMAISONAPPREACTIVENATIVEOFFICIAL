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
//import SelectDropdown from 'react-native-select-dropdown';
//import ColorBox from '../../components/colorBox';
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

import LoaderComp from '../../components/loaderComp';

const PAGE_SIZE = 40;

export default function ImageUploadLookbook(props) {
  //console.log(props?.route?.params?.item?.id)

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const scrollX = new Animated.Value(0);

  const [stateChange, setStateChange] = useState({
    productName: '',
    pieces: '',
    piece_id: '',
    description: '',
    price,
    style_id,
    category: props?.route?.params?.item?.id,
    //quantity:[{color:'',size:'',quantity:''}],
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
    //quantity,
  } = stateChange;

  const [quantity, setQuantity] = useState([
    {color_id: '', color: '', size_id: '', size: '', quantity: ''},
  ]);

  //const [photos, setPhotos]=useState();
  const [selectedImage, setSelectedImage] = useState([]);
  const [nextButton, setNextButton] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [uploadButton, setUploadButton] = useState(false);

  //const data? = ["BEACHWEAR", "CASUALWEAR", "FORMALWEAR", "NIGHTLIFE","OUTDOORWEAR","SPORTSWEAR","STREETWEAR"];
  const [isOpened, setIsOpened] = useState(false);
  const [selectedText, setSelectedText] = useState('SELECT STYLE');

  const [isOpenedShipping, setIsOpenedShipping] = useState(false);
  const [regions, setRegions] = useState([]);

  //const [colorBox, setColorBox]=useState(false);
  //const [addQuantity, setAddQuantity]=useState([1]);

  const [photos, setPhotos] = useState([]);
  const [after, setAfter] = useState();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [perm, setPerm] = useState(false);

  //console.log(selectedImage);

  useEffect(() => {
    //setLoading(true);

    axios
      .get(StylesUrl, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(async function (res) {
        //console.log(res.data);
        setData(res.data.data);
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoading(false);
        errorMessage('Something went wrong!');
        //errorMessage(errorHandler(error))
        //errorMessage('Login Failed');
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

  // useEffect(()=>{
  //   async function runThis () {
  //     if (Platform.OS === "android" && (await hasAndroidPermission())) {
  //       showPhotos();
  //     }
  //     if(Platform.OS==='ios'){
  //       showPhotos();
  //     }
  //   }
  //   runThis();
  // },[])

  async function hasAndroidPermission() {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      setPerm(true);
      //console.log(hasPermission)
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    if (status === 'granted') {
      setPerm(true);
    }
    //console.log(status);
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

  // async function showPhotos() {
  //   // if (Platform.OS === "android" && !(await hasAndroidPermission())) {
  //   //   return;
  //   // }
  //   const result = await CameraRoll.getPhotos({
  //     first: 20,
  //     assetType: 'Photos',
  //   })
  //   .then(r => {
  //     setPhotos(r.edges);
  //   })
  //   .catch((err) => {
  //      //Error Loading Images
  //      console.log(err)
  //   });
  //   //console.log(result);
  // };

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

  const addRegions = (item, index) => {
    regions.some(e => e.regionId === item?.shipping_id)
      ? setRegions(regions.filter(e => e.regionId !== item?.shipping_id))
      : setRegions([
          ...regions,
          {regionName: item?.shipping?.name, regionId: item?.shipping_id},
        ]);
    console.log(regions);
  };

  const uploadProduct = () => {
    //setUploadButton(true)
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
    //formdata.append("sku", '123422');
    formdata.append('description', stateChange?.description);
    formdata.append('price', parseFloat(stateChange?.price).toFixed(2));
    formdata.append('piece_id', stateChange?.piece_id);
    formdata.append('style', String(stateChange?.style_id));
    formdata.append('status', 1);
    //  formdata.append("color[]", [1]);
    //  formdata.append("size[]", [3]);
    //  formdata.append("qty[]", [34]);
    // formdata.append("color[]", colorArr[0]);
    // formdata.append("size[]", sizeArr[0]);
    // formdata.append("qty[]", quantityArr[0]);
    // formdata.append("color[]", colorArr[1]);
    // formdata.append("size[]", sizeArr[1]);
    // formdata.append("qty[]", quantityArr[1]);
    //formdata.append("image[]", {uri: selectedImage[0].uri, name: selectedImage[0].name, type: selectedImage[0].type});
    //formdata.append("image[]", {uri: selectedImage[0].uri, name: "asdasdas.jpg", type: selectedImage[0].type});
    // formdata.append("image[]", selectedImage[0]);
    // formdata.append("image[]", selectedImage[1]);
    selectedImage.map((item, index) => {
      formdata.append('image[]', item);
    });
    regions.map((item, index) => {
      formdata.append('regions[]', item?.regionId);
    });

    // console.log(Array.isArray(selectedImage))
    // console.log(Array.isArray(colorArr))
    // console.log(Array.isArray(sizeArr))
    // console.log(Array.isArray(quantityArr))

    //console.log(selectedImage)
    //console.log(colorArr,sizeArr,quantityArr)

    //   let obj = {
    //     user_id: user.userData.id,
    //     category_id: 1,
    //     name: stateChange.productName,
    //     //sku: Math.floor(Math.random() * 899999 + 100000),
    //     sku: '1010101',
    //     description: stateChange.description,
    //     price: parseFloat(stateChange.price). toFixed(2),
    //     piece_id: stateChange.piece_id,
    //     style: String(stateChange.style_id),
    //     status:1,
    //     color:colorArr,
    //     size:sizeArr,
    //     qty:quantityArr,
    //     image:selectedImage
    // }

    // console.log(obj)

    //console.log(formdata);

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
        console.log(res.data);
        setLoading(false);
        successMessage('Upload Success');
        setUploadButton(true);

        setTimeout(() => {
          props.navigation.goBack();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        errorMessage('Upload Failed');
      });

    //   const uri =
    //   Platform.OS === "android"
    //     ? selectedImage[0].path
    //     : selectedImage[0].path.replace("file://", "");
    // const filename = selectedImage[0].path.split("/").pop();
    // const match = /\.(\w+)$/.exec(filename);
    // const ext = match?.[1];
    // const type = match ? `image/${match[1]}` : `image`;

    // const formData = new FormData();
    // formData.append("file", {
    //   uri,
    //   name: `image.${ext}`,
    //   type,
    // });

    // console.log(formData._parts[0][1])

    //   axios.post(`https://cmms.clickysoft.net/api/abc`, formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }).then(async function(res){
    //     console.log(res.data);
    //   }).catch(async function(error){
    //     console.log(error.response.data)
    //   });
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
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
            {/* <Text>Select Image</Text> */}
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
              {/* <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>SELECT SHIPPING DETAILS</Text> */}
              <Text style={styles.selectTxt}>
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
            {isOpenedShipping && (
              <View style={[styles.styleBox]}>
                {props?.route?.params?.shippingData.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => addRegions(item, index)}
                    key={index}
                    style={styles.itemsWrap}>
                    <Text style={styles.itemsTxt}>{item?.shipping?.name}</Text>
                    <ICONS.AntDesign
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
            )}
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholder="PRICE"
                placeholderTextColor={'grey'}
                keyboardType="number-pad"
                value={stateChange.price}
                onChangeText={val => updateState({price: val})}
              />
            </View>
            {/* <TouchableOpacity onPress={()=>setColorBox(true)} style={styles.inputBox}>
         <Text>colour</Text>
        </TouchableOpacity> */}

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

            {isOpened && (
              <View style={[styles.styleBox]}>
                {data?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedText(item.name);
                      updateState({style_id: item.id});
                      setIsOpened(false);
                    }}
                    key={index}
                    style={{
                      width: wp2(80),
                      height: hp2(6),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedText === item.name ? '#F6F5F3' : 'white',
                      borderRadius: wp2(2),
                      overflow: 'hidden',
                    }}>
                    <Text style={styles.selectTxt}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* <SelectDropdown data={stylesDropdown} defaultButtonText="SELECT STYLE" buttonStyle={styles.inputBox} 
        buttonTextStyle={{color:'black',fontWeight:'700',fontSize:rfv(13),textAlign:'left'}}
        renderDropdownIcon={isOpened => {
            return <ICONS.FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A1A1A1'} size={22} />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={{backgroundColor:'white',borderRadius: wp2(4),overflow:'hidden',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,}}
          rowStyle={{borderBottomWidth:0,borderRadius:wp2(2),overflow:'hidden'}}
          rowTextStyle={{color:'black',fontWeight:'700',fontSize:rfv(13)}}
          selectedRowStyle={{backgroundColor:'#F6F5F3'}}
        /> */}

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
        ) : //  :nextButton && colorBox ? (
        //     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(2)}}>
        //         <Text style={{color:'black',textTransform:'uppercase',fontWeight:'700',fontSize:rfv(16),alignSelf:'center'}}>Select all colours for this piece</Text>
        //         <View style={styles.colorsWrap}>
        //   <ColorBox color="black"/>
        //   <ColorBox color="white"/>
        //   <ColorBox color="#A1A1A1"/>
        //   <ColorBox color="#F61616"/>
        //   <ColorBox color="#008000E8"/>
        //   <ColorBox color="#0000FF"/>
        //   <ColorBox color="#5C4033"/>
        //   <ColorBox color="#FF69B4"/>
        //   <ColorBox color="#FAFA33"/>
        //   <ColorBox color="#FFA500"/>
        //   <ColorBox color="#800080"/>
        //   <ColorBox color="#F5F5DC"/>
        //   </View>
        //     </ScrollView>
        //  )
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
            {/* <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
           <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>free shipping to all regions</Text>
          </View> */}
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
            {/* <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
           <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>colour</Text>
          </View> */}
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
                      //       <TouchableOpacity onPress={()=>setSelectedImage(item.node.image.uri)} key={i} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
                      //    <Image
                      //       key={i}
                      //       source={{ uri: item.node.image.uri }}
                      //      style={{width: '100%', height: '100%'}}
                      //      resizeMode="cover"
                      //    />
                      //   {selectedImage===item.node.image.uri && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
                      //  </TouchableOpacity>
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

                {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: hp2(2),flexDirection:'row',flexWrap:'wrap',paddingHorizontal:wp2(2),}}>
       {photos?.map((p, i) => {
       return (
         <TouchableOpacity onPress={()=>selectedImage.includes(p.node.image.uri)?(setSelectedImage(selectedImage.filter(e => e !== p.node.image.uri))):(setSelectedImage([...selectedImage,p.node.image.uri]))} key={i} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
         <Image
            key={i}
            source={{ uri: p.node.image.uri }}
           style={{width: '100%', height: '100%'}}
           resizeMode="cover"
         />
        {selectedImage.includes(p.node.image.uri) && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
       </TouchableOpacity>
       );
     })}
     </ScrollView> */}
              </>
            ) : (
              <View style={styles.noPhotos}>
                <Text>No Photos Available</Text>
              </View>
            )}
          </>
        )}
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
    //height: hp2(6),
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
});
