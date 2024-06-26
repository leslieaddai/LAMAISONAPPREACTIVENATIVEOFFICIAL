import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';
import {useNavigation} from '@react-navigation/native';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {SizesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function SizeClothing(props) {
  const {Size, Id} = useSelector(state => state.Size);
  const [selected, setSelected] = useState(Id);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    setLoading(true);

    axios
      .get(SizesUrl)
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
            type: types.Sizeadd,
            payload: {size: text?.size, id: text?.id},
          });
          navigation.goBack();
        }}
        style={styles.optionWrap}>
        <Text style={{color: 'black'}}>{text?.size}</Text>

        <View
          style={[
            styles.circle,
            {backgroundColor: selected == text.id ? COLORS.main : 'white'},
          ]}></View>
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
          title={'Filters - Size'}
        />
        {/* <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            
          }}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>SIZE</Text>
      </View> */}

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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.titleTxt}>APPAREL (U.K)</Text>

              {data?.map((item, index) => {
                return (
                  <View key={index}>
                    {item?.category_id === 2 && options(item)}
                  </View>
                );
              })}

              <Text style={styles.titleTxt2}>FOOTWEAR (U.K)</Text>

              {data?.map((item, index) => {
                return (
                  <View key={index}>
                    {item?.category_id === 1 && options(item)}
                  </View>
                );
              })}
            </ScrollView>
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
    borderColor: COLORS.gray
  },
  titleTxt: {
    marginVertical: hp2(1),
    color: 'black',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginLeft: wp2(6),
  },
  titleTxt2: {
    marginTop: hp2(2),
    marginBottom: hp2(1),
    color: 'black',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginLeft: wp2(6),
  },
});
