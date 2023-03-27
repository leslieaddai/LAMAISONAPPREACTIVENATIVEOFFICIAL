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

export default function PasswordChange(props) {
    const textBox = (placeText) => {
        return(
            <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder={placeText}
            />
          </View>
        )
    }
  return (
    <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>PASSWORD</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(4)}}>
     {textBox('ENTER CURRENT PASSWORD')}
     {textBox('ENTER NEW PASSWORD')}
     {textBox('RE-ENTER NEW PASSWORD')}
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttonText}>RESET PASSWORD</Text>
        </TouchableOpacity>

        <View style={{alignSelf: 'center', marginTop: hp2(10)}}>
          <Text style={styles.text}>Must be at least 8 characters</Text>
          <Text style={styles.text}>
            Must include at least 1 Numerical character
          </Text>
          <Text style={styles.text}>
            Must include at least 1 special character ( Examples !”£$)
          </Text>
        </View>
      </ScrollView>
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
    marginTop: hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
  },
  inputBox: {
    width: wp2(80),
    height: hp2(6),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(1),
    alignSelf:'center',
  },
  button: {
    width: wp2(62),
    height: hp2(6),
    backgroundColor: 'black',
    borderRadius: wp2(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: hp2(3),
    alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
  text: {color: 'black', fontWeight: '800', fontSize: rfv(11)},
});
