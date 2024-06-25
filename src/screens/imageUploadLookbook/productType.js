import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, COLORS, wp2, hp2} from '../../theme';

import axios from 'react-native-axios';
import {getCategories, GetBrandShippingInfo} from '../../config/Urls';
import {errorMessage} from '../../config/NotificationMessage';
import {errorHandler} from '../../config/helperFunction';
import {useSelector} from 'react-redux';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function ProductType(props) {
  const {token} = useSelector(state => state.userData);
  const [allStates, setAllStates] = useState({
    Getcategorytate: [],
  });
  const [allLoading, setAllLoading] = useState({
    GetcategoryLoading: false,
  });
  const {GetcategoryLoading} = allLoading;

  const {GetcategoryState} = allStates;

  const updateState = data => {
    setAllStates(prev => ({...prev, ...data}));
  };

  const updateLoadingState = data => {
    setAllLoading(prev => ({...prev, ...data}));
  };

  const [haveShippingInfo, setHaveShippingInfo] = useState(false);
  const [shippingData, setShippingData] = useState('');

  useEffect(() => {
    getApiData(getCategories, 'GetcategoryState', 'GetcategoryLoading');
    getShippingInfo();
  }, []);

  const getApiData = (url, state, loading) => {
    updateLoadingState({[loading]: true});
    axios
      .get(url, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        updateLoadingState({[loading]: false});
        updateState({[state]: response?.data?.data});
      })
      .catch(function (error) {
        errorMessage(errorHandler(error));
      });
  };

  const getShippingInfo = () => {
    axios
      .get(GetBrandShippingInfo, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async function (res) {
        if (res?.data?.data.length > 0) {
          setHaveShippingInfo(true);
          setShippingData(res?.data?.data);
        } else {
          setHaveShippingInfo(false);
          setShippingData('');
        }
      })
      .catch(function (error) {
        errorMessage(errorHandler(error));
      });
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <NewHeaderComp
          arrowNavigation={() => props.navigation.goBack()}
          title={'Product Type'}
          movePreviousArrow={true}
        />
        <View style={styles.container}>
          <FlatList
            data={GetcategoryState}
            contentContainerStyle={{width: '100%'}}
            renderItem={({item}) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      haveShippingInfo
                        ? props.navigation.navigate('imageUploadLookbook', {
                            item,
                            shippingData,
                          })
                        : errorMessage(
                            'Please set shipping price before uploading products!',
                          )
                    }
                    style={[
                      styles.box,
                      {
                        marginBottom: hp2(2),
                        backgroundColor:
                          item?.category_name == 'Footwear'
                            ? '#F6F6F6'
                            : '#F6F6F6',
                      },
                    ]}>
                    <View style={styles.iconWrap}>
                      <Image
                        source={
                          item?.icon == null
                            ? item?.category_name == 'Footwear'
                              ? IMAGES.foot
                              : IMAGES.shirt
                            : {uri: item?.icon?.original_url}
                        }
                        style={{
                          width: '100%',
                          height: '100%',

                          tintColor:
                            item?.category_name == 'Footwear'
                              ? 'black'
                              : 'black',
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        color:
                          item?.category_name == 'Footwear' ? 'black' : 'black',
                      }}>
                      {item?.category_name}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
  },
  box: {
    width: 374,
    height: 302,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
  },
  iconWrap: {
    width: wp2(18),
    height: wp2(18),
    marginBottom: 10,
    overflow: 'hidden',
  },
});
