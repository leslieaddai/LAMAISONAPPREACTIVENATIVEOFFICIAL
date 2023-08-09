import React from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,
  TextInput,

} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  ICONS,
  COLORS,

  wp2,
  hp2,

} from '../theme';
import {useNavigation} from '@react-navigation/native';

export default function QuantityComp(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('color', {key: props.key2, state: props.state})
        }
        style={[
          styles.colorBox,
          {
            backgroundColor:
              props.state.quantity[props.key2].color !== ''
                ? props.state.quantity[props.key2].color
                : COLORS.appBackground,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        {props.state.quantity[props.key2].color === '' && (
          <ICONS.Ionicons name="color-fill" size={24} color="black" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('sizes', {key: props.key2, state: props.state})
        }
        style={[
          styles.inputBox,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Text style={styles.sizeAvailableTxt}>
          {props.state.quantity[props.key2].size !== ''
            ? props.state.quantity[props.key2].size
            : 'Sizes Available'}
        </Text>
      </TouchableOpacity>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.inputTxt}
          placeholderTextColor={'grey'}
          placeholder="QUANTITY"
          keyboardType={'number-pad'}
          value={props.state.quantity[props.key2].quantity}
          onChangeText={val => {
            const newState = props.state.quantity.map((obj, index) => {
         
              if (index === props.key2) {
                return {...obj, quantity: val};
              }
         
              return obj;
            });
            props.state.setQuantity(newState);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp2(94),
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: hp2(1),
  },
  colorBox: {
    width: wp2(8),
    height: wp2(8),
   
    borderRadius: wp2(2),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputBox: {
    width: wp2(36),
    height: hp2(5),
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
  },
  sizeAvailableTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(11),
    textTransform: 'uppercase',
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
