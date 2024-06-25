import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2, IMAGES} from '../../theme';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {DeleteAccount, LogoutUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import Profile from '../../assets/icons/profile.svg';
import Notification from '../../assets/icons/notification.svg';
import Upload from '../../assets/icons/upload.svg';
import Inventory from '../../assets/icons/inventory.svg';
import Shipping from '../../assets/icons/shipping.svg';
import Analytics from '../../assets/icons/analytics.svg';
import Clipboard from '../../assets/icons/clipboard.svg';
import Terms from '../../assets/icons/terms.svg';
import Security from '../../assets/icons/security.svg';
import Customer from '../../assets/icons/customer.svg';
import Logout from '../../assets/icons/logout.svg';
import Location from '../../assets/icons/location.svg';

const profile = <Profile width={20} height={20} color="black" />;
const notification = <Notification width={20} height={20} color="black" />;
const upload = <Upload width={20} height={20} color="black" />;
const inventory = <Inventory width={20} height={20} color="black" />;
const shipping = <Shipping width={20} height={20} color="black" />;
const analytics = <Analytics width={20} height={20} color="black" />;
const clipboard = <Clipboard width={20} height={20} color="black" />;
const terms = <Terms width={20} height={20} color="black" />;
const security = <Security width={20} height={20} color="black" />;
const customer = <Customer width={20} height={20} color="black" />;
const logout = <Logout width={20} height={20} color="black" />;
const location = <Location width={20} height={20} color="black" />;

export default function SettingsScreen(props) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {count} = useSelector(state => state.ordercount);
  const {warning} = useSelector(state => state.warningcheck);
  // const user = useSelector(state => state.userData);

  const dispatch = useDispatch();
  const settingOptions = (name, badge, navScreen, icon) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(navScreen, {user: props.route.params.user})
        }
        style={styles.myStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 2,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              source={icon}
              style={{
                width: name == 'Shipping Address' ? wp2(6) : wp2(6),
                height: name == 'Shipping Address' ? wp2(6) : wp2(6),
                marginRight: wp2(3),
              }}
            /> */}
            <View style={{marginRight: wp2(3)}}>{icon}</View>
            <Text
              style={{
                color: name === 'LOGOUT' ? 'black' : 'black',
                fontWeight: name === 'LOGOUT' ? '400' : '400',
                fontSize: 16,
              }}>
              {name}
            </Text>
            {badge === 'blue' && (
              <View style={styles.circle}>
                <Text style={{color: 'white'}}>{count}</Text>
              </View>
            )}
          </View>
          {name !== 'LOGOUT' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                justifyContent: 'space-between',
              }}>
              {badge === 'red' && (
                <View style={[styles.circle, {backgroundColor: '#B00002'}]} />
              )}
              <ICONS.AntDesign name="right" size={15} color="black" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const logoutButton = () => {
    const logoutHandle = () => {
      Alert.alert('Confirmation', 'Do you want to logout?', [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setLoading(true);

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: LogoutUrl,
              headers: {
                Authorization: `Bearer ${props?.route?.params?.user?.token}`,
                Accept: 'application/json',
              },
            };

            axios
              .request(config)
              .then(async function (res) {
                dispatch({
                  type: types.Clearcart,
                });
                dispatch({
                  type: types.Logout,
                });
                OneSignal.removeExternalUserId();

                setLoading(false);
                successMessage('Logout Success');
              })
              .catch(function (error) {
                console.log(error.response);
                setLoading(false);
                errorMessage(errorHandler(error));
              });
          },
        },
      ]);
    };
    const lockIcon = IMAGES.logout; // Replace with your image path

    return (
      <TouchableOpacity onPress={logoutHandle} style={styles.myStyleLogout}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              source={lockIcon}
              style={{width: wp2(6), height: wp2(6), marginRight: wp2(3)}}
            /> */}
            <View style={{marginRight: wp2(3)}}>{logout}</View>
            <Text
              style={{
                color: '#EB1414',
                fontWeight: '400',
                fontSize: 16,
              }}>
              Log Out
            </Text>
          </View>

          {
            <ICONS.AntDesign
              name="right"
              size={15}
              color="rgba(236, 45, 48, 1)"
            />
          }
        </View>
      </TouchableOpacity>
    );
  };

  const DeleteButton = () => {
    const DeleteHandler = () => {
      Alert.alert(
        'Confirmation ',
        'Are you sure you want to delete this account? This action will result in the permanent deletion of your account.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              console.log('Cancel');
            },
          },
          {
            text: 'Yes',
            onPress: () => {
              setLoading(true);
              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: DeleteAccount + props?.route?.params?.user?.userData?.id,
                headers: {
                  Authorization: `Bearer ${props?.route?.params?.user?.token}`,
                },
              };
              axios
                .request(config)
                .then(async function (res) {
                  dispatch({
                    type: types.Clearcart,
                  });
                  dispatch({
                    type: types.Logout,
                  });
                  OneSignal.removeExternalUserId();

                  setLoading(false);
                  successMessage('Delete Account Successfully');
                })
                .catch(function (error) {
                  setLoading(false);
                  errorMessage(errorHandler(error));
                });
            },
          },
        ],
      );
    };
    const lockIcon = IMAGES.profile; // Replace with your image path

    return (
      <TouchableOpacity
        onPress={DeleteHandler}
        style={[styles.myStyleLogout, {marginVertical: 0}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              source={lockIcon}
              style={{width: wp2(6), height: wp2(6), marginRight: wp2(3)}}
            /> */}
            <View style={{marginRight: wp2(3)}}>
              <Profile width={20} height={20} color="#EB1414" />
            </View>
            <Text
              style={{
                color: '#EB1414',
                fontWeight: '400',
                fontSize: 16,
              }}>
              Delete Acount
            </Text>
          </View>

          {
            <ICONS.AntDesign
              name="right"
              size={15}
              color="rgba(236, 45, 48, 1)"
            />
          }
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (loading) {
      const parent = props.navigation.setOptions({
        tabBarStyle: {display: 'none'},
      });
    } else {
      const parent = props.navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
          width: wp2(100),
          height: Platform.OS === 'ios' ? hp2(10) : hp2(8),
          backgroundColor: 'white',
        },
      });
    }
  }, [loading]);
  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && (
          <SkypeIndicator
            style={{
              width: wp2(100),
              height: hp2(100),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            color={'black'}
          />
        )}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: '#FFFFFF'}}></SafeAreaView>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScrollView>
          <View style={styles.container}>
            <NewHeaderComp
              arrowNavigation={() => props.navigation.goBack()}
              movePreviousArrow={true}
              title={'Settings'}
            />

            {props?.route?.params?.user?.userData?.role?.[0]?.id === 3 ? (
              <View style={{marginTop: 30}}>
                {settingOptions('Edit Profile', '', 'editProfile', profile)}
                {settingOptions(
                  'Notifications',
                  '',
                  'notificationScreen',
                  notification,
                )}
                {settingOptions(
                  'Image/Product Upload',
                  '',
                  'destinationScreen',
                  upload,
                )}
                {settingOptions(
                  'Inventory',
                  `${warning ? 'red' : ''}`,
                  'inventory',
                  inventory,
                )}
                {settingOptions(
                  'Standart Shipping',
                  '',
                  'shippingLocation',
                  shipping,
                )}
                {settingOptions('Analytics', '', 'analyticsScreen', analytics)}
                {settingOptions(
                  'All Orders',
                  `${count > 0 ? 'blue' : ''}`,
                  'orderTrackingScreen',
                  clipboard,
                )}
                {settingOptions('Term of Use', '', 'termsScreen', terms)}
                {settingOptions(
                  'Privacy & Security',
                  '',
                  'privacyScreen',
                  security,
                )}
                {settingOptions(
                  'Customer Advice',
                  '',
                  'customerSupportScreen',
                  customer,
                )}
                <View style={{marginTop: 30}}>
                  {DeleteButton()}
                  {logoutButton()}
                </View>
              </View>
            ) : (
              <View
                style={{
                  marginTop: 30,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View>
                  {settingOptions('Profile', '', 'editProfile', profile)}
                  {settingOptions(
                    'Notifications',
                    '',
                    'notificationScreen',
                    notification,
                  )}
                  {settingOptions(
                    'Shipping Address',
                    '',
                    'shippingAddress',
                    location,
                  )}
                  {settingOptions(
                    'All Orders',
                    '',
                    'orderTrackingScreen',
                    clipboard,
                  )}
                  {settingOptions('Term of Use', '', 'termsScreen', terms)}
                  {settingOptions(
                    'Privacy & Security',
                    '',
                    'privacyScreen',
                    security,
                  )}
                  {settingOptions(
                    'Customer Advice',
                    '',
                    'customerSupportScreen',
                    customer,
                  )}
                </View>
                <View style={{marginTop: 30}}>
                  {DeleteButton()}
                  {logoutButton()}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headWrap: {
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',

    justifyContent: 'center',
    width: wp2(100),
  },
  heading: {
    color: 'black',
    fontSize: rfv(16),
    fontWeight: '500',
  },

  myStyle: {
    flexDirection: 'row',
    width: wp2(90),
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    paddingVertical: hp2(2),
    paddingHorizontal: wp2(5),
    marginBottom: hp2(1.5),
    borderRadius: 10, // Rounded border with radius 10px
  },

  myStyleLogout: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: hp2(2),
    paddingHorizontal: wp2(5),
    marginBottom: 10,
    borderRadius: 10, // Rounded border with radius 10px
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)', // Grey color with 10% opacity
  },
  filters: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(1.5),
  },
  circle: {
    width: wp2(6),
    height: wp2(6),
    backgroundColor: '#0F2ABA',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
});
