import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, COLORS, wp2, hp2} from '../../theme';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetAnalytics} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function AnalyticsScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    setLoading(true);

    axios
      .get(GetAnalytics, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(async function (res) {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  return (
    <View style={{backgroundColor: 'white'}}>
      <NewHeaderComp
        title={'Profile-Analytics'}
        movePreviousArrow={true}
        arrowNavigation={() => props.navigation.goBack()}
      />
      <View style={{height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.heading}>Hello {user?.userData?.name}!</Text>
        </View>
        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: hp2(2),
            }}>
            <SkypeIndicator color={'black'} />
          </View>
        ) : (
          <>
            <View style={styles.box}>
              <Text style={styles.textOne}>£{data?.profit}</Text>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
                PROFIT
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.box2}>
                <Text style={[styles.textOne, {fontSize: 30}]}>
                  {data?.sales}
                </Text>
                <Text style={styles.textTwo}>SALES</Text>
              </View>

              <View style={styles.box2}>
                <Text style={[styles.textOne, {fontSize: 30}]}>
                  {data?.customers}
                </Text>
                <Text style={styles.textTwo}>CUSTOMERS</Text>
              </View>

              <View style={styles.box2}>
                <Text style={[styles.textOne, {fontSize: 30}]}>
                  {data?.product_sold}
                </Text>
                <Text style={styles.textTwo}>PRODUCTS SOLD</Text>
              </View>

              <View style={styles.box2}>
                <Text style={[styles.textOne, {fontSize: 30}]}>
                  {data?.revenue?.[0]?.revenue === null
                    ? '0'
                    : data?.revenue?.[0]?.revenue}
                </Text>
                <Text style={styles.textTwo}>REVENUE</Text>
              </View>

              <View style={styles.box2}>
                <Text style={[styles.textOne, {fontSize: 30}]}>
                  {data?.impressions?.[0]?.impression}
                </Text>
                <Text style={styles.textTwo}>IMPRESSIONS</Text>
              </View>

              <View style={styles.box2}>
                <Text style={[styles.textOne, {fontSize: 30}]}>
                  #{data?.fts}
                </Text>
                <View style={styles.badge}>
                  <Image
                    source={IMAGES.badge}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '400',
    paddingVertical: 20,
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
  },
  box: {
    width: wp2(88),
    height: hp2(22),
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    elevation: 8,
  },
  detailsContainer: {
    width: wp2(88),
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp2(2),
  },
  box2: {
    width: wp(40),
    height: hp(12),
    backgroundColor: '#F6F6F6',
    borderRadius: wp2(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp2(1.5),
    elevation: 8,
  },
  textOne: {color: '#0C9D61', fontSize: 44},
  textTwo: {color: '#03092B', fontSize: 16, fontWeight: '600'},
  badge: {
    width: wp2(10),
    height: wp2(10),
    overflow: 'hidden',
  },
});
