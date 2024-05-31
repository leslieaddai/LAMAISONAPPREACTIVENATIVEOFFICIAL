import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function FilterScreen({navigation, route}) {
  const {Price} = useSelector(state => state.Price);
  const {Colour} = useSelector(state => state.Colour);
  const {Size} = useSelector(state => state.Size);
  const {Style} = useSelector(state => state.Style);
  const {Item} = useSelector(state => state.Item);
  const {Continent} = useSelector(state => state.Continent);

  const dispatch = useDispatch();

  const settingOptions = (name, navScreen, text) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navScreen)}
        style={styles.filters}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={{color: 'black'}}>{name}</Text>
          <Text style={styles.selectedTxt}>{text}</Text>
        </View>
        <ICONS.AntDesign name="right" size={12} color="black" />
      </TouchableOpacity>
    );
  };
  const resetFilters = () => {
    dispatch({
      type: types.Priceadd,
      payload: '',
    });

    dispatch({
      type: types.Sizeadd,
      payload: {size: '', id: ''},
    });

    dispatch({
      type: types.Colouradd,
      payload: {colour: '', id: ''},
    });

    dispatch({
      type: types.Styleadd,
      payload: {style: '', id: ''},
    });

    dispatch({
      type: types.Itemadd,
      payload: {item: '', id: ''},
    });

    dispatch({
      type: types.Continetadd,
      payload: {continent: '', id: ''},
    });
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.appBackground}}>
        <NewHeaderComp
          arrowNavigation={() => navigation.navigate('searchScreen')}
          movePreviousArrow={true}
          title={'Filters'}
        />
        <View style={styles.container}>
          <View style={{flexDirection: 'column', gap: 10, marginTop: 20}}>
            {settingOptions('Price:', 'priceList', Price)}
            {settingOptions('Size:', 'sizeClothing', Size)}
            {settingOptions('Colour:', 'colourClothing', Colour)}
            {settingOptions('Style:', 'style', Style)}
            {settingOptions('Item:', 'items', Item)}
            {settingOptions('Continents:', 'continents', Continent)}
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('searchScreen', route.params);
              }}>
              <Text style={styles.btnTxt}>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resetFilters}
              style={{alignSelf: 'center', marginTop: hp2(2)}}>
              <Text style={styles.resetText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  filters: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(2),
    backgroundColor: COLORS.gray100,
    padding: 20,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp2(4),
  },
  resetText: {
    color: 'black',
    fontSize: rfv(16),
    fontWeight: '400',
  },
  selectedTxt: {color: 'black'},
  btnTxt: {color: 'white', fontWeight: '700', fontSize: rfv(16)},
});
