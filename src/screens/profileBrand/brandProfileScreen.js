import React, {useState} from 'react';
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
  ImageBackground,
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
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <View style={styles.brandLogo}>
          <ImageBackground
            source={IMAGES.temp}
            style={{width: '100%', height: '100%',justifyContent:'space-between'}}
            resizeMode="cover"
          >
                  <View style={styles.iconWrap}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('FTS100')} style={styles.badge}>
          <Image
            source={IMAGES.badge}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.navigation.navigate('settingsScreen',{user:'brand'})}>
        <ICONS.Ionicons name="menu-outline" size={44} color="black" />
        </TouchableOpacity>
        <View style={styles.notificationBadge}>
            <Text style={{color:'white',fontSize:rfv(10)}}>1</Text>
        </View>
      </View>

      <View style={{marginBottom:hp2(1),flexDirection:'row',justifyContent:'space-between',paddingHorizontal:wp2(4),alignItems:'center'}}>
        <Text style={{fontWeight:'700',fontSize:rfv(22),color:'black'}}>Represent clo</Text>
        <TouchableOpacity style={styles.followButton}>
            <Text style={{fontWeight:'700',color:'white',fontSize:rfv(13)}}>FOLLOW</Text>
        </TouchableOpacity>
      </View>

          </ImageBackground>
      </View>
      
      <View style={{flexDirection:'row',marginLeft:wp2(4),marginBottom:hp2(2)}}>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>props.navigation.navigate('followerList',{list:'following'})}>
      <Text style={{fontWeight:'bold',color:'black'}}>2000 </Text>
      <Text style={{color:'black'}}>FOLLOWING </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>props.navigation.navigate('followerList',{list:'follower'})}>
      <Text style={{fontWeight:'bold',color:'black'}}>700 </Text>
      <Text style={{color:'black'}}>FOLLOWERS</Text>
      </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:hp2(12)}}>
        <Text style={{color:'black',fontWeight:'600',fontSize:rfv(18),marginLeft:wp2(3)}}>POPULAR</Text>
        <Popular no={'1.'} />
        <Popular no={'2.'} />
        <Popular no={'3.'} />
        <Popular no={'4.'} />
        <Popular no={'5.'} />

        <Lookbook />

        <TouchableOpacity  onPress={() => props.navigation.navigate('galleryScreen')} style={styles.gallery}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(24)}}>
          GALLERY
        </Text>
        </TouchableOpacity>

        <About />

      </ScrollView>

      <BottomComp />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  iconWrap:{
    flexDirection:'row',
    paddingHorizontal:wp2(4),
    justifyContent:'space-between',
    marginTop:hp2(1),
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
    height:hp2(32),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    overflow:'hidden',
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
