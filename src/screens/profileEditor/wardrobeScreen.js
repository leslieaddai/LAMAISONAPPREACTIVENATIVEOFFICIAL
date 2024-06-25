import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import WardrobeComp from '../../components/wardrobeComp';
import LoaderComp from '../../components/loaderComp';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetVirtualWardrobe} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function WardrobeScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState();
  const user = useSelector(state => state.userData);

  const [loadingComp, setLoadingComp] = useState(false);

  useEffect(() => {
    getWardrobe('1');
  }, []);

  const getWardrobe = page_no => {
    setLoading(true);

    axios
      .get(
        GetVirtualWardrobe +
          `${props?.route?.params?.user?.userData?.id}${
            user?.token !== ''
              ? '/' + user?.userData?.id + '?page=' + page_no
              : '?page=' + page_no
          }`,
      )
      .then(async function (res) {
        setData(prev => [...prev, ...res?.data?.data]);
        setPage(res?.data?.meta);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loadingComp && <LoaderComp />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <NewHeaderComp
            title={'Wardrobe'}
            arrowNavigation={() => props.navigation.goBack()}
            movePreviousArrow={true}
          />
          {/* <View style={styles.headWrap}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{position: 'absolute', left: wp2(4)}}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.wardrobeText}>WARDROBE</Text>
          </View> */}

          {loading && data?.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: hp2(6),
              }}>
              <SkypeIndicator color={'black'} />
            </View>
          )}
          {data.length !== 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: hp2(4),
                justifyContent: 'space-between',
              }}
              data={data}
              numColumns={2}
              onEndReached={() =>
                !loading &&
                page?.current_page < page?.last_page &&
                getWardrobe(String(page?.current_page + 1))
              }
              onEndReachedThreshold={0.1}
              renderItem={({item}) => {
                return (
                  <WardrobeComp
                    data={item}
                    state={{loadingComp, setLoadingComp}}
                  />
                );
              }}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>No product added yet</Text>
            </View>
          )}

          {loading && data?.length !== 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: hp2(3),
              }}>
              <SkypeIndicator size={26} color={'black'} />
            </View>
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
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',

    justifyContent: 'center',
  },
  wardrobeText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(26),
  },
});
