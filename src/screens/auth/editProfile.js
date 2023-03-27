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

export default function EditProfile(props) {
  const settingOptions = (name, navScreen) => {
    return (
      <View style={styles.filters}>
        <Text style={{color: 'black'}}>{name}</Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate(navScreen)}>
          {name == 'DISPLAY PHOTO' ? (
            <View style={styles.imageWrap}>
              <Image
                source={IMAGES.randomProfile}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
          ) : name == 'ABOUT' ? (
            <ICONS.MaterialIcons name="edit" size={24} color="black" />
          ) : (
            <Text style={{color: 'black'}}>XXXXXXXXXX</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>EDIT PROFILE</Text>
      </View>

      {settingOptions('DISPLAY PHOTO', 'brandProfileScreen')}
      {props.route.params.user == 'brand' && (
        <>
        {settingOptions('ABOUT', 'about')}
        </>
      )}
      {settingOptions('USERNAME', 'username')}
      {settingOptions('EMAIL', 'email')}
      {settingOptions('PHONE', 'phone')}
      {settingOptions('PASSWORD', 'passwordChange')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginVertical: hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
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
});
