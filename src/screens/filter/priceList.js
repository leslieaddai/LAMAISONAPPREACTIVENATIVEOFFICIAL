import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import NewInputComp from '../../components/NewInputComp';
import {TextInput} from 'react-native-gesture-handler';
import ContinueButton from '../auth/componnets/ContinueBtn';

export default function PriceList(props) {
  const {Price} = useSelector(state => state.Price);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(Price);
  const [customValue, setCustomValue] = useState('');
  const navigation = useNavigation();

  const options = text => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(text);
          dispatch({
            type: types.Priceadd,
            payload: text,
          });
        }}
        style={styles.optionWrap}>
        <Text style={{color: 'black'}}>
          {text === '301' ? text + '+' : '£' + text}
        </Text>
        <View
          style={[
            styles.circle,
            {backgroundColor: selected == text ? COLORS.main : 'white'},
          ]}
        />
      </TouchableOpacity>
    );
  };

  const displayValue =
    typeof customValue === 'string' ? customValue : JSON.stringify(customValue);
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        <NewHeaderComp
          arrowNavigation={() => props.navigation.navigate('filterScreen')}
          movePreviousArrow={true}
          title={'Filters - Price'}
        />
        <NewInputComp
          inputText={'Price point'}
          value={customValue}
          handleOnChange={text => setCustomValue(text)}
        />
        {customValue <= 0 ? '' : options(displayValue.toString())}
        {options('0-50')}
        {options('51-100')}
        {options('101-200')}
        {options('201-300')}
        {options('301')}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <ContinueButton
            text={'Save'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        {/* <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          placeholder="Введіть текст"
        />
        <Text style={styles.text}>Введене значення: {displayValue}</Text> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',

    justifyContent: 'center',
    width: wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(26),
  },
  optionWrap: {
    width: wp2(90),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.gray100,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  circle: {
    width: wp2(5),
    height: wp2(5),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
});
