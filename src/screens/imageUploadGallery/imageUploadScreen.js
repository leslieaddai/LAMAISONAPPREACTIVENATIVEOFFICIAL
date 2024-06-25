import React, {useState, useEffect, useCallback} from 'react';
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
  Animated,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, ICONS, COLORS, wp2, hp2} from '../../theme';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ImageCard from './ImageCard';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {CreateGalleryUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../../components/loaderComp';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import NewInputComp from '../../components/NewInputComp';
import ContinueButton from '../auth/componnets/ContinueBtn';

const PAGE_SIZE = 40;

export default function ImageUploadScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const [caption, setCaption] = useState('');

  const scrollX = new Animated.Value(0);
  //const [selectedImage, setSelectedImage] = useState();
  const [selectedImage, setSelectedImage] = useState([]);
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
      if (Platform.OS === 'ios') {
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
      setLoading(true);

      var formdata = new FormData();
      formdata.append('user_id', user?.userData?.id);
      formdata.append('caption', caption);
      //formdata.append('image', selectedImage);
      selectedImage.map((item, index) => {
        formdata.append('image[]', item);
      });

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
          setLoading(false);
          successMessage('Upload Success');
          setUploadButton(true);

          setTimeout(() => {
            props.navigation.goBack();
          }, 3000);
        })
        .catch(function (error) {
          console.log('====================================');
          console.log(error.response);
          console.log('====================================');
          setLoading(false);

          errorMessage(errorHandler(error));
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

      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        {/* {selectedImage && !nextButton ? ( */}
        {selectedImage?.length !== 0 && !nextButton ? (
          <View style={{marginBottom: 20}}>
            <NewHeaderComp
              title={'Gallery'}
              moveNextArrow={true}
              arrowNavigation={() => setNextButton(true)}
            />
          </View>
        ) : // <View style={styles.headWrap}>
        //   <TouchableOpacity onPress={() => props.navigation.goBack()}>
        //     <ICONS.AntDesign name="left" size={24} color="black" />
        //   </TouchableOpacity>

        //   <TouchableOpacity
        //     onPress={() => setNextButton(true)}
        //     style={styles.button}>
        //     <Text style={styles.nextTxt}>NEXT</Text>
        //   </TouchableOpacity>
        // </View>
        nextButton ? (
          <View style={{marginBottom: 20}}>
            <NewHeaderComp
              title={'Gallery'}
              arrowNavigation={goBackFunction}
              movePreviousArrow={true}
            />
          </View>
        ) : (
          // <TouchableOpacity
          //   onPress={goBackFunction}
          //   style={{position: 'absolute', left: wp2(4)}}>
          //   <ICONS.AntDesign name="left" size={24} color="black" />
          // </TouchableOpacity>
          // <Text style={styles.heading}>Gallry</Text>

          <View style={[styles.headWrap, {justifyContent: 'center'}]}>
            <Text style={styles.heading}>Gallery</Text>
          </View>
        )}

        {/* <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage?.uri}}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          ) : (
           
            <Image
              source={IMAGES.selectIMG}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          )}
        </View> */}

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

        {nextButton ? (
          <ScrollView contentContainerStyle={{paddingVertical: hp2(1)}}>
            <NewInputComp
              handleOnChange={val => setCaption(val)}
              value={caption}
              inputText={'Caption'}
            />
            {/* <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder="CAPTION"
                value={caption}
                onChangeText={val => setCaption(val)}
                readOnly={confirmButton}
              />
            </View> */}
            <View style={{marginHorizontal: 20, marginVertical: 20}}>
              <ContinueButton
                onPress={uploadProduct}
                text={confirmButton ? 'UPLOAD' : 'CONFIRM'}
              />
            </View>
            {/* <TouchableOpacity
             
              style={[
                styles.button,
                {width: wp2(30), alignSelf: 'flex-end', marginRight: wp2(10)},
              ]}>
              <Text style={styles.nextTxt}>
                {confirmButton ? 'UPLOAD' : 'CONFIRM'}
              </Text>
            </TouchableOpacity> */}
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
  scrollViewWrap: {
    width: wp2(94),
    height: hp2(36),
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollIndicatorWrap: {
    width: wp2(94),
    position: 'absolute',
    zIndex: 999,
    bottom: hp2(1),
  },
});
