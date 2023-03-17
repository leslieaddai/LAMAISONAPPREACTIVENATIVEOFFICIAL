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

export default function Category(props) {
  const [select, setSelect] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        select ? setSelect(false) : setSelect(true);
      }}
      style={[styles.button, {backgroundColor: select ? 'black' : 'white'}]}>
      <Text
        style={{
          color: select ? 'white' : 'black',
          fontWeight: '700',
          textTransform: 'uppercase',
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: wp2(30),
    height: hp2(5),
    backgroundColor: 'black',
    borderRadius: wp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:wp2(1),
    marginVertical:hp2(1),

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
