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
import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import {
  IMAGES,
  ICONS,
  COLORS,
  wp2,
  hp2,
} from '../../theme';
import { useSelector } from 'react-redux';

export default function ConfirmationScreen(props) {
  const {globalData} = useSelector(state => state.globalData)
  const tweetNow = () => {
    let twitterParameters = [];
    twitterParameters.push('url=' + encodeURI(Platform.OS == 'ios' ? globalData.ios_app_url:globalData.android_app_url));
    const url =
    'https://twitter.com/intent/tweet?'
    + twitterParameters.join('&');
  Linking.openURL(url)
    .then((data) => {
    })
    .catch(() => {
      alert('Something went wrong');
    });
  }

  const postOnFacebook = () => {
    let facebookParameters = [];
    facebookParameters.push('u=' + encodeURI(Platform.OS == 'ios' ? globalData.ios_app_url:globalData.android_app_url));
    const url =
    'https://www.facebook.com/sharer/sharer.php?' +
    facebookParameters.join('&');

  Linking.openURL(url)
    .then((data) => {
    })
    .catch(() => {
      alert('Something went wrong');
    });
  }

  const postOnLinkedin = () => {
    let url = Platform.OS =='ios'?globalData.ios_app_url:globalData.android_app_url 
    let linkedinurl = `https://www.linkedin.com/sharing/share-offsite/?url={${url}}`
    Linking.openURL(linkedinurl)
    .then((data) => {
    })
    .catch(() => {
      alert('Something went wrong');
    });
  }
  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.circle}>
            <ICONS.FontAwesome 
            name="check" 
            size={wp2(18)} 
            color="white" />
        </View>
      <Text style={styles.text}>Congratulations!</Text>
      <Text style={{color:'black',textTransform:'uppercase'}}>Your order is on it’s way</Text>
      <View style={styles.iconWrap}>
        <Image
            source={IMAGES.rightArrow}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      <Text style={{
        color:'black',
        textTransform:'uppercase',
        textAlign:'center'}}>Tell your friends about{'\n'}your great choice</Text>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{tweetNow()}}>
        <ICONS.AntDesign 
        name="twitter" 
        size={wp2(12)} 
        color="black" 
        style={{marginHorizontal:wp2(1)}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{postOnFacebook()}}>
        <ICONS.AntDesign 
        name="facebook-square" 
        size={wp2(12)} 
        color="black" 
        style={{marginHorizontal:wp2(1)}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{postOnLinkedin()}}>
        <ICONS.AntDesign 
        name="linkedin-square" 
        size={wp2(12)} 
        color="black" 
        style={{marginHorizontal:wp2(1)}}/>
        </TouchableOpacity>
        
      </View>
      </View>
    </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    justifyContent:'center',
  },
  wrap:{
    width:wp2(80),
    height:hp2(60),

    alignItems:'center',
    justifyContent:'space-evenly',
  },
  circle:{
    width:wp2(36),
    height:wp2(36),
    backgroundColor:'#13D755',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
  },
  text: {
    color: 'black',
    fontSize: rfv(17),
    fontWeight: '700',
    textTransform:'uppercase',
  },
  iconWrap:{
    width: wp2(36),
    height: wp2(10),
    overflow: 'hidden',
  },
});
