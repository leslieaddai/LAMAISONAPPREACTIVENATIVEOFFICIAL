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
import {errorMessage} from '../../config/NotificationMessage';

import {useDispatch, useSelector} from 'react-redux';

const PAGE_SIZE = 40;

export default function SelectCoverPhoto(props) {
  const user = useSelector(state => state.userData);

  //const [photos, setPhotos]=useState();
  const [selectedImage, setSelectedImage] = useState();
  const [swipeLayout, setSwipeLayout] = useState(false);
  const [name, setName] = useState('');

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
  //     if (Platform.OS === 'ios') {
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

  return (
    <>
   <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
 
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <Text style={styles.heading}>SELECT COVER PHOTO</Text>
        {selectedImage && !swipeLayout && (
          <TouchableOpacity
            onPress={
              () => setSwipeLayout(true)
              // props.navigation.navigate('addCollection')
            }
            style={styles.button}>
            <Text style={styles.nextTxt}>NEXT</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image
            source={{uri: selectedImage?.uri}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        ) : (
          //<Text>Select Image</Text>
          <Image
            source={IMAGES.selectIMG}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        )}
      </View>
      {swipeLayout ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.txtInput}
            placeholderTextColor={'grey'}
            placeholder="ADD COLLECTION NAME"
            value={name}
            onChangeText={val => setName(val)}
          />
          <TouchableOpacity
            onPress={() => {
              if (name.length >= 1) {
                props.navigation.navigate('addCollection', {
                  name,
                  selectedImage,
                });
              } else {
                errorMessage('Please fill the field');
              }
            }}
            style={[
              styles.button,
              {marginLeft: 'auto', marginTop: hp2(2), marginRight: wp2(4)},
            ]}>
            <Text style={styles.nextTxt}>NEXT</Text>
          </TouchableOpacity>
        </View>
      ) : photos.length > 0 ? (
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
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color="black" size="large" />
            </View>
          )}
        </>
      ) : (
        <View style={styles.noPhotos}>
          <Text>No Photos Available</Text>
        </View>
      )}

      {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: hp2(2),flexDirection:'row',flexWrap:'wrap',paddingHorizontal:wp2(2),}}>
       {photos?.map((p, i) => {
       return (
         <TouchableOpacity onPress={()=>setSelectedImage(p.node.image.uri)} key={i} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
         <Image
            key={i}
            source={{ uri: p.node.image.uri }}
           style={{width: '100%', height: '100%'}}
           resizeMode="cover"
         />
        {selectedImage===p.node.image.uri && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
       </TouchableOpacity>
       );
     })}
     </ScrollView> */}
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
    width: wp2(94),
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  heading: {
    color: 'black',
    fontSize: rfv(18),
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
  noPhotos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextTxt: {color: 'white', fontWeight: '700', fontSize: rfv(13)},
  txtInput: {
    width: wp2(90),
    height: hp2(5),
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: hp2(2),
  },
});
