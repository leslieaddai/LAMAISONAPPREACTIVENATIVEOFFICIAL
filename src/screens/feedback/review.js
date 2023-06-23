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
import ReviewComp from '../../components/reviewComp';
import BottomComp from '../../components/bottomComp';
import LineComp from '../../components/lineComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetReviews} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function Review(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const [uniqDates, setUniqDates] = useState();
  pid = props?.route?.params?.data

  useEffect(() => {
    setLoading(true);

    axios
      .get(GetReviews+pid, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        console.log(res.data);
        setData(res.data.data);
        setUniqDates(
          res?.data?.data
            .filter(
              (v, i, a) =>
                a.findIndex(
                  v2 =>
                    moment(v2.created_at).format('MM/YY') ===
                    moment(v.created_at).format('MM/YY'),
                ) === i,
            )
            .map((item, index) => moment(item?.created_at).format('MM/YY')),
        );
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.supportText}>Review</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('addReview',{data:pid})}
            style={{position: 'absolute', right: wp2(4)}}>
            <ICONS.AntDesign name="pluscircle" size={30} color="#162FAC" />
          </TouchableOpacity>
        </View>
        <LineComp />
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
          {data?.length!==0? 
          uniqDates?.map((item,index)=>{
            return(
              <>
              <LineComp date={item} key={index} />
              {/* {data?.map((item2,index2) => {
            //console.log("item=======>",item);
            return <ReviewComp data={item} key={index} />;
          })} */}
          {data?.map((item2, index2) => {
                    if (moment(item2?.created_at).format('MM/YY') === item)
                      return (
                        <ReviewComp data={item2} key={index2} />
                      );
                  })}
              </>
            )
          })
          :<View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>Reviews Not Available</Text></View>}
        </>
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
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    //justifyContent: 'center',
    width: wp2(100),
  },
  supportText: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
    marginLeft: wp2(12),
  },
});
