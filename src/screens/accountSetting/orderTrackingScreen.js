import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  SafeAreaView,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {COLORS, hp2} from '../../theme';

import LineComp from '../../components/lineComp';
import OrderComp from '../../components/orderComp';
import OrderComp2 from '../../components/orderComp2';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  CancelOrder,
  GetBrandOrders,
  GetOrdersByEditorAndGuest,
  OrderStatus,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function OrderTrackingScreen(props, {navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const guestUser = useSelector(state => state.guestData);

  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();

  const [uniqDates, setUniqDates] = useState([]);
  const [filterDates, setFilterDates] = useState([]);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    setData([]);
    user?.token !== null &&
      user?.userData?.role?.[0]?.id === 3 &&
      getOrdersByBrand('1');
    user?.token !== null &&
      user?.userData?.role?.[0]?.id === 2 &&
      getOrdersByEditor('1');
    user?.token === null && getOrdersByGuest('1');
  };

  const getOrdersByBrand = page_no => {
    setLoading(true);

    axios
      .get(GetBrandOrders + page_no, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setData(prev => [...prev, ...res?.data?.data]);
        (tempArr = res?.data?.data
          .filter(
            (v, i, a) =>
              a.findIndex(
                v2 =>
                  moment(v2?.created_at).format('MM/YY') ===
                  moment(v?.created_at).format('MM/YY'),
              ) === i,
          )
          .map((item, index) => moment(item?.created_at).format('MM/YY'))),
          !filterDates?.includes(tempArr[0]) &&
            setFilterDates(prev => [...prev, ...tempArr]);

        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };

  const getOrdersByEditor = page_no => {
    setLoading(true);

    axios
      .get(
        GetOrdersByEditorAndGuest +
          `editor/${user?.userData?.id}?page=${page_no}`,
      )
      .then(async function (res) {
        setData(prev => [...prev, ...res?.data?.data]);

        (tempArr = res?.data?.data
          .filter(
            (v, i, a) =>
              a.findIndex(
                v2 =>
                  moment(v2?.created_at).format('MM/YY') ===
                  moment(v?.created_at).format('MM/YY'),
              ) === i,
          )
          .map((item, index) => moment(item?.created_at).format('MM/YY'))),
          !filterDates?.includes(tempArr[0]) &&
            setFilterDates(prev => [...prev, ...tempArr]);

        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };

  const getOrdersByGuest = page_no => {
    setLoading(true);

    axios
      .get(GetBrandOrders + `guest/${guestUser?.device_id}?page=${page_no}`)
      .then(async function (res) {
        setData(prev => [...prev, ...res?.data?.data]);

        (tempArr = res?.data?.data
          .filter(
            (v, i, a) =>
              a.findIndex(
                v2 =>
                  moment(v2?.created_at).format('MM/YY') ===
                  moment(v?.created_at).format('MM/YY'),
              ) === i,
          )
          .map((item, index) => moment(item?.created_at).format('MM/YY'))),
          !filterDates?.includes(tempArr[0]) &&
            setFilterDates(prev => [...prev, ...tempArr]);

        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };

  const orderCancel = orderId => {
    setLoading(true);
    var data = new FormData();
    data.append('order_id', orderId);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: CancelOrder,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        setLoading(false);
        callApi();
      })
      .catch(function (error) {
        console.log(error.response);
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
            movePreviousArrow={true}
            arrowNavigation={() => props.navigation.goBack()}
            title={'Order tracking'}
          />
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

          {user?.token !== null && user?.userData?.role?.[0]?.id === 3 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: hp2(2)}}
              data={filterDates}
              onEndReached={() =>
                !loading &&
                page !== null &&
                getOrdersByBrand(String(pageNo + 1))
              }
              onEndReachedThreshold={0.1}
              renderItem={({item, index}) => {
                return (
                  <>
                    <LineComp date={item} key={index} />

                    {data?.map((item2, index2) => {
                      if (moment(item2?.created_at).format('MM/YY') === item) {
                        return (
                          <>
                            {item2?.order?.map((item3, index3) => {
                              return (
                                <OrderComp2
                                  data={item3}
                                  key={index3}
                                  onpress={() => {
                                    navigation.navigate('OrderDetails', {
                                      addressData: {
                                        add1: item3?.address1,
                                        add2: item3?.address2,
                                        country: item3?.country,
                                        city: item3?.city,
                                      },
                                      editorname: `${item3?.user?.first_name}${
                                        item3?.user?.last_name != null
                                          ? item3?.user?.last_name
                                          : ''
                                      }`,
                                      editoremail: item3?.user?.email,
                                      item: item3.vendor_order_details,
                                    });
                                  }}
                                />
                              );
                            })}
                          </>
                        );
                      }
                    })}
                  </>
                );
              }}
            />
          ) : user?.token !== null && user?.userData?.role?.[0]?.id === 2 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: hp2(2)}}
              data={filterDates}
              onEndReached={() =>
                !loading &&
                page !== null &&
                getOrdersByEditor(String(pageNo + 1))
              }
              onEndReachedThreshold={0.1}
              renderItem={({item, index}) => {
                return (
                  <>
                    <LineComp date={item} key={index} />
                    {data?.map((item2, index2) => {
                      if (moment(item2?.created_at).format('MM/YY') === item) {
                        return (
                          <Swipeable
                            key={index2}
                            renderRightActions={() => (
                              <TouchableOpacity
                                style={{
                                  backgroundColor: 'red',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: 100,
                                }}
                                onPress={() => {
                                  orderCancel(item2.id);
                                }}>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: rfv(14),
                                  }}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            )}>
                            <OrderComp
                              data={item2}
                              key={index2}
                              onpress={() => {
                                navigation.navigate('OrderDetails', {
                                  addressData: {
                                    add1: item2?.address1,
                                    add2: item2?.address2,
                                    country: item2?.country,
                                    city: item2?.city,
                                  },
                                  item: item2?.order_details,
                                });
                              }}
                            />
                          </Swipeable>
                        );
                      }
                    })}
                  </>
                );
              }}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: hp2(2)}}
              data={filterDates}
              onEndReached={() =>
                !loading &&
                page !== null &&
                getOrdersByGuest(String(pageNo + 1))
              }
              onEndReachedThreshold={0.1}
              renderItem={({item, index}) => {
                return (
                  <>
                    <LineComp date={item} key={index} />

                    {data?.map((item2, index2) => {
                      if (moment(item2?.created_at).format('MM/YY') === item) {
                        return (
                          <OrderComp
                            data={item2}
                            key={index2}
                            onpress={() => {
                              navigation.navigate('OrderDetails', {
                                addressData: {
                                  add1: item2?.address1,
                                  add2: item2?.address2,
                                  country: item2?.country,
                                  city: item2?.city,
                                },
                                item: item2?.order_details,
                              });
                            }}
                          />
                        );
                      }
                    })}
                  </>
                );
              }}
            />
          )}

          {!loading && data?.length === 0 && (
            <View style={{alignItems: 'center', flex: 1}}>
              <Text>Orders Not Available</Text>
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
  orderText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignSelf: 'center',
  },
});
