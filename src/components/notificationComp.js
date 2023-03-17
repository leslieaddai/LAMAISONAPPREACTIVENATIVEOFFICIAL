import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
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

export default function NotificationComp(props) {
    //console.log(props);
    const [followButton,setFollowButton]=useState(props.follow);
  return (
    <View style={styles.container}>
        <View style={styles.imgWrap}>
        <Image
          source={IMAGES.randomProfile}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={{width:wp2(followButton?50:60),paddingHorizontal:wp2(3),}}>
        <Text style={{color:'black',marginBottom:4}}>ICEY.B liked your post</Text>
        <Text style={{color:'black'}}>1 hour ago</Text>
      </View>
      {followButton?(
        <TouchableOpacity style={styles.followBTN}>
            <Text style={styles.followText}>FOLLOW</Text>
        </TouchableOpacity>
      ):(
        <View style={styles.imgWrap}>
        <Image
          source={IMAGES.randomProfile}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      )}
      </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:wp2(92),
        height:hp2(10),
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        marginVertical:hp2(1),
    },
    imgWrap: {
        width: wp2(16),
        height: wp2(18),
        overflow: 'hidden',
        borderRadius: wp2(4),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      followBTN:{
        width:wp2(26),
        height:hp2(5),
        backgroundColor:'black',
        borderRadius:wp2(10),
        alignItems:'center',
        justifyContent:'center',
      },
      followText:{
        color:'white',
        fontWeight:'700',
        fontSize:rfv(13),
      },
});
