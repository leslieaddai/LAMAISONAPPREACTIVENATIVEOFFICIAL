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

export default function HomeScreen(props) {

    const brandComp = (nav) => {
        return(
           <>
           {nav?(
             <TouchableOpacity onPress={()=>props.navigation.navigate('brandProfileScreen')} style={styles.brandImage}>
             <Image
               source={IMAGES.randomPic}
               style={{width: '100%', height: '100%'}}
               resizeMode="cover"
             />
           </TouchableOpacity>
           ):(
             <View style={styles.brandImage}>
             <Image
               source={IMAGES.randomPic}
               style={{width: '100%', height: '100%'}}
               resizeMode="cover"
             />
           </View>
           )}
           </>
        )
    }

  const postComp = () => {
    return (
      <View>
        <View style={styles.headWrap}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('editorProfileScreen')} style={styles.imageWrap}>
            <Image
              source={IMAGES.randomProfile}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ICONS.FontAwesome
            name="retweet"
            size={24}
            color={'black'}
            style={{marginHorizontal: wp2(4)}}
          />
          <Text style={{color: 'black'}}>ICEY.B Shared</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  const productComp = () => {
    return(
        <View>
        
          <TouchableOpacity onPress={()=>props.navigation.navigate('brandProfileScreen')} style={[styles.imageWrap,{marginLeft:wp2(3),marginTop:hp2(1)}]}>
            <Image
              source={IMAGES.randomProfile}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>

    
        <View style={styles.productContainer}>
          <View style={styles.productImageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
          </View>
          <View style={styles.productImageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
          </View>
          <View style={styles.productImageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
          </View>
          <View style={styles.productImageContainer}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
          </View>
          
        </View>

      </View>
    )
  }

  const productComp2 = () => {
    return(
        <View>
        
          <TouchableOpacity onPress={()=>props.navigation.navigate('brandProfileScreen')} style={[styles.imageWrap,{marginLeft:wp2(3),marginTop:hp2(1)}]}>
            <Image
              source={IMAGES.randomProfile}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>

    
        <View style={{flexDirection:'row',width:wp2(100),justifyContent:'space-between'}}>
          <View style={styles.productImageContainer2}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
          </View>
          <View style={styles.productImageContainer2}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
          </View>
          
        </View>

      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image
          source={IMAGES.logo}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('homeScreen')} style={styles.iconWrap}>
          <Image
            source={IMAGES.gridView}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={() => props.navigation.navigate('listViewScreen')} style={styles.iconWrap}>
          <Image
            source={IMAGES.listView}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp2(12)}}>
        {postComp()}

        <Text style={styles.text}>Popular Brands</Text>
        <ScrollView horizontal >
        
        {brandComp(true)}
        {brandComp(true)}
        {brandComp(true)}
        {brandComp(true)}
        {brandComp(true)}

        </ScrollView>

        {productComp()}

        <Text style={styles.text}>Popular Pieces</Text>
        <ScrollView horizontal >
        
        {brandComp(false)}
        {brandComp(false)}
        {brandComp(false)}
        {brandComp(false)}
        {brandComp(false)}

        </ScrollView>

        {productComp2()}

        <Text style={styles.text}>Popular Colour</Text>
        <ScrollView horizontal >
        
        {brandComp(false)}
        {brandComp(false)}
        {brandComp(false)}
        {brandComp(false)}
        {brandComp(false)}

        </ScrollView>

        {productComp2()}

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
  logoWrap: {
    marginTop: hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp2(100),
    height: hp2(8),
    overflow: 'hidden',
  },
  iconContainer: {
    width: wp2(40),
    height: hp2(8),
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconWrap: {
    width: wp2(12),
    height: hp2(8),
    overflow: 'hidden',
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  headWrap: {
    width: wp2(94),
    height: hp2(7),
    //backgroundColor:'red',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp2(1),
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
    height: hp2(30),
    overflow: 'hidden',
    //backgroundColor:'yellow',
    marginTop: hp2(1),
  },
  text:{fontWeight:'600',fontSize:rfv(18),color:'black',marginTop:hp2(2),marginLeft:wp2(4),marginBottom:hp2(1),},
  brandImage:{
    width:wp2(34),
    height:hp2(16),
    overflow:'hidden',
    marginHorizontal:wp2(1),
  },
  productContainer:{
    width:wp2(100),
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  productImageContainer:{
    width: wp2(47),
    height: hp2(18),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop:hp2(1),
  },
  productImageContainer2:{
    width: wp2(48),
    height: hp2(32),
    overflow: 'hidden',
    //marginHorizontal: wp2(1),
    marginTop:hp2(1),
  },
});
