import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
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
import { useSelector } from 'react-redux';

export default function FilterScreen({navigation,route}) {
  const {Price} = useSelector(state=>state.Price)
  const {Colour} = useSelector(state=>state.Colour)
  const {Size} = useSelector(state=>state.Size)
  const {Style} = useSelector(state=>state.Style)
  const {Item} = useSelector(state=>state.Item)
  const {Continent} = useSelector(state=>state.Continent)
  console.log(route.params)
  const settingOptions = (name, navScreen) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(navScreen)} style={styles.filters}>
        <Text style={{color: 'black'}}>{name}</Text>
         <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <Text style={styles.heading}>FILTERS</Text>

      {settingOptions('PRICE', 'priceList')}
      {settingOptions('SIZE', 'sizeClothing')}
      {settingOptions('COLOUR', 'colourClothing')}
      {settingOptions('STYLE', 'style')}
      {settingOptions('ITEM', 'items')}
      {settingOptions('CONTINENTS', 'continents')}

      <TouchableOpacity style={styles.button}
      onPress={()=>{
        navigation.navigate('searchScreen',route.params)
      }}
      >
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(20)}}>
          APPLY FILTER(S)
        </Text>
      </TouchableOpacity>

      {/* <BottomComp /> */}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  heading: {
    color: 'black',
    fontSize: rfv(22),
    fontWeight: '700',
    marginVertical: hp2(4),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    //marginLeft: wp2(8),
    alignSelf: 'center',
  },
  filters: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(2),
  },
  button: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:hp2(4),

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
