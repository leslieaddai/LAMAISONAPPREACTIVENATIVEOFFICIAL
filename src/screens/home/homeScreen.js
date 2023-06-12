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
  SafeAreaView,
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
import BottomComp from '../../components/bottomComp';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import WelcomeScreen from '../welcome/welcomeScreen';
import SplashScreen from '../splash/splashScreen';

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  //const showSplash = useSelector(state => state.Splash.showSplash)
  //const showWelcome = useSelector(state => state.Splash.showWelcome)
  const user = useSelector(state => state.userData);
  //const [showSplash,setShowSplash]=useState(true);
  //const [showWelcome,setShowWelcome]=useState(true);
  //const splashState = useSelector(state => state.Splash)
  //const [splashState,setSplashState]=useState(useSelector(state => state.Splash))
  //console.log(showSplash);
  //console.log(showWelcome);
  //console.log(splashState);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     dispatch({
  //       type: types.HideSplash
  //     });
  //   },5000)
  // },[])

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     dispatch({
  //       type: types.HideSplash
  //     });
  //   }, 3000);

  //   return () => {
  //     // clears timeout before running the new effect
  //     clearTimeout(timeout);
  //   };
  //   RunThis();
  // }, []);

  // const RunThis = () => {
  //   setTimeout(()=>{
  //     dispatch({
  //       type: types.HideSplash
  //     });

  //     setTimeout(()=>{
  //       dispatch({
  //         type: types.HideWelcome
  //       });
  //     },3000)

  //   },3000)

  // }

  // useEffect(()=>{
  //   if(showSplash && user.token){
  //     setTimeout(()=>{
  //       // dispatch({
  //       //   type: types.HideSplash
  //       // });
  //       setShowSplash(false);
  //     },3000)
  //   }

  //   if(showWelcome && user.token){
  //     setTimeout(()=>{
  //       // dispatch({
  //       //   type: types.HideWelcome
  //       // });
  //       setShowWelcome(false);
  //     },6000)
  //   }
  // },[])

  // const brandComp = (nav) => {
  //     return(
  //        <View style={{marginVertical:hp2(2)}}>
  //        {nav?(
  //          <TouchableOpacity onPress={()=>props.navigation.navigate('brandProfileScreen',{userData:{userData:{id:9}}})} style={styles.brandImage}>
  //          <Image
  //            source={IMAGES.randomPic}
  //            style={{width: '100%', height: '100%'}}
  //            resizeMode="cover"
  //          />
  //        </TouchableOpacity>
  //        ):(
  //          <View style={styles.brandImage}>
  //          <Image
  //            source={IMAGES.randomPic}
  //            style={{width: '100%', height: '100%'}}
  //            resizeMode="cover"
  //          />
  //        </View>
  //        )}
  //        </View>
  //     )
  // }

  const brandComp = nav => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(nav)}
          style={styles.brandImage}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const postComp = () => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('editorProfileScreen')}
            style={styles.imageWrap}>
            <Image
              source={IMAGES.randomProfile}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ICONS.FontAwesome
            name="retweet"
            size={24}
            color={'black'}
            style={{marginHorizontal: wp2(4)}}
          />
          <Text style={{color: 'black'}}>ICEY.B Shared</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('imageViewScreen')}
          style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const productComp = () => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('brandProfileScreen')}
          style={[
            styles.imageWrap,
            {marginLeft: wp2(3), marginVertical: hp2(1)},
          ]}>
          <Image
            source={IMAGES.randomProfile}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.productContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('imageViewScreen')}
            style={styles.productImageContainer}>
            <Image
              source={IMAGES.randomPic}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('imageViewScreen')}
            style={styles.productImageContainer}>
            <Image
              source={IMAGES.randomPic}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('imageViewScreen')}
            style={styles.productImageContainer}>
            <Image
              source={IMAGES.randomPic}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('imageViewScreen')}
            style={styles.productImageContainer}>
            <Image
              source={IMAGES.randomPic}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const productComp2 = () => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('brandProfileScreen')}
          style={[
            styles.imageWrap,
            {marginLeft: wp2(3), marginVertical: hp2(1)},
          ]}>
          <Image
            source={IMAGES.randomProfile}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            width: wp2(100),
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('imageViewScreen')}
            style={styles.productImageContainer2}>
            <Image
              source={IMAGES.randomPic}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('imageViewScreen')}
            style={styles.productImageContainer2}>
            <Image
              source={IMAGES.randomPic}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // if(showSplash && user.token){
  //   return(
  //     <SplashScreen/>
  //   )
  // }

  // if(showWelcome && user.token){
  //   return(
  //     <WelcomeScreen/>
  //   )
  // }

  return (
    //<SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.logoWrap}>
        {/* <Image
          source={IMAGES.logo}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        /> */}
        <Text style={{fontSize: rfv(18), color: 'gray'}}>LA MAISON APP</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('homeScreen')}
          style={styles.iconWrap}>
          <Image
            source={IMAGES.gridView}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('listViewScreen')}
          style={styles.iconWrap}>
          <Image
            source={IMAGES.listView}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp2(12)}}>
        {postComp()}

        <Text style={styles.text}>Popular Brands</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {brandComp('brandProfileScreen')}
          {brandComp('brandProfileScreen')}
          {brandComp('brandProfileScreen')}
          {brandComp('brandProfileScreen')}
          {brandComp('brandProfileScreen')}
        </ScrollView>

        {productComp()}

        <Text style={styles.text}>Popular Pieces</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
        </ScrollView>

        {productComp2()}

        <Text style={styles.text}>Popular Colour</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
          {brandComp('dressingRoomScreen')}
        </ScrollView>

        {productComp2()}
      </ScrollView>

      {/* <BottomComp /> */}
    </View>
    //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  logoWrap: {
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp2(100),
    height: hp2(8),
    overflow: 'hidden',
  },
  iconContainer: {
    width: wp2(44),
    height: hp2(8),
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconWrap: {
    width: wp2(12),
    height: hp2(8),
    overflow: 'hidden',
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  headWrap: {
    width: wp2(94),
    height: hp2(7),
    //backgroundColor:'red',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp2(1),
  },
  imageWrap: {
    width: wp2(14),
    height: wp2(14),
    borderRadius: wp2(5),
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
  imageContainer: {
    width: wp2(100),
    height: hp2(30),
    overflow: 'hidden',
    //backgroundColor:'yellow',
    marginTop: hp2(1),
  },
  text: {
    fontWeight: '600',
    fontSize: rfv(18),
    color: 'black',
    marginTop: hp2(2),
    marginLeft: wp2(4),
    marginBottom: hp2(1),
  },
  brandImage: {
    width: wp2(34),
    height: hp2(16),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
  },
  productContainer: {
    width: wp2(100),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productImageContainer: {
    width: wp2(47),
    height: hp2(18),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(2),
  },
  productImageContainer2: {
    width: wp2(48),
    height: hp2(32),
    overflow: 'hidden',
    //marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
});
