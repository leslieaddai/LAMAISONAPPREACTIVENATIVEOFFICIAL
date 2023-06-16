import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../theme/fonts';
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
} from '../theme';
import { useNavigation } from '@react-navigation/native';

import { errorMessage,successMessage } from '../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../config/helperFunction';
import { LogoutUrl } from '../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

import FeedbackScreen from "../screens/feedback/feedbackScreen";
import NotificationScreen from "../screens/notification/notificationScreen";
import OrderTrackingScreen from "../screens/accountSetting/orderTrackingScreen";
import DestinationScreen from "../screens/accountSetting/destinationScreen";
import ConfirmationScreen from "../screens/checkout/confirmationScreen";
import CustomerSupportScreen from "../screens/feedback/customerSupportScreen";
import LookbookScreen from "../screens/lookbook/lookbookScreen";
import WardrobeScreen from "../screens/profileEditor/wardrobeScreen";
import CollectionScreen from "../screens/lookbook/collectionScreen";
import GalleryScreen from "../screens/profileBrand/galleryScreen";
import HomeScreen from "../screens/home/homeScreen";
import ListViewScreen from "../screens/home/listViewScreen";
import FTS100 from "../screens/fts100/FTS100";
import BrandProfileScreen from "../screens/profileBrand/brandProfileScreen";
import EditorProfileScreen from "../screens/profileEditor/editorProfileScreen";
import NextPickupScreen from "../screens/profileEditor/nextPickupScreen";
import DressingRoomScreen from "../screens/dressingRoom/dressingRoomScreen";
import BasketScreen from "../screens/basket/basketScreen";
import CheckoutScreen from "../screens/checkout/checkoutScreen";
import SearchScreen from "../screens/search/searchScreen";
import AnalyticsScreen from "../screens/accountSetting/analyticsScreen";
import SettingsScreen from "../screens/accountSetting/settingsScreen";
import FilterScreen from "../screens/filter/filterScreen";
import ProductType from "../screens/imageUploadLookbook/productType";
import Inventory from "../screens/inventory/inventory";
import FollowerList from "../screens/followers/followerList";
import Review from "../screens/feedback/review";
import AddReview from "../screens/feedback/addReview";

import WelcomeScreen from '../screens/welcome/welcomeScreen';
import SplashScreen from '../screens/splash/splashScreen';

import CommentScreen from '../screens/home/commentScreen';
import BuyNow from '../screens/checkout/buyNow';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TestScreen = () => {
  const navigation = useNavigation();

  //navigation.navigate('guestScreen')
  useEffect(()=>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'guestScreen' }],
    });
  },[])

  return(
    <View></View>
  )
}

const TestBrand = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userData)

  useEffect(()=>{
    navigation.navigate('brandProfileScreen',{userData:user})
  },[])

  return(
    <View></View>
  )
}

const TestEditor = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userData)

  useEffect(()=>{
    navigation.navigate('editorProfileScreen',{userData:user})
  },[])

  return(
    <View></View>
  )
}

const StackNavCompBrand = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)
  const basket = useSelector(state => state.basket)
  const navigation = useNavigation();
  return(
    //<Stack.Navigator initialRouteName={'brandProfileScreen'}>
    <Stack.Navigator >
    {/* <Stack.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{headerShown: false}} initialParams={{ userData:user}} /> */}
    <Stack.Screen name={'feedbackScreen'} component={FeedbackScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'notificationScreen'} component={NotificationScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'orderTrackingScreen'} component={OrderTrackingScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'destinationScreen'} component={DestinationScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'customerSupportScreen'} component={CustomerSupportScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'lookbookScreen'} component={LookbookScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'collectionScreen'} component={CollectionScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'galleryScreen'} component={GalleryScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'listViewScreen'} component={ListViewScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'analyticsScreen'} component={AnalyticsScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'settingsScreen'} component={SettingsScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'filterScreen'} component={FilterScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'productType'} component={ProductType} options={{headerShown: false}}/>
    <Stack.Screen name={'inventory'} component={Inventory} options={{headerShown: false}}/>
    <Stack.Screen name={'followerList'} component={FollowerList} options={{headerShown: false}}/>
  </Stack.Navigator>
  )
}

const StackNavCompEditor = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)
  const basket = useSelector(state => state.basket)
  const navigation = useNavigation();
  return(
    //<Stack.Navigator initialRouteName={'editorProfileScreen'}>
        <Stack.Navigator >
    {/* <Stack.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{headerShown: false}} initialParams={{ userData:user}} /> */}
    <Stack.Screen name={'feedbackScreen'} component={FeedbackScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'notificationScreen'} component={NotificationScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'orderTrackingScreen'} component={OrderTrackingScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'confirmationScreen'} component={ConfirmationScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'customerSupportScreen'} component={CustomerSupportScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'lookbookScreen'} component={LookbookScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'collectionScreen'} component={CollectionScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'galleryScreen'} component={GalleryScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'listViewScreen'} component={ListViewScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'checkoutScreen'} component={CheckoutScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'settingsScreen'} component={SettingsScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'filterScreen'} component={FilterScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'followerList'} component={FollowerList} options={{headerShown: false}}/>
    <Stack.Screen name={'review'} component={Review} options={{headerShown: false}}/>
    <Stack.Screen name={'addReview'} component={AddReview} options={{headerShown: false}}/>
  </Stack.Navigator>
  )
}

const StackNavCompGuest = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)
  const basket = useSelector(state => state.basket)
  const navigation = useNavigation();
  return(
    //<Stack.Navigator initialRouteName='FTS100'>
       <Stack.Navigator >
     {/* <Stack.Screen name={'FTS100'} component={FTS100} options={{headerShown: false}}/> */}
    <Stack.Screen name={'confirmationScreen'} component={ConfirmationScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'lookbookScreen'} component={LookbookScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'collectionScreen'} component={CollectionScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'galleryScreen'} component={GalleryScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'listViewScreen'} component={ListViewScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{headerShown: false}} />
    <Stack.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'checkoutScreen'} component={CheckoutScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'filterScreen'} component={FilterScreen} options={{headerShown: false}}/>
    <Stack.Screen name={'followerList'} component={FollowerList} options={{headerShown: false}}/>
    <Stack.Screen name={'review'} component={Review} options={{headerShown: false}}/>
    <Stack.Screen name={'addReview'} component={AddReview} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}


// function StackNavComp() {

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false);
//   const [data,setData]=useState([]);
//   const user = useSelector(state => state.userData)
//   const basket = useSelector(state => state.basket)
//   const navigation = useNavigation();

//   if(user?.userData?.role?.[0]?.id===3){
//     return(
//       <StackNavCompBrand/>
//     )
//     }
    
//     else if (user?.userData?.role?.[0]?.id===2){return(
//       <StackNavCompEditor/>
//     )}
//     else{return(
    
//       <StackNavCompGuest/>
//     )} 

//   // return(
//   //   <>
//   //   {user?.userData?.role?.[0]?.id===3 ? <StackNavCompBrand/> : user?.userData?.role?.[0]?.id===2 ? <StackNavCompEditor/> : <StackNavCompGuest/> }
//   //   </>
//   // )
  
// }

// function StackNavCompBrand() {

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false);
//   const [data,setData]=useState([]);
//   const user = useSelector(state => state.userData)
//   const basket = useSelector(state => state.basket)
//   const navigation = useNavigation();

  
//     return(
//       <Stack.Navigator initialRouteName={'brandProfileScreen'}>
//         <Stack.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{headerShown: false}} initialParams={{ userData:user}} />
//         <Stack.Screen name={'feedbackScreen'} component={FeedbackScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'notificationScreen'} component={NotificationScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'orderTrackingScreen'} component={OrderTrackingScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'destinationScreen'} component={DestinationScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'customerSupportScreen'} component={CustomerSupportScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'lookbookScreen'} component={LookbookScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'collectionScreen'} component={CollectionScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'galleryScreen'} component={GalleryScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'listViewScreen'} component={ListViewScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'analyticsScreen'} component={AnalyticsScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'settingsScreen'} component={SettingsScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'filterScreen'} component={FilterScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'productType'} component={ProductType} options={{headerShown: false}}/>
//         <Stack.Screen name={'inventory'} component={Inventory} options={{headerShown: false}}/>
//         <Stack.Screen name={'followerList'} component={FollowerList} options={{headerShown: false}}/>
//       </Stack.Navigator>
//     )
  
// }

// function StackNavCompEditor() {

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false);
//   const [data,setData]=useState([]);
//   const user = useSelector(state => state.userData)
//   const basket = useSelector(state => state.basket)
//   const navigation = useNavigation();

//     return(
//       <Stack.Navigator initialRouteName={'editorProfileScreen'}>
//         <Stack.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{headerShown: false}} initialParams={{ userData:user}} />
//         <Stack.Screen name={'feedbackScreen'} component={FeedbackScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'notificationScreen'} component={NotificationScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'orderTrackingScreen'} component={OrderTrackingScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'confirmationScreen'} component={ConfirmationScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'customerSupportScreen'} component={CustomerSupportScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'lookbookScreen'} component={LookbookScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'collectionScreen'} component={CollectionScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'galleryScreen'} component={GalleryScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'listViewScreen'} component={ListViewScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'checkoutScreen'} component={CheckoutScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'settingsScreen'} component={SettingsScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'filterScreen'} component={FilterScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'followerList'} component={FollowerList} options={{headerShown: false}}/>
//         <Stack.Screen name={'review'} component={Review} options={{headerShown: false}}/>
//         <Stack.Screen name={'addReview'} component={AddReview} options={{headerShown: false}}/>
//       </Stack.Navigator>
//     )
  
// }

// function StackNavCompGuest() {

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false);
//   const [data,setData]=useState([]);
//   const user = useSelector(state => state.userData)
//   const basket = useSelector(state => state.basket)
//   const navigation = useNavigation();

//     return(
//       <Stack.Navigator initialRouteName='testScreen'>
//         {navigation.navigate('guestScreen')}
//         <Stack.Screen name={'testScreen'} component={TestScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'confirmationScreen'} component={ConfirmationScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'lookbookScreen'} component={LookbookScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'collectionScreen'} component={CollectionScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'galleryScreen'} component={GalleryScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'listViewScreen'} component={ListViewScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{headerShown: false}} />
//         <Stack.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'checkoutScreen'} component={CheckoutScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'filterScreen'} component={FilterScreen} options={{headerShown: false}}/>
//         <Stack.Screen name={'followerList'} component={FollowerList} options={{headerShown: false}}/>
//         <Stack.Screen name={'review'} component={Review} options={{headerShown: false}}/>
//         <Stack.Screen name={'addReview'} component={AddReview} options={{headerShown: false}}/>
//     </Stack.Navigator>
//     )

// }

export const BottomNavigationBrand = () => {
  const dispatch = useDispatch()
const [loading, setLoading] = useState(false);
const [data,setData]=useState([]);
const user = useSelector(state => state.userData)
const basket = useSelector(state => state.basket)

const [showSplash,setShowSplash]=useState(true);
const [showWelcome,setShowWelcome]=useState(true);

useEffect(()=>{
  if(showSplash && user?.token){
    setTimeout(()=>{
      setShowSplash(false);
    },3000)
  }
  
  if(showWelcome && user?.token){
    setTimeout(()=>{
      setShowWelcome(false);
    },6000)
  }
},[])

  if(showSplash && user?.token){
    return(
      <SplashScreen/>
    )
  }

  if(showWelcome && user?.token){
    return(
      <WelcomeScreen/>
    )
  }

  return(
    <>
    <Tab.Navigator
    backBehavior='history'
    initialRouteName="homeScreen"
    screenOptions={({route}) => ({
      orientation: 'portrait',
      unmountOnBlur:true,
        //tabBarActiveTintColor: color.black,
        //tabBarInactiveTintColor: '#560f09',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarLabel:() => {return null},
        tabBarStyle: {
          width: wp2(100),
          height: Platform.OS==='ios'?hp2(10):hp2(8),
          backgroundColor: 'white',
          //flexDirection: 'row',
          //alignItems: 'center',
          //justifyContent: 'space-evenly',
        },
      })}
    >
         <Tab.Screen
        name="FTS100"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
              <Image
                source={IMAGES.fts2}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          ),
        }}
        component={FTS100}
      />
         <Tab.Screen
        name="searchScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.search2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
        }}
        component={SearchScreen}
      />
         <Tab.Screen
        name="homeScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.home2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
        }}
        component={HomeScreen}
        initialParams={{ showSplash,setShowSplash,showWelcome,setShowWelcome}}
      />

<Tab.Screen
        name="testBrand"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.profileicon2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),

        }}
        component={TestBrand}
        //initialParams={{ userData:user}}
      />

         {/* <Tab.Screen
        name="stackNavComp"
        component={StackNavCompBrand}
        // options={{
        //   unmountOnBlur: true,
        // }}
        options={() => ({
          // tabBarStyle: {
          //   display: "none",
          // },
          tabBarButton: () => null,
        })}
      /> */}


<Tab.Screen name={'feedbackScreen'} component={FeedbackScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'notificationScreen'} component={NotificationScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'orderTrackingScreen'} component={OrderTrackingScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'destinationScreen'} component={DestinationScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'customerSupportScreen'} component={CustomerSupportScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'lookbookScreen'} component={LookbookScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'collectionScreen'} component={CollectionScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'galleryScreen'} component={GalleryScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'listViewScreen'} component={ListViewScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'analyticsScreen'} component={AnalyticsScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'settingsScreen'} component={SettingsScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'filterScreen'} component={FilterScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'productType'} component={ProductType} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'inventory'} component={Inventory} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'followerList'} component={FollowerList} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'commentScreen'} component={CommentScreen} options={{tabBarButton: () => null,}}/>

    </Tab.Navigator>
  </>
  )
}

export const BottomNavigationEditor = () => {
  const dispatch = useDispatch()
const [loading, setLoading] = useState(false);
const [data,setData]=useState([]);
const user = useSelector(state => state.userData)
const basket = useSelector(state => state.basket)

const [showSplash,setShowSplash]=useState(true);
const [showWelcome,setShowWelcome]=useState(true);

useEffect(()=>{
  if(showSplash && user?.token){
    setTimeout(()=>{
      setShowSplash(false);
    },3000)
  }
  
  if(showWelcome && user?.token){
    setTimeout(()=>{
      setShowWelcome(false);
    },6000)
  }
},[])

  if(showSplash && user?.token){
    return(
      <SplashScreen/>
    )
  }

  if(showWelcome && user?.token){
    return(
      <WelcomeScreen/>
    )
  }

  return(
    <Tab.Navigator
    backBehavior='history'
    initialRouteName="homeScreen"
    screenOptions={({route}) => ({
      orientation: 'portrait',
      unmountOnBlur:true,
        //tabBarActiveTintColor: color.black,
        //tabBarInactiveTintColor: '#560f09',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarLabel:() => {return null},
        tabBarStyle: {
          width: wp2(100),
          height: Platform.OS==='ios'?hp2(10):hp2(8),
          backgroundColor: 'white',
          //flexDirection: 'row',
          //alignItems: 'center',
          //justifyContent: 'space-evenly',
          //position: 'absolute',
          //bottom: 0,
        },
      })}
    >
         <Tab.Screen
        name="FTS100"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
              <Image
                source={IMAGES.fts2}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          ),
        }}
        component={FTS100}
      />
         <Tab.Screen
        name="searchScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.search2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
        }}
        component={SearchScreen}
      />
         <Tab.Screen
        name="homeScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.home2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
        }}
        component={HomeScreen}
      />


        <Tab.Screen
        name="basketScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
           <>
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.bag2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
           {basket?.count > 0 && 
            <View style={styles.basketCounter}>
            <Text style={{color:'white',fontSize:rfv(10)}}>{basket?.count}</Text>
        </View>
        }
           </>
          ),
        }}
        component={BasketScreen}
      />

<Tab.Screen
        name="testEditor"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.profileicon2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
          
        }}
        component={TestEditor}
        //initialParams={{ userData:user}}
      />

         {/* <Tab.Screen
        name="stackNavComp"
        component={StackNavCompEditor}
        // options={{
        //   unmountOnBlur: true,
        // }}
        options={() => ({
          // tabBarStyle: {
          //   display: "none",
          // },
          tabBarButton: () => null,
        })}
      /> */}

<Tab.Screen name={'feedbackScreen'} component={FeedbackScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'notificationScreen'} component={NotificationScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'orderTrackingScreen'} component={OrderTrackingScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'confirmationScreen'} component={ConfirmationScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'customerSupportScreen'} component={CustomerSupportScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'lookbookScreen'} component={LookbookScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'collectionScreen'} component={CollectionScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'galleryScreen'} component={GalleryScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'listViewScreen'} component={ListViewScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'checkoutScreen'} component={CheckoutScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'settingsScreen'} component={SettingsScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'filterScreen'} component={FilterScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'followerList'} component={FollowerList} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'review'} component={Review} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'addReview'} component={AddReview} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'commentScreen'} component={CommentScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'buyNow'} component={BuyNow} options={{tabBarButton: () => null,}}/>

    </Tab.Navigator>
  )
}


export const BottomNavigationGuest = () => {
  const dispatch = useDispatch()
const [loading, setLoading] = useState(false);
const [data,setData]=useState([]);
const user = useSelector(state => state.userData)
//const basket = useSelector(state => state.basket)
const {products} = useSelector(state => state.GuestBasket);
  return(
    <Tab.Navigator
    backBehavior='history'
    initialRouteName="homeScreen"
    screenOptions={({route}) => ({
      orientation: 'portrait',
      unmountOnBlur:true,
        //tabBarActiveTintColor: color.black,
        //tabBarInactiveTintColor: '#560f09',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarLabel:() => {return null},
        tabBarStyle: {
          width: wp2(100),
          height: Platform.OS==='ios'?hp2(10):hp2(8),
          backgroundColor: 'white',
          //flexDirection: 'row',
          //alignItems: 'center',
          //justifyContent: 'space-evenly',
          //position: 'absolute',
          //bottom: 0,
        },
      })}
    >
  <Tab.Screen
        name="FTS100"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
              <Image
                source={IMAGES.fts2}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          ),
        }}
        component={FTS100}
      />
         <Tab.Screen
        name="searchScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.search2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
        }}
        component={SearchScreen}
      />
         <Tab.Screen
        name="homeScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.home2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
        }}
        component={HomeScreen}
      />


        <Tab.Screen
        name="basketScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
           <>
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.bag2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
           {products?.length !== 0 && 
            <View style={styles.basketCounter}>
            <Text style={{color:'white',fontSize:rfv(10)}}>{products?.length}</Text>
        </View>
        }
           </>
          ),
        }}
        component={BasketScreen}
      />
    

         <Tab.Screen
        name="testScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
            <Image
              source={IMAGES.profileicon2}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          ),
        }}
        component={TestScreen}
      />

{/* <Tab.Screen
        name="stackNavComp"
        component={StackNavCompGuest}
        // options={{
        //   unmountOnBlur: true,
        // }}
        options={() => ({
          // tabBarStyle: {
          //   display: "none",
          // },
          tabBarButton: () => null,
        })}
      /> */}

<Tab.Screen name={'confirmationScreen'} component={ConfirmationScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'lookbookScreen'} component={LookbookScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'wardrobeScreen'} component={WardrobeScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'collectionScreen'} component={CollectionScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'galleryScreen'} component={GalleryScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'listViewScreen'} component={ListViewScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'brandProfileScreen'} component={BrandProfileScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'editorProfileScreen'} component={EditorProfileScreen} options={{tabBarButton: () => null,}} />
    <Tab.Screen name={'nextPickupScreen'} component={NextPickupScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'dressingRoomScreen'} component={DressingRoomScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'checkoutScreen'} component={CheckoutScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'filterScreen'} component={FilterScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'followerList'} component={FollowerList} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'review'} component={Review} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'addReview'} component={AddReview} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'commentScreen'} component={CommentScreen} options={{tabBarButton: () => null,}}/>
    <Tab.Screen name={'buyNow'} component={BuyNow} options={{tabBarButton: () => null,}}/>

    </Tab.Navigator>
  )
}

// export function BottomNavigation(){

// const dispatch = useDispatch()
// const [loading, setLoading] = useState(false);
// const [data,setData]=useState([]);
// const user = useSelector(state => state.userData)
// const basket = useSelector(state => state.basket)

// if(user?.userData?.role?.[0]?.id===3){
// return(
// <BottomNavigationBrand/>
// )
// }

// else if (user?.userData?.role?.[0]?.id===2){return(
//   <BottomNavigationEditor/>
// )}
// else{return(

//   <BottomNavigationGuest/>
// )} 


// // return(
// //   <>
// //       {user?.userData?.role?.[0]?.id===3 ? <BottomNavigationBrand/> : user?.userData?.role?.[0]?.id===2 ? <BottomNavigationEditor/> : <BottomNavigationGuest/> }
// //   </>
// // )
// }


// export function BottomNavigationBrand() {

// const dispatch = useDispatch()
// const [loading, setLoading] = useState(false);
// const [data,setData]=useState([]);
// const user = useSelector(state => state.userData)
// const basket = useSelector(state => state.basket)

//     return (
//       <>
//     <Tab.Navigator
//     initialRouteName="homeScreen"
//     screenOptions={({route}) => ({
//       orientation: 'portrait',
//         //tabBarActiveTintColor: color.black,
//         //tabBarInactiveTintColor: '#560f09',
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         swipeEnabled: true,
//         animationEnabled: true,
//         tabBarLabel:() => {return null},
//         tabBarStyle: {
//           width: wp2(100),
//           height: hp2(8),
//           backgroundColor: 'white',
//           //flexDirection: 'row',
//           //alignItems: 'center',
//           //justifyContent: 'space-evenly',
//         },
//       })}
//     >
//          <Tab.Screen
//         name="FTS100"
//         options={{
//           tabBarIcon: ({focused, color, size}) => (
//             <View style={styles.iconWrap}>
//               <Image
//                 source={IMAGES.fts2}
//                 style={{width: '100%', height: '100%'}}
//                 resizeMode="contain"
//               />
//             </View>
//           ),
//         }}
//         component={FTS100}
//       />
//          <Tab.Screen
//         name="searchScreen"
//         options={{
//           tabBarIcon: ({focused, color, size}) => (
//             <View style={styles.iconWrap}>
//             <Image
//               source={IMAGES.search2}
//               style={{width: '100%', height: '100%'}}
//               resizeMode="contain"
//             />
//           </View>
//           ),
//         }}
//         component={SearchScreen}
//       />
//          <Tab.Screen
//         name="homeScreen"
//         options={{
//           tabBarIcon: ({focused, color, size}) => (
//             <View style={styles.iconWrap}>
//             <Image
//               source={IMAGES.home2}
//               style={{width: '100%', height: '100%'}}
//               resizeMode="contain"
//             />
//           </View>
//           ),
//         }}
//         component={HomeScreen}
//       />

//          <Tab.Screen
//         name="stackNavCompBrand"
//         options={{
//           unmountOnBlur: true,
//           tabBarIcon: ({focused, color, size}) => (
//             <View style={styles.iconWrap}>
//             <Image
//               source={IMAGES.profileicon2}
//               style={{width: '100%', height: '100%'}}
//               resizeMode="contain"
//             />
//           </View>
//           ),
//         }}
//         component={StackNavCompBrand}
//       />

//     </Tab.Navigator>

//     </>
//     )
// }

// export function BottomNavigationEditor() {

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false);
//   const [data,setData]=useState([]);
//   const user = useSelector(state => state.userData)
//   const basket = useSelector(state => state.basket)
  
//       return (
//       <Tab.Navigator
//       initialRouteName="homeScreen"
//       screenOptions={({route}) => ({
//         orientation: 'portrait',
//           //tabBarActiveTintColor: color.black,
//           //tabBarInactiveTintColor: '#560f09',
//           headerShown: false,
//           tabBarHideOnKeyboard: true,
//           swipeEnabled: true,
//           animationEnabled: true,
//           tabBarLabel:() => {return null},
//           tabBarStyle: {
//             width: wp2(100),
//             height: hp2(8),
//             backgroundColor: 'white',
//             //flexDirection: 'row',
//             //alignItems: 'center',
//             //justifyContent: 'space-evenly',
//             //position: 'absolute',
//             //bottom: 0,
//           },
//         })}
//       >
//            <Tab.Screen
//           name="FTS100"
//           options={{
//             tabBarIcon: ({focused, color, size}) => (
//               <View style={styles.iconWrap}>
//                 <Image
//                   source={IMAGES.fts2}
//                   style={{width: '100%', height: '100%'}}
//                   resizeMode="contain"
//                 />
//               </View>
//             ),
//           }}
//           component={FTS100}
//         />
//            <Tab.Screen
//           name="searchScreen"
//           options={{
//             tabBarIcon: ({focused, color, size}) => (
//               <View style={styles.iconWrap}>
//               <Image
//                 source={IMAGES.search2}
//                 style={{width: '100%', height: '100%'}}
//                 resizeMode="contain"
//               />
//             </View>
//             ),
//           }}
//           component={SearchScreen}
//         />
//            <Tab.Screen
//           name="homeScreen"
//           options={{
//             tabBarIcon: ({focused, color, size}) => (
//               <View style={styles.iconWrap}>
//               <Image
//                 source={IMAGES.home2}
//                 style={{width: '100%', height: '100%'}}
//                 resizeMode="contain"
//               />
//             </View>
//             ),
//           }}
//           component={HomeScreen}
//         />
  
  
//           <Tab.Screen
//           name="basketScreen"
//           options={{
//             tabBarIcon: ({focused, color, size}) => (
//              <>
//               <View style={styles.iconWrap}>
//               <Image
//                 source={IMAGES.bag2}
//                 style={{width: '100%', height: '100%'}}
//                 resizeMode="contain"
//               />
//             </View>
//              {basket?.count > 0 && 
//               <View style={styles.basketCounter}>
//               <Text style={{color:'white',fontSize:rfv(10)}}>{basket?.count}</Text>
//           </View>
//           }
//              </>
//             ),
//           }}
//           component={BasketScreen}
//         />
     
  
//            <Tab.Screen
//           name="stackNavCompEditor"
//           options={{
//             unmountOnBlur: true,
//             tabBarIcon: ({focused, color, size}) => (
//               <View style={styles.iconWrap}>
//               <Image
//                 source={IMAGES.profileicon2}
//                 style={{width: '100%', height: '100%'}}
//                 resizeMode="contain"
//               />
//             </View>
//             ),
//           }}
//           component={StackNavCompEditor}
//         />
  
//       </Tab.Navigator>
//       )
//   }

//   export function BottomNavigationGuest() {

//     const dispatch = useDispatch()
//     const [loading, setLoading] = useState(false);
//     const [data,setData]=useState([]);
//     const user = useSelector(state => state.userData)
//     const basket = useSelector(state => state.basket)
    
//         return (
//         <Tab.Navigator
//         initialRouteName="homeScreen"
//         screenOptions={({route}) => ({
//           orientation: 'portrait',
//             //tabBarActiveTintColor: color.black,
//             //tabBarInactiveTintColor: '#560f09',
//             headerShown: false,
//             tabBarHideOnKeyboard: true,
//             swipeEnabled: true,
//             animationEnabled: true,
//             tabBarLabel:() => {return null},
//             tabBarStyle: {
//               width: wp2(100),
//               height: hp2(8),
//               backgroundColor: 'white',
//               //flexDirection: 'row',
//               //alignItems: 'center',
//               //justifyContent: 'space-evenly',
//               //position: 'absolute',
//               //bottom: 0,
//             },
//           })}
//         >
//              <Tab.Screen
//             name="FTS100"
//             options={{
//               tabBarIcon: ({focused, color, size}) => (
//                 <View style={styles.iconWrap}>
//                   <Image
//                     source={IMAGES.fts2}
//                     style={{width: '100%', height: '100%'}}
//                     resizeMode="contain"
//                   />
//                 </View>
//               ),
//             }}
//             component={FTS100}
//           />
//              <Tab.Screen
//             name="searchScreen"
//             options={{
//               tabBarIcon: ({focused, color, size}) => (
//                 <View style={styles.iconWrap}>
//                 <Image
//                   source={IMAGES.search2}
//                   style={{width: '100%', height: '100%'}}
//                   resizeMode="contain"
//                 />
//               </View>
//               ),
//             }}
//             component={SearchScreen}
//           />
//              <Tab.Screen
//             name="homeScreen"
//             options={{
//               tabBarIcon: ({focused, color, size}) => (
//                 <View style={styles.iconWrap}>
//                 <Image
//                   source={IMAGES.home2}
//                   style={{width: '100%', height: '100%'}}
//                   resizeMode="contain"
//                 />
//               </View>
//               ),
//             }}
//             component={HomeScreen}
//           />
    
    
//             <Tab.Screen
//             name="basketScreen"
//             options={{
//               tabBarIcon: ({focused, color, size}) => (
//                <>
//                 <View style={styles.iconWrap}>
//                 <Image
//                   source={IMAGES.bag2}
//                   style={{width: '100%', height: '100%'}}
//                   resizeMode="contain"
//                 />
//               </View>
//                {basket?.count > 0 && 
//                 <View style={styles.basketCounter}>
//                 <Text style={{color:'white',fontSize:rfv(10)}}>{basket?.count}</Text>
//             </View>
//             }
//                </>
//               ),
//             }}
//             component={BasketScreen}
//           />
        
    
//              <Tab.Screen
//             name="stackNavCompGuest"
//             options={{
//               unmountOnBlur: true,
//               tabBarIcon: ({focused, color, size}) => (
//                 <View style={styles.iconWrap}>
//                 <Image
//                   source={IMAGES.profileicon2}
//                   style={{width: '100%', height: '100%'}}
//                   resizeMode="contain"
//                 />
//               </View>
//               ),
//             }}
//             component={StackNavCompGuest}
//           />
    
//         </Tab.Navigator>
//         )
//     }

const styles = StyleSheet.create({
  container: {
    width: wp2(100),
    height: hp2(8),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
  },
  iconWrap: {
    width: wp2(8),
    height: wp2(8),
    overflow: 'hidden',
  },
  iconText: {
    color: '#A1A1A1',
    fontWeight: '700',
  },
  basketCounter:{
    width:wp2(5),
    height:wp2(5),
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0F2ABA',
    position:'absolute',
    right:wp2(2),
    top:wp2(1),
  },
});