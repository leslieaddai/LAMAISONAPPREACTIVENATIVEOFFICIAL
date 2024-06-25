import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../theme';
import {useNavigation} from '@react-navigation/native';
import NewInputComp from './NewInputComp';

const ProductInfOptions = ({text, onPressRoute, selectedBackgroundColor}) => {
  return (
    <TouchableOpacity
      onPress={onPressRoute}
      style={{
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp2(2),
        paddingHorizontal: 20,
        marginBottom: hp2(1.5),
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Text style={{fontSize: 16}}>{text}</Text>
        <View
          style={{
            backgroundColor: selectedBackgroundColor,
            height: 20,
            width: 20,
            borderRadius: 10,
          }}
        />
      </View>
      <ICONS.AntDesign name="right" size={15} color="black" />
    </TouchableOpacity>
  );
};

export default function QuantityComp(props) {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'column', gap: 20}}>
      <ProductInfOptions
        text={
          props.state.quantity[props.key2].color !== '' ? 'Color: ' : 'Color'
        }
        onPressRoute={() =>
          navigation.navigate('color', {key: props.key2, state: props.state})
        }
        selectedBackgroundColor={props.state.quantity[props.key2].color}
      />
      {/* <TouchableOpacity
        onPress={() =>
          navigation.navigate('color', {key: props.key2, state: props.state})
        }
        style={[
          {
            backgroundColor:
              props.state.quantity[props.key2].color !== ''
                ? props.state.quantity[props.key2].color
                : COLORS.appBackground,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
            flexDirection: 'row',
            borderRadius: 10,
            height: 50,
            marginHorizontal: 20,
            paddingHorizontal: 20,
          },
        ]}>
        {props.state.quantity[props.key2].color === '' && (
          <ICONS.Ionicons name="color-fill" size={24} color="black" />
        )}
      </TouchableOpacity> */}
      <View style={{marginTop: -25, marginBottom: -45}}>
        <ProductInfOptions
          text={
            props.state.quantity[props.key2].size !== ''
              ? props.state.quantity[props.key2].size
              : 'Sizes Available'
          }
          onPressRoute={() =>
            navigation.navigate('sizes', {key: props.key2, state: props.state})
          }
        />
      </View>
      {/* <TouchableOpacity
        onPress={() =>
          navigation.navigate('sizes', {key: props.key2, state: props.state})
        }
        style={[
          {
            borderWidth: 1,
            borderColor: '#ccc',
            flexDirection: 'row',
            borderRadius: 10,
            height: 50,
            marginHorizontal: 20,
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          },
        ]}>
        <Text style={{fontSize: 16, color: COLORS.gray500}}>
          {props.state.quantity[props.key2].size !== ''
            ? props.state.quantity[props.key2].size
            : 'Sizes Available'}
        </Text>
      </TouchableOpacity> */}
      <NewInputComp
        inputText={'Quantity'}
        handleOnChange={val => {
          const newState = props.state.quantity.map((obj, index) => {
            if (index === props.key2) {
              return {...obj, quantity: val};
            }

            return obj;
          });
          props.state.setQuantity(newState);
        }}
        value={props.state.quantity[props.key2].quantity}
      />
      {/* <View
        style={[
          {
            borderWidth: 1,
            borderColor: '#ccc',
            flexDirection: 'row',
            borderRadius: 10,
            height: 50,
            marginHorizontal: 20,
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          },
        ]}>
        <TextInput
          style={{fontSize: 16, color: COLORS.gray500}}
          placeholderTextColor={'grey'}
          placeholder="Quantity"
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
      </View> */}
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
