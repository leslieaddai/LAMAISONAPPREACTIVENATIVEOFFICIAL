import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  Platform,
  SafeAreaView
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
import BrandComp from '../../components/editorProfileComps/brands';
import Wardrobe from '../../components/editorProfileComps/wardrobe';
import NextPickup from '../../components/editorProfileComps/nextPickup';

export default function EditorProfileScreen(props) {
    const [follow,setFollow]=useState(true);
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.editorProfile}>
      <ImageBackground
            source={IMAGES.randomProfile}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          >
             <TouchableOpacity onPress={()=>props.navigation.navigate('settingsScreen',{user:'editor'})} style={styles.iconWrap}>
        <ICONS.Ionicons name="menu-outline" size={44} color="black" />
        <View style={styles.notificationBadge}>
            <Text style={{color:'white',fontSize:rfv(10)}}>1</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.nameContainer}>
        <Text style={{color:'black',fontWeight:'700',fontSize:rfv(22)}}>ICEY.B</Text>
        <TouchableOpacity onPress={()=>{follow?setFollow(false):setFollow(true)}} style={[styles.followButton,{backgroundColor:follow?'white':'black'}]}>
            <Text style={{fontWeight:'700',color:follow?'black':'white',fontSize:rfv(13)}}>{follow?'FOLLOWING':'FOLLOW'}</Text>
        </TouchableOpacity>
      </View>
          </ImageBackground>
      </View>

      <View style={{flexDirection:'row',marginLeft:wp2(4),marginVertical:hp2(1)}}>
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

      <Text style={{fontWeight:'600',fontSize:rfv(18),color:'black',marginVertical:hp2(2),marginLeft:wp2(2)}}>FAVOURITE BRANDS</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <BrandComp/>
      <BrandComp/>
      <BrandComp/>
      <BrandComp/>
      <BrandComp/>
      <BrandComp/>
      <BrandComp/>
      <BrandComp/>
      </ScrollView>

      <Wardrobe/>
      <NextPickup/>

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
  editorProfile:{
    width:wp2(100),
    height:hp(32),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    borderBottomLeftRadius:wp2(4),
    borderBottomRightRadius:wp2(4),
    overflow:'hidden',
  },
  iconWrap:{
    alignSelf:'flex-end',
    //backgroundColor:'white',
    marginRight:wp2(2),
    marginTop:hp2(1),
  },
  notificationBadge:{
    width:wp2(5),
    height:wp2(5),
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0F2ABA',
    position:'absolute',
    right:wp2(1),
  },
  nameContainer:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:wp2(2),marginTop:hp(18),},
  followButton:{
    width:wp2(34),
    height:hp2(5),
    borderRadius:wp2(8),
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#162FAC',

    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
