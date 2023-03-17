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
import Popular from '../../components/brandProfileComps/popular';
import Lookbook from '../../components/brandProfileComps/lookbook';
import About from '../../components/brandProfileComps/about';

export default function BrandProfileScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
      <View style={styles.badge}>
          <Image
            source={IMAGES.badge}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <ICONS.Ionicons name="menu-outline" size={44} color="black" />
        <View style={styles.notificationBadge}>
            <Text style={{color:'white',fontSize:rfv(10)}}>1</Text>
        </View>
      </View>
      <View style={styles.brandLogo}>
      <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
      </View>
      <View style={{flexDirection:'row',marginVertical:hp2(2),justifyContent:'space-between',paddingHorizontal:wp2(4)}}>
        <Text style={{fontWeight:'700',fontSize:rfv(22),color:'black'}}>Represent clo</Text>
        <View style={styles.followButton}>
            <Text style={{fontWeight:'700',color:'white',fontSize:rfv(13)}}>FOLLOW</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:hp2(12)}}>
        <Text style={{color:'black',fontWeight:'600',fontSize:rfv(18),marginLeft:wp2(3)}}>POPULAR</Text>
        <Popular />
        <Popular />
        <Popular />
        <Popular />

        <Lookbook />

        <TouchableOpacity  onPress={() => props.navigation.navigate('galleryScreen')} style={styles.gallery}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(28)}}>
          GALLERY
        </Text>
        </TouchableOpacity>

        <About />

      </ScrollView>

      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  iconWrap:{
    marginTop: hp2(4),
    flexDirection:'row',
    paddingHorizontal:wp2(4),
    justifyContent:'space-between',
  },
  badge: {
    width: wp2(10),
    height: wp2(10),
    overflow: 'hidden',
  },
  notificationBadge:{
    width:wp2(5),
    height:wp2(5),
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0F2ABA',
    position:'absolute',
    right:wp2(4),
  },
  brandLogo:{
    width:wp2(100),
    height:hp2(20),
  },
  followButton:{
    width:wp2(30),
    height:hp2(5),
    borderRadius:wp2(8),
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  gallery: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp2(2),
  },
});
