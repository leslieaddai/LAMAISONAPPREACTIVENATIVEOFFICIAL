import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, IMAGES, hp2, wp2} from '../../theme';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {GoogleRegister} from '../../config/Urls';
import {errorMessage, successMessage} from '../../config/NotificationMessage';
import {errorHandler} from '../../config/helperFunction';
import axios from 'react-native-axios';

const AccountTypeSocial = props => {
  const creatAccount = role => {
    // setLoading(true);
    let obj = {
      google_id: props.route.params.data.user.id,
      email: props.route.params.data.user.email,
      role_id: role == 'editor' ? 2 : 3,
      first_name: props.route.params.data.user.givenName,
      last_name: props.route.params.data.user.familyName,
      name: props.route.params.data.user.name,
      username: props.route.params.data.user.name,
    };
    axios
      .post(GoogleRegister, obj)
      .then(async function (res) {
        // setLoading(false);
        if (role === 'brand') {
          // chage to connectStripe
          props.navigation.navigate('homeScreen', {
            role: role == 'editor' ? 2 : 3,
            data: res?.data?.user.stripe_account,
          });
        } else {
          // setLoading(false);
          props.navigation.navigate('loginScreen');
          successMessage('Account Created Successfully');
        }
      })
      .catch(function (error) {
        // setLoading(false);
        errorMessage(errorHandler(error));
      });
  };
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        <Text style={styles.accTypeText}>Account Type</Text>
        <TouchableOpacity
          onPress={() => creatAccount('editor')}
          style={[styles.box, {marginTop: hp2(20), marginBottom: hp2(6)}]}>
          <View style={styles.iconWrap}>
            <Image
              source={IMAGES.editoricon}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          <Text style={{color: 'black'}}>Editor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => creatAccount('brand')}
          style={styles.box}>
          <View style={styles.iconWrap}>
            <Image
              source={IMAGES.brandicon}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          <Text style={{color: 'black'}}>Brand</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default AccountTypeSocial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
  },
  accTypeText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
  },
  box: {
    width: wp2(38),
    height: hp2(18),
    backgroundColor: 'white',
    borderRadius: wp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconWrap: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
  },
});
