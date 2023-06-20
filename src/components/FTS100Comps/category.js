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
  //const [select, setSelect] = useState(false);
  //console.log(props.data)

  return (
    <TouchableOpacity
      onPress={() => {
        //props?.state?.setSelected(props?.data?.item?.name)
        //props?.state?.setSelected(prev => (prev===props?.data?.item?.name?'':props?.data?.item?.name));
        //props?.state?.selected === props?.data?.item?.name ? props?.state?.setSelected('') : props?.state?.setSelected(props?.data?.item?.name)
        //props?.state?.selected === props?.data?.item?.name && props?.state?.setSelected('')
        props?.state?.onSelectStyle(
          props?.data?.item?.id,
          props?.data?.item?.name,
        );
      }}
      style={[
        styles.button,
        {
          backgroundColor:
            props?.state?.selected == props?.data?.item?.name
              ? 'black'
              : 'white',
        },
      ]}>
      <Text
        style={{
          color:
            props?.state?.selected == props?.data?.item?.name
              ? 'white'
              : 'black',
          fontWeight: '700',
          textTransform: 'uppercase',
        }}>
        {props?.data?.item?.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: wp2(30),
    height: hp2(5),
    paddingHorizontal:wp2(2),
    //backgroundColor: 'black',
    borderRadius: wp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp2(1),
    marginVertical: hp2(1),

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
