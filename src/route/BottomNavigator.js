import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, Platform} from 'react-native';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {IMAGES, wp2, hp2} from '../theme';
import {getFocusedRouteNameFromRoute, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import FeedbackScreen from '../screens/feedback/feedbackScreen';
import NotificationScreen from '../screens/notification/notificationScreen';
import OrderTrackingScreen from '../screens/accountSetting/orderTrackingScreen';
import DestinationScreen from '../screens/accountSetting/destinationScreen';
import ConfirmationScreen from '../screens/checkout/confirmationScreen';
import CustomerSupportScreen from '../screens/feedback/customerSupportScreen';
import LookbookScreen from '../screens/lookbook/lookbookScreen';
import WardrobeScreen from '../screens/profileEditor/wardrobeScreen';
import CollectionScreen from '../screens/lookbook/collectionScreen';
import GalleryScreen from '../screens/profileBrand/galleryScreen';
import HomeScreen from '../screens/home/homeScreen';
import ListViewScreen from '../screens/home/listViewScreen';
import FTS100 from '../screens/fts100/FTS100';
import BrandProfileScreen from '../screens/profileBrand/brandProfileScreen';
import EditorProfileScreen from '../screens/profileEditor/editorProfileScreen';
import NextPickupScreen from '../screens/profileEditor/nextPickupScreen';
import DressingRoomScreen from '../screens/dressingRoom/dressingRoomScreen';
import BasketScreen from '../screens/basket/basketScreen';
import CheckoutScreen from '../screens/checkout/checkoutScreen';
import SearchScreen from '../screens/search/searchScreen';
import AnalyticsScreen from '../screens/accountSetting/analyticsScreen';
import SettingsScreen from '../screens/accountSetting/settingsScreen';
import FilterScreen from '../screens/filter/filterScreen';
import ProductType from '../screens/imageUploadLookbook/productType';
import Inventory from '../screens/inventory/inventory';
import FollowerList from '../screens/followers/followerList';
import Review from '../screens/feedback/review';
import AddReview from '../screens/feedback/addReview';
import WelcomeScreen from '../screens/welcome/welcomeScreen';
import SplashScreen from '../screens/splash/splashScreen';
import CommentScreen from '../screens/home/commentScreen';
import BuyNow from '../screens/checkout/buyNow';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TestScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'guestScreen'}],
    });
  }, []);

  return <View></View>;
};

const TestBrand = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userData);
  useEffect(() => {
    navigation.navigate('brandProfileScreen', {userData: user});
  }, []);

  return <View></View>;
};

const TestEditor = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userData);

  useEffect(() => {
    navigation.navigate('editorProfileScreen', {userData: user});
  }, []);

  return <View></View>;
};

const StackNavCompBrand = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const basket = useSelector(state => state.basket);
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'feedbackScreen'}
        component={FeedbackScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'notificationScreen'}
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'orderTrackingScreen'}
        component={OrderTrackingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'destinationScreen'}
        component={DestinationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'customerSupportScreen'}
        component={CustomerSupportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'lookbookScreen'}
        component={LookbookScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'wardrobeScreen'}
        component={WardrobeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'collectionScreen'}
        component={CollectionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'galleryScreen'}
        component={GalleryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'listViewScreen'}
        component={ListViewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'editorProfileScreen'}
        component={EditorProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'nextPickupScreen'}
        component={NextPickupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'dressingRoomScreen'}
        component={DressingRoomScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'analyticsScreen'}
        component={AnalyticsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'settingsScreen'}
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'filterScreen'}
        component={FilterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'productType'}
        component={ProductType}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'inventory'}
        component={Inventory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'followerList'}
        component={FollowerList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const BottomNavigationBrand = () => {
  const user = useSelector(state => state.userData);
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (showSplash && user?.token) {
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    }

    if (showWelcome && user?.token) {
      setTimeout(() => {
        setShowWelcome(false);
      }, 6000);
    }
  }, []);

  if (showSplash && user?.token) {
    return <SplashScreen />;
  }

  if (showWelcome && user?.token) {
    return <WelcomeScreen />;
  }

  return (
    <>
      <Tab.Navigator
        backBehavior="history"
        initialRouteName="homeScreen"
        screenOptions={({route}) => ({
          orientation: 'portrait',
          unmountOnBlur: true,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          swipeEnabled: true,
          animationEnabled: true,
          tabBarLabel: () => {
            return null;
          },
          tabBarStyle: {
            width: wp2(100),
            height: Platform.OS === 'ios' ? hp2(10) : hp2(8),
            backgroundColor: 'white',
            display: 'flex',
          },
        })}>
        <Tab.Screen
          name="FTS100"
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <View style={styles.iconWrap}>
                <Image
                  source={IMAGES.fts_bottom}
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
                  source={IMAGES.search_bottom}
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
          initialParams={{
            showSplash,
            setShowSplash,
            showWelcome,
            setShowWelcome,
          }}
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
        />

        <Tab.Screen
          name={'feedbackScreen'}
          component={FeedbackScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'notificationScreen'}
          component={NotificationScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'orderTrackingScreen'}
          component={OrderTrackingScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'destinationScreen'}
          component={DestinationScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'customerSupportScreen'}
          component={CustomerSupportScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'lookbookScreen'}
          component={LookbookScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'wardrobeScreen'}
          component={WardrobeScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'collectionScreen'}
          component={CollectionScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'galleryScreen'}
          component={GalleryScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'listViewScreen'}
          component={ListViewScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'editorProfileScreen'}
          component={EditorProfileScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'nextPickupScreen'}
          component={NextPickupScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'dressingRoomScreen'}
          component={DressingRoomScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'analyticsScreen'}
          component={AnalyticsScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'settingsScreen'}
          component={SettingsScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'filterScreen'}
          component={FilterScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'productType'}
          component={ProductType}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'inventory'}
          component={Inventory}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'followerList'}
          component={FollowerList}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'brandProfileScreen'}
          component={BrandProfileScreen}
          options={{tabBarButton: () => null}}
        />
        <Tab.Screen
          name={'commentScreen'}
          component={CommentScreen}
          options={{tabBarButton: () => null}}
        />
      </Tab.Navigator>
    </>
  );
};

export const BottomNavigationEditor = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const basket = useSelector(state => state.basket);
  const route = useRoute(); // Accessing the route object

  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedTab, setSelectedTab] = useState('homeScreen'); // Initialize with the default tab

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'homeScreen';
    setSelectedTab(routeName);
  }, [route]);

  useEffect(() => {
    if (showSplash && user?.token) {
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    }

    if (showWelcome && user?.token) {
      setTimeout(() => {
        setShowWelcome(false);
      }, 6000);
    }
  }, []);

  if (showSplash && user?.token) {
    return <SplashScreen />;
  }

  if (showWelcome && user?.token) {
    return <WelcomeScreen />;
  }

  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="homeScreen"
      screenOptions={({route}) => ({
        orientation: 'portrait',
        unmountOnBlur: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarLabel: () => {
          return null;
        },
        style: {
          paddingTop: 50,
          backgroundColor: 'red',
        },
        tabBarItemStyle: {
          margin: 10,
          paddingTop: 0,
          display: 'flex',
        },
        tabBarStyle: {
          width: wp2(100),

          height: Platform.OS === 'ios' ? hp2(10) : hp2(9),
          backgroundColor: 'white',
          display: 'flex',
        },
      })}>
      <Tab.Screen
        name="FTS100"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
              <Image
              
                source={IMAGES.fts_bottom}
                style={{ width: '100%', height: '100%', tintColor: selectedTab === 'FTS100' ? 'blue' : 'gray' }}
                resizeMode="contain"
              />
            </View>
          ),

          tabBarOptions: {
            activeTintColor: '#4D50E0', // Color when selected
            inactiveTintColor: '#A1A1A1', // Color when not selected

            tabStyle: {
              paddingBottom: 8,
              paddingTop: 8,
            },
          },
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: 'rgba(161, 161, 170, 1)',
                fontSize: 13,
                paddingBottom: 0,
                fontWeight: 500,
                color: selectedTab === 'FTS100' ? 'blue' : 'gray'
              }}>
              FTS
            </Text>
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
                source={IMAGES.search_bottom}
                style={{ width: '100%', height: '100%', tintColor: selectedTab === 'searchScreen' ? 'blue' : 'gray' }}
                resizeMode="contain"
              />
            </View>
          ),

          tabBarOptions: {
            activeTintColor: '#4D50E0', // Color when selected
            inactiveTintColor: '#A1A1A1', // Color when not selected

            tabStyle: {
              paddingBottom: 8,
              paddingTop: 8,
            },
          },
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: 'rgba(161, 161, 170, 1)',
                fontSize: 13,
                paddingBottom: 0,
                fontWeight: 500,
                color: selectedTab === 'searchScreen' ? 'blue' : 'gray'

              }}>
              Discover
            </Text>
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
                source={IMAGES.home}
                style={{ width: '100%', height: '100%', tintColor: selectedTab === 'homeScreen' ? 'blue' : 'gray' }}
                resizeMode="contain"
              />
            </View>
          ),

          tabBarOptions: {
            activeTintColor: '#4D50E0', // Color when selected
            inactiveTintColor: '#A1A1A1', // Color when not selected

            tabStyle: {
              paddingBottom: 8,
              paddingTop: 8,
            },
          },
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: 'rgba(161, 161, 170, 1)',
                fontSize: 13,
                paddingBottom: 0,
                fontWeight: 500,
                color: selectedTab === 'homeScreen' ? 'blue' : 'gray'

              }}>
              Home
            </Text>
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
                  source={IMAGES.basket}
                  style={{ width: '100%', height: '100%', tintColor: selectedTab === 'basketScreen' ? 'blue' : 'gray' }}
                  resizeMode="contain"
                />
              </View>
              {basket?.count > 0 && (
                <View style={styles.basketCounter}>
                  <Text style={{color: 'white', fontSize: rfv(10)}}>
                    {basket?.count}
                  </Text>
                </View>
              )}
            </>
          ),
          tabBarOptions: {
            activeTintColor: '#4D50E0', // Color when selected
            inactiveTintColor: '#A1A1A1', // Color when not selected

            tabStyle: {
              paddingBottom: 8,
              paddingTop: 8,
            },
          },
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: 'rgba(161, 161, 170, 1)',
                fontSize: 13,
                paddingBottom: 0,
                fontWeight: 500,
                color: selectedTab === 'basketScreen' ? 'blue' : 'gray'
              }}>
              Basket
            </Text>
          ),
        }}
        component={BasketScreen}
      />
{console.log(selectedTab)}
      <Tab.Screen
        name="testEditor"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
              <Image
                source={IMAGES.profile_bottom}
                style={{ width: '100%', height: '100%', tintColor: selectedTab === 'editorProfileScreen' ? 'blue' : 'gray' }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarOptions: {
            activeTintColor: '#4D50E0', // Color when selected
            inactiveTintColor: '#A1A1A1', // Color when not selected

            tabStyle: {
              paddingBottom: 8,
              paddingTop: 8,
            },
          },
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: 'rgba(161, 161, 170, 1)',
                fontSize: 13,
                paddingBottom: 0,
                fontWeight: 500,
                color: selectedTab === 'editorProfileScreen' ? 'blue' : 'gray'
              }}>
              Profile
            </Text>
          ),
        }}
        component={TestEditor}
      />

      <Tab.Screen
        name={'feedbackScreen'}
        component={FeedbackScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'notificationScreen'}
        component={NotificationScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'orderTrackingScreen'}
        component={OrderTrackingScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'confirmationScreen'}
        component={ConfirmationScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'customerSupportScreen'}
        component={CustomerSupportScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'lookbookScreen'}
        component={LookbookScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'wardrobeScreen'}
        component={WardrobeScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'collectionScreen'}
        component={CollectionScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'galleryScreen'}
        component={GalleryScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'listViewScreen'}
        component={ListViewScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'brandProfileScreen'}
        component={BrandProfileScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'nextPickupScreen'}
        component={NextPickupScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'dressingRoomScreen'}
        component={DressingRoomScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'checkoutScreen'}
        component={CheckoutScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'settingsScreen'}
        component={SettingsScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'filterScreen'}
        component={FilterScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'followerList'}
        component={FollowerList}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'review'}
        component={Review}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'addReview'}
        component={AddReview}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'editorProfileScreen'}
        component={EditorProfileScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'commentScreen'}
        component={CommentScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'buyNow'}
        component={BuyNow}
        options={{tabBarButton: () => null}}
      />
    </Tab.Navigator>
  );
};

export const BottomNavigationGuest = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const {products} = useSelector(state => state.GuestBasket);
  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="homeScreen"
      screenOptions={({route}) => ({
        orientation: 'portrait',
        unmountOnBlur: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarLabel: () => {
          return null;
        },
        tabBarStyle: {
          width: wp2(100),
          height: Platform.OS === 'ios' ? hp2(10) : hp2(8),
          backgroundColor: 'white',
          display: 'flex',
        },
      })}>
      <Tab.Screen
        name="FTS100"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.iconWrap}>
              <Image
                source={IMAGES.fts_bottom}
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
              {products?.length !== 0 && (
                <View style={styles.basketCounter}>
                  <Text style={{color: 'white', fontSize: rfv(10)}}>
                    {products?.length}
                  </Text>
                </View>
              )}
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

      <Tab.Screen
        name={'confirmationScreen'}
        component={ConfirmationScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'lookbookScreen'}
        component={LookbookScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'wardrobeScreen'}
        component={WardrobeScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'collectionScreen'}
        component={CollectionScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'galleryScreen'}
        component={GalleryScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'listViewScreen'}
        component={ListViewScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'brandProfileScreen'}
        component={BrandProfileScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'editorProfileScreen'}
        component={EditorProfileScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'nextPickupScreen'}
        component={NextPickupScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'dressingRoomScreen'}
        component={DressingRoomScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'checkoutScreen'}
        component={CheckoutScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'filterScreen'}
        component={FilterScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'followerList'}
        component={FollowerList}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'review'}
        component={Review}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'addReview'}
        component={AddReview}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'commentScreen'}
        component={CommentScreen}
        options={{tabBarButton: () => null}}
      />
      <Tab.Screen
        name={'buyNow'}
        component={BuyNow}
        options={{tabBarButton: () => null}}
      />
    </Tab.Navigator>
  );
};

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
  basketCounter: {
    width: wp2(5),
    height: wp2(5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F2ABA',
    position: 'absolute',
    right: wp2(2),
    top: Platform.OS == 'android' ? wp2(2) : wp2(1),
  },
});
