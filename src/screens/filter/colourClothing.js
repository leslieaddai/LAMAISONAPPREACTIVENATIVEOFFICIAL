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
import { useNavigation } from '@react-navigation/native';

export default function ColourClothing(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>COLOUR</Text>
      </View>
      <View style={styles.colorsWrap}>
      <TouchableOpacity style={[styles.color,{backgroundColor:'black'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'white'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#A1A1A1'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#F61616'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#008000E8'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#0000FF'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#5C4033'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#FF69B4'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#FAFA33'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#FFA500'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#800080'}]}></TouchableOpacity>
      <TouchableOpacity style={[styles.color,{backgroundColor:'#F5F5DC'}]}></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  colorsWrap:{
    width:wp2(96),
    flexDirection:'row',
    flexWrap:'wrap',
    alignSelf:'center',
  },
  color:{
    width:wp2(30),
    height:hp2(15),
    backgroundColor:'red',
    borderRadius:wp2(2),
    marginVertical:hp2(1),
    marginHorizontal:wp2(1),

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
