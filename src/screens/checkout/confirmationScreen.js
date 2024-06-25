import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {IMAGES, ICONS, COLORS, wp2, hp2} from '../../theme';
import {useSelector} from 'react-redux';

import UploadSuccess from '../../assets/icons/uploaded-success.svg';
import Twitter from '../../assets/icons/twitter.svg';
import Facebook from '../../assets/icons/facebook.svg';
import LinkedIn from '../../assets/icons/linkedin.svg';

export default function ConfirmationScreen(props) {
  const {globalData} = useSelector(state => state.globalData);
  const tweetNow = () => {
    let twitterParameters = [];
    twitterParameters.push(
      'url=' +
        encodeURI(
          Platform.OS == 'ios'
            ? globalData.ios_app_url
            : globalData.android_app_url,
        ),
    );
    const url =
      'https://twitter.com/intent/tweet?' + twitterParameters.join('&');
    Linking.openURL(url)
      .then(data => {})
      .catch(() => {
        alert('Something went wrong');
      });
  };

  const postOnFacebook = () => {
    let facebookParameters = [];
    facebookParameters.push(
      'u=' +
        encodeURI(
          Platform.OS == 'ios'
            ? globalData.ios_app_url
            : globalData.android_app_url,
        ),
    );
    const url =
      'https://www.facebook.com/sharer/sharer.php?' +
      facebookParameters.join('&');

    Linking.openURL(url)
      .then(data => {})
      .catch(() => {
        alert('Something went wrong');
      });
  };

  const postOnLinkedin = () => {
    let url =
      Platform.OS == 'ios'
        ? globalData.ios_app_url
        : globalData.android_app_url;
    let linkedinurl = `https://www.linkedin.com/sharing/share-offsite/?url={${url}}`;
    Linking.openURL(linkedinurl)
      .then(data => {})
      .catch(() => {
        alert('Something went wrong');
      });
  };
  return (
    <View
      style={[
        styles.container,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      {/* <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" /> */}
      <UploadSuccess width="146" height="146" />
      <View style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
        <Text style={styles.uploadTxt}>Successfully Uploaded!</Text>
        <Text style={{fontSize: 14}}>Product updated</Text>
      </View>
      <View
        style={{
          backgroundColor: '#F6F6F6',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          borderRadius: 10,
          marginTop: '15%',
        }}>
        <Text style={{fontSize: 14}}>
          Tell your friends about your great choice:
        </Text>
        <View style={{flexDirection: 'row', gap: 10, paddingTop: 20}}>
          <TouchableOpacity
            onPress={tweetNow}
            style={{
              backgroundColor: 'white',
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 999,
            }}>
            <Twitter width="22" height="22" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={postOnFacebook}
            style={{
              backgroundColor: 'white',
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 999,
            }}>
            <Facebook width="20" height="20" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={postOnLinkedin}
            style={{
              backgroundColor: 'white',
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 999,
            }}>
            <LinkedIn width="20" height="20" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: '90%', marginTop: '10%'}}>
        <ContinueButton
          text={'Got it!'}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    width: wp2(80),
    height: hp2(60),

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  circle: {
    width: wp2(36),
    height: wp2(36),
    backgroundColor: '#13D755',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: rfv(17),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  iconWrap: {
    width: wp2(36),
    height: wp2(10),
    overflow: 'hidden',
  },
});
