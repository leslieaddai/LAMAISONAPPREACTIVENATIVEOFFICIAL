import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../../theme/fonts';
import {
  IMAGES,
  ICONS,
  COLORS,
  SIZES,
  screenHeight,
  screenWidth,
  wp2,
  hp2,
  getFont,
  FONTS,
} from '../../theme';
import BottomComp from '../../components/bottomComp';
import LineComp from '../../components/lineComp';
import OrderComp from '../../components/orderComp';
import OrderComp2 from '../../components/orderComp2';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetBrandOrders,GetOrdersByEditorAndGuest,OrderStatus} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import moment from 'moment';

export default function OrderTrackingScreen(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const user = useSelector(state => state.userData);
  const guestUser = useSelector(state => state.guestData);

  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();

  const [uniqDates, setUniqDates] = useState([]);
  const [filterDates, setFilterDates] = useState([]);

  useEffect(() => {
    user?.token!==null && user?.userData?.role?.[0]?.id === 3 && getOrderStatus();
    user?.token!==null && user?.userData?.role?.[0]?.id === 2 && getOrdersByEditor('1');
    user?.token===null && getOrdersByGuest('1');
  }, []);

  const getOrderStatus = () => {
    setLoading(true);

    axios
      .get(OrderStatus,{
        headers:{Authorization:`Bearer ${user?.token}`}
      })
      .then(async function (res) {
        console.log(res?.data);
        setOrderStatus(res?.data?.data)
        getOrdersByBrand('1')
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  }

  const getOrdersByBrand = page_no => {
    setLoading(true);

    axios
      .get(GetBrandOrders + page_no , {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        console.log(res?.data);
        setData(prev => [...prev, ...res?.data?.data]);

        // setUniqDates(prev => [...prev,
        //   ...res?.data?.data
        //     .filter(
        //       (v, i, a) =>
        //         a.findIndex(
        //           v2 =>
        //             moment(v2?.created_at).format('MM/YY') ===
        //             moment(v?.created_at).format('MM/YY'),
        //         ) === i,
        //     )
        //     .map((item, index) => moment(item?.created_at).format('MM/YY')),
        //   ]);

        tempArr = res?.data?.data
            .filter(
              (v, i, a) =>
                a.findIndex(
                  v2 =>
                    moment(v2?.created_at).format('MM/YY') ===
                    moment(v?.created_at).format('MM/YY'),
                ) === i,
            )
            .map((item, index) => moment(item?.created_at).format('MM/YY')),

          //console.log(filterDates?.includes(tempArr[0]))
          !filterDates?.includes(tempArr[0]) && setFilterDates(prev => [...prev,...tempArr])

          //setFilterDates([...new Set(uniqDates)])
          //uniq = [...new Set(uniqDates)];
          //setFilterDates(uniq);
          console.log(filterDates);

        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  const getOrdersByEditor = page_no => {
    setLoading(true);

    axios
      .get(GetOrdersByEditorAndGuest + `editor/${user?.userData?.id}?page=${page_no}`)
      .then(async function (res) {
        console.log(res?.data);
        setData(prev => [...prev, ...res?.data?.data]);
        
        tempArr = res?.data?.data
        .filter(
          (v, i, a) =>
            a.findIndex(
              v2 =>
                moment(v2?.created_at).format('MM/YY') ===
                moment(v?.created_at).format('MM/YY'),
            ) === i,
        )
        .map((item, index) => moment(item?.created_at).format('MM/YY')),

      !filterDates?.includes(tempArr[0]) && setFilterDates(prev => [...prev,...tempArr])
      console.log(filterDates);

        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  const getOrdersByGuest = page_no => {
    setLoading(true);

    axios
      .get(GetBrandOrders + `guest/${guestUser?.device_id}?page=${page_no}`)
      .then(async function (res) {
        console.log(res?.data);
        setData(prev => [...prev, ...res?.data?.data]);

        tempArr = res?.data?.data
        .filter(
          (v, i, a) =>
            a.findIndex(
              v2 =>
                moment(v2?.created_at).format('MM/YY') ===
                moment(v?.created_at).format('MM/YY'),
            ) === i,
        )
        .map((item, index) => moment(item?.created_at).format('MM/YY')),
        
      !filterDates?.includes(tempArr[0]) && setFilterDates(prev => [...prev,...tempArr])
      console.log(filterDates);

        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.orderText}>Order Tracking</Text>

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

       {user?.token!== null && user?.userData?.role?.[0]?.id===3 ? (

          <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: hp2(2)}}
          data={filterDates}
          onEndReached={() =>
            !loading && page !== null && getOrdersByBrand(String(pageNo + 1))
          }
          onEndReachedThreshold={0.1}
          renderItem={({item,index}) => {
           return(
             <>
             <LineComp date={item} key={index} />
 
             {data?.map((item2,index2)=>{
               if(moment(item2?.created_at).format('MM/YY') === item){
                 return(
                  <>
                  {item2?.order.map((item3,index3)=>{
                    return(
                      <OrderComp2 orderStatus={orderStatus} data={item3} key={index3} onpress={()=>{props.navigation.navigate('OrderDetails',{item:item3.vendor_order_details,orderStatus:orderStatus})}}/>
                    )
                  })}
                  </>
                 )
               }
             })}
             </>
           )
          }}
        />

       ) : user?.token!== null && user?.userData?.role?.[0]?.id===2 ? (
      
         <FlatList
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{paddingVertical: hp2(2)}}
         data={filterDates}
         onEndReached={() =>
           !loading && page !== null && getOrdersByEditor(String(pageNo + 1))
         }
         onEndReachedThreshold={0.1}
         renderItem={({item,index}) => {
           return (
             <>
             <LineComp date={item} key={index} />

             {data?.map((item2,index2)=>{
              if(moment(item2?.created_at).format('MM/YY') === item){
                return(
                  <OrderComp data={item2} key={index2} />      
                )
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
            !loading && page !== null && getOrdersByGuest(String(pageNo + 1))
          }
          onEndReachedThreshold={0.1}
          renderItem={({item,index}) => {
            return (
              <>
              <LineComp date={item} key={index} />
  
              {data?.map((item2,index2)=>{
                if(moment(item2?.created_at).format('MM/YY') === item){
                  return(
                    <OrderComp data={item2} key={index2} />      
                  )
                }
               })}
              </>
            );
          }}
        />
       
       )}

{!loading && data?.length === 0 && (
          <View style={{alignItems:'center',flex:1}}><Text>Orders Not Available</Text></View>
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
        
        {/* <BottomComp /> */}
      </View>
    </SafeAreaView>
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
