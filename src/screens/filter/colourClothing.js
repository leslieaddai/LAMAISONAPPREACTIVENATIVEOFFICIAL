import React, {useState, useEffect} from 'react';
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

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {ColorsUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function ColourClothing(props) {
  const {Colour, Id} = useSelector(state => state.Colour);
  const [selected, setSelected] = useState(Id);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    setLoading(true);

    axios
      .get(ColorsUrl)
      .then(async function (res) {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  const color = col => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(col?.id);
          dispatch({
            type: types.Colouradd,
            payload: {colour: col?.color_name, id: col?.id},
          });
          navigation.goBack();
        }}
        style={[styles.color, {backgroundColor: col?.color_code}]}>
        {selected === col?.id && (
          <ICONS.AntDesign
            name="checkcircle"
            size={20}
            color="#0F2ABA"
            style={{
              position: 'absolute',
              right: wp2(2),
              top: hp2(0.5),
              zIndex: 999,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        {/* <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
           
          }}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>COLOUR</Text>
      </View> */}
        <NewHeaderComp
          arrowNavigation={() => props.navigation.navigate('filterScreen')}
          movePreviousArrow={true}
          title={'Filters - Colours'}
        />

        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: hp2(6),
            }}>
            <SkypeIndicator color={'black'} />
          </View>
        ) : (
          <View style={styles.colorsWrap}>
            {data?.map((item, index) => {
              return <View key={index}>{color(item)}</View>;
            })}
          </View>
        )}
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
    fontSize: rfv(24),
  },
  colorsWrap: {
    width: wp2(97),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  color: {
    width: wp2(30),
    height: hp2(15),
    backgroundColor: 'red',
    borderRadius: wp2(2),
    marginVertical: hp2(1),
    marginHorizontal: wp2(1),
  },
});
