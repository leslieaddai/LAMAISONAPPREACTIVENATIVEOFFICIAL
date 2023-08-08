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
import BottomComp from '../../components/bottomComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetAnalytics} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

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
        
        errorMessage(errorHandler(error))
      });
  }, []);

  

  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Hello {user?.userData?.name}!</Text>
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
          <Text style={styles.textTwo}>PROFIT</Text>
        </View>

        <View style={styles.detailsContainer}>
          
        <View style={styles.box2}>
        <Text style={[styles.textOne, {fontSize: rfv(18)}]}>{data?.sales}</Text>
          <Text style={styles.textTwo}>SALES</Text>
        </View>

        <View style={styles.box2}>
        <Text style={[styles.textOne, {fontSize: rfv(18)}]}>{data?.customers}</Text>
          <Text style={styles.textTwo}>CUSTOMERS</Text>
        </View>

        <View style={styles.box2}>
        <Text style={[styles.textOne, {fontSize: rfv(18)}]}>{data?.product_sold}</Text>
          <Text style={styles.textTwo}>PRODUCTS SOLD</Text>
        </View>

        <View style={styles.box2}>
        <Text style={[styles.textOne, {fontSize: rfv(18)}]}>{data?.revenue?.[0]?.revenue === null ? '0' : data?.revenue?.[0]?.revenue}</Text>
          <Text style={styles.textTwo}>REVENUE</Text>
        </View>

        <View style={styles.box2}>
        <Text style={[styles.textOne, {fontSize: rfv(18)}]}>{data?.impressions?.[0]?.impression}</Text>
          <Text style={styles.textTwo}>IMPRESSIONS</Text>
        </View>

        <View style={styles.box2}>
        <Text style={[styles.textOne, {fontSize: rfv(18)}]}>#{data?.fts}</Text>
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
    fontSize: rfv(22),
    fontWeight: '700',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    marginLeft: wp2(8),
  },
  box: {
    width: wp2(88),
    height: hp2(22),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
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
    backgroundColor: 'white',
    borderRadius: wp2(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp2(1.5),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textOne: {color: '#076426', fontSize: rfv(22)},
  textTwo: {color: 'black', fontSize: rfv(12), fontWeight: '600'},
  badge: {
    width: wp2(10),
    height: wp2(10),
    overflow: 'hidden',
  },
});
