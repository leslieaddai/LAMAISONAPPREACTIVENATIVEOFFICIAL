import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {COLORS, hp2} from '../../theme';

import InventoryComp from '../../components/inventoryComp';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetBrandProductsById} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function Inventory(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    getApiData();

    props?.navigation.addListener('focus', () => {
      getApiData();
    });
  }, [props?.navigation]);

  const getApiData = () => {
    setLoading(true);
    axios
      .get(GetBrandProductsById + `/${user?.userData?.id}`)
      .then(async function (res) {
        setData(res.data.data.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <NewHeaderComp
            title={'Inventory'}
            movePreviousArrow={true}
            arrowNavigation={() => props.navigation.goBack()}
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
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginHorizontal: 20,
                marginVertical: 20,
                alignSelf: 'center',
              }}
              data={data}
              numColumns={2}
              renderItem={({item, index}) => {
                console.log(item);
                return <InventoryComp data={item} />;
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(19),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
