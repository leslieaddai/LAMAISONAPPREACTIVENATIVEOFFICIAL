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

export default function ListViewScreen(props) {

  const postComp = () => {
    const [showDelete,setShowDelete]=useState(false);

    const [heart,setHeart]=useState(false);
    const [share,setShare]=useState(false);
    const [hanger,setHanger]=useState(false);
    return (
      <View style={{marginVertical:hp2(1)}}>
        <View style={styles.postWrap}>
          <TouchableOpacity   onPress={() => props.navigation.navigate('brandProfileScreen')} style={styles.imageWrap}>
            <Image
              source={IMAGES.randomProfile}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{showDelete?setShowDelete(false):setShowDelete(true)}}>
          {showDelete?(
            <View style={styles.deleteButton}>
                <Text style={{color:'black'}}>Delete Post</Text>
                <ICONS.Ionicons name="ios-trash-bin" size={24} color="red" />
            </View>
          ):(
            <ICONS.Ionicons name="menu-outline" size={44} color="black" style={{marginLeft:wp2(68)}} />
          )}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={()=>props.navigation.navigate('imageViewScreen')} style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.iconWrap}>
        <TouchableOpacity onPress={()=>{heart?setHeart(false):setHeart(true)}} >
        <ICONS.AntDesign name="heart" size={34} color={heart?'#FC0004':'black'} />
        </TouchableOpacity>
        <Text style={{color:'black'}}>1000</Text>

        <TouchableOpacity onPress={()=>{hanger?setHanger(false):setHanger(true)}}>
        <ICONS.MaterialCommunityIcons name="hanger" size={34} color={hanger?'#162FAC':'black'} />
        </TouchableOpacity>
        <Text style={{color:'black'}}>1500</Text>

        <TouchableOpacity onPress={()=>{share?setShare(false):setShare(true)}}>
        <ICONS.FontAwesome name="retweet" size={34} color={share?'#13D755':'black'} />
        </TouchableOpacity>
        <Text style={{color:'black'}}>3000</Text>
        </View>

        <View style={{flexDirection:'row',marginLeft:wp2(2)}}>
        <Text style={{color:'black',fontWeight:'700',marginRight:wp2(2)}}>Represent</Text>
        <Text style={{color:'black'}}>Blue is the colour</Text>
        </View>

        <Text style={{color:'black',marginLeft:wp2(2)}}>1 hour ago</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>

<View style={styles.iconContainer}>
  <TouchableOpacity onPress={() => props.navigation.navigate('homeScreen')} style={styles.iconWrap2}>
    <Image
      source={IMAGES.gridView}
      style={{width: '100%', height: '100%'}}
      resizeMode="contain"
    />
  </TouchableOpacity>
  <View style={styles.line}></View>
  <TouchableOpacity onPress={() => props.navigation.navigate('listViewScreen')} style={styles.iconWrap2}>
    <Image
      source={IMAGES.listView}
      style={{width: '100%', height: '100%'}}
      resizeMode="contain"
    />
  </TouchableOpacity>
</View>

<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{paddingBottom: hp2(12),paddingTop:hp2(1)}}>
  {postComp()}
  {postComp()}
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
  iconContainer: {
    width: wp2(44),
    height: hp2(8),
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
  },
  iconWrap2: {
    width: wp2(12),
    height: hp2(8),
    overflow: 'hidden',
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  postWrap: {
    width: wp2(94),
    height: hp2(7),
    //backgroundColor:'red',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: hp2(1),
  },
  imageWrap: {
    width: wp2(14),
    height: wp2(14),
    borderRadius: wp2(5),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: wp2(100),
    height: hp2(36),
    overflow: 'hidden',
    //backgroundColor:'yellow',
  },
  iconWrap:{
    width:wp2(80),
    height:hp2(6),
    //backgroundColor:'red',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    alignSelf:'center',
  },
  deleteButton:{
    width:wp2(38),
    height:hp2(6),
    backgroundColor:'#D9D9D9',
    borderRadius:wp2(6),
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'row',
    marginLeft:wp2(44),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
