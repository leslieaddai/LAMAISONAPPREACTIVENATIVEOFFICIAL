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
import ImageCard from './ImageCard';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {CreateGalleryUrl} from '../../config/Urls';
import {useDispatch, useSelector, connect} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

const PAGE_SIZE = 40;

export default function ImageUploadScreen(props) {
  //function ImageUploadScreen(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const [caption, setCaption] = useState('');

  //const dispatch = useDispatch()

  //const [photos, setPhotos]=useState();
  const [selectedImage, setSelectedImage] = useState();
  const [nextButton, setNextButton] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [uploadButton, setUploadButton] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [after, setAfter] = useState();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [perm, setPerm] = useState(false);

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
      //console.log(page_info.end_cursor,'===========> after')
      // dispatch({
      //   type: 'setAfter',
      //   payload: page_info.end_cursor,
      // });
      setHasNextPage(page_info.has_next_page);
      //console.log(page_info.has_next_page,'===========> next page')
      // dispatch({
      //   type: 'setHasNextPage',
      //   payload: page_info.has_next_page,
      // });
      setPhotos(prevPhotos => [...prevPhotos, ...edges]);
      //console.log(...edges,'===========> edges')
      // dispatch({
      //   type: 'setPhotos',
      //   payload: [...props.ImageUpload.photos, ...edges],
      // });
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
  // async function runThis () {
  //   if (Platform.OS === "android" && (await hasAndroidPermission())) {
  //     showPhotos();
  //   }
  //   if (Platform.OS === 'ios') {
  //     showPhotos();
  //   }
  // }
  // runThis();
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
        <Text
          style={{
            marginTop: hp2(2),
            color: 'black',
            textTransform: 'uppercase',
            fontWeight: '700',
            fontSize: rfv(16),
          }}>
          Successfully Uploaded!
        </Text>
      </View>
    );
  }

  const goBackFunction = () => {
    if (nextButton && !confirmButton) {
      setNextButton(false);
    }
    if (nextButton && confirmButton) {
      setConfirmButton(false);
    }
  };

  const uploadProduct = () => {
    if (caption !== '' && !confirmButton) {
      setConfirmButton(true);
    } else if (caption !== '' && confirmButton) {
      //setUploadButton(true)
      setLoading(true);

      var formdata = new FormData();
      formdata.append('user_id', user?.userData?.id);
      formdata.append('caption', caption);
      formdata.append('image', selectedImage);

      //   let obj = {
      //     user_id: user.userData.id,
      //     caption: caption,
      //     image:selectedImage
      // }

      // console.log(obj)

      //console.log(formdata);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: CreateGalleryUrl,
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
          errorMessage(errorHandler(error))
        });
    } else {
      errorMessage('Please add caption!');
    }
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>

      <SafeAreaView style={styles.container}>
        {selectedImage && !nextButton ? (
          <View style={styles.headWrap}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Gallery</Text>
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
            <Text style={styles.heading}>Gallery</Text>
          </View>
        ) : (
          <View style={[styles.headWrap, {justifyContent: 'center'}]}>
            <Text style={styles.heading}>Gallery</Text>
          </View>
        )}

        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage?.uri}}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          ) : (
            // <Text>Select Image</Text>
            <Image
              source={IMAGES.selectIMG}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          )}
        </View>

        {nextButton ? (
          <ScrollView contentContainerStyle={{paddingVertical: hp2(1)}}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder="CAPTION"
                value={caption}
                onChangeText={val => setCaption(val)}
                readOnly={confirmButton}
              />
            </View>
            <TouchableOpacity
              onPress={uploadProduct}
              style={[
                styles.button,
                {width: wp2(30), alignSelf: 'flex-end', marginRight: wp2(10)},
              ]}>
              <Text style={styles.nextTxt}>
                {confirmButton ? 'UPLOAD' : 'CONFIRM'}
              </Text>
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
                      //<ImageCard item={item} key={i}  />
                    );
                  }}
                />

                {isLoading && (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color="black" size="large" />
                  </View>
                )}

                {/* //    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: hp2(2),flexDirection:'row',flexWrap:'wrap',paddingHorizontal:wp2(2),}}>
    //    {photos?.map((p, i) => {
    //    return (
    //      <TouchableOpacity onPress={()=>setSelectedImage(p.node.image.uri)} key={i} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
    //      <Image
    //         key={i}
    //         source={{ uri: p.node.image.uri }}
    //        style={{width: '100%', height: '100%'}}
    //        resizeMode="cover"
    //      />
    //     {selectedImage===p.node.image.uri && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
    //    </TouchableOpacity>
    //    );
    //  })}
    //  </ScrollView> */}
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

// const mapStateToProps = (state) => {
//   const ImageUpload = state.ImageUpload
//   return {
//     ImageUpload,
//   };
// };

//export default connect(mapStateToProps, null)(ImageUploadScreen);

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
    marginVertical: hp2(2),
    alignSelf: 'center',
  },
  noPhotos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextTxt: {color: 'white', fontWeight: '700', fontSize: rfv(13)},
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
