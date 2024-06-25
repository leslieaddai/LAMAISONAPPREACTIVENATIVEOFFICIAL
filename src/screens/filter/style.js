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
import {StylesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function Style(props) {
  const {Style, Id} = useSelector(state => state.Style);
  const [selected, setSelected] = useState(Id);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    setLoading(true);

    axios
      .get(StylesUrl)
      .then(async function (res) {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  const options = text => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(text?.id);
          dispatch({
            type: types.Styleadd,
            payload: {style: text?.name, id: text?.id},
          });
          navigation.goBack();
        }}
        style={styles.optionWrap}>
        <Text style={{color: 'black'}}>{text?.name}</Text>
        <View
          style={[
            styles.circle,
            {backgroundColor: selected == text?.id ? COLORS.main : 'white'},
          ]}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        <NewHeaderComp
          arrowNavigation={() => props.navigation.navigate('filterScreen')}
          movePreviousArrow={true}
          title={'Filters - Style'}
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
          <>
            {data?.map((item, index) => {
              return <View key={index}>{options(item)}</View>;
            })}
          </>
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
