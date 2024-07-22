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
import ReviewComp from '../../components/reviewComp';

import LineComp from '../../components/lineComp';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetReviews} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import moment from 'moment';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import ContinueButton from '../auth/componnets/ContinueBtn';

export default function Review(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const [uniqDates, setUniqDates] = useState();
  pid = props?.route?.params?.data;

  useEffect(() => {
    setLoading(true);

    axios
      .get(GetReviews + pid, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
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
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <NewHeaderComp
            title={'Review'}
            movePreviousArrow={true}
            arrowNavigation={() => props.navigation.goBack()}
            // settingNavigation={() =>
            //   props.navigation.navigate('addReview', {data: pid})
            // }
          />
          {/* <View style={styles.headWrap}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{position: 'absolute', left: wp2(4)}}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.supportText}>Review</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('addReview', {data: pid})
              }
              style={{position: 'absolute', right: wp2(4)}}>
              <ICONS.AntDesign name="pluscircle" size={30} color="#162FAC" />
            </TouchableOpacity>
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
              {data?.length !== 0 ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {uniqDates?.map((item, index) => {
                    return (
                      <>
                        <LineComp date={item} key={index} />

                        {data?.map((item2, index2) => {
                          if (
                            moment(item2?.created_at).format('MM/YY') === item
                          )
                            return <ReviewComp data={item2} key={index2} />;
                        })}
                      </>
                    );
                  })}
                  <ContinueButton
                    onPress={() =>
                      props.navigation.navigate('addReview', {data: pid})
                    }
                    text={'Add Review'}
                  />
                </ScrollView>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                    flex: 1,
                  }}>
                  <Text>No review yet</Text>
                  <View style={{marginHorizontal: 20, width: '80%'}}>
                    <ContinueButton
                      onPress={() =>
                        props.navigation.navigate('addReview', {data: pid})
                      }
                      text={'Add Review'}
                    />
                  </View>
                </View>
              )}
            </>
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

    width: wp2(100),
  },
  supportText: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
    marginLeft: wp2(12),
  },
});
