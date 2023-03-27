import React, {useState, useEffect} from 'react';
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

export default function FilterScreen(props) {
  const settingOptions = (name, navScreen) => {
    return (
      <View style={styles.filters}>
        <Text style={{color: 'black'}}>{name}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate(navScreen)}>
          <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FILTERS</Text>

      {settingOptions('PRICE', 'priceList')}
      {settingOptions('SIZE', 'sizeClothing')}
      {settingOptions('COLOUR', 'colourClothing')}
      {settingOptions('STYLE', 'style')}
      {settingOptions('ITEM', 'items')}
      {settingOptions('CONTINENTS', 'continents')}

      <TouchableOpacity style={styles.button}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(24)}}>
          APPLY FILTER(S)
        </Text>
      </TouchableOpacity>

      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginVertical: hp2(4),
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
