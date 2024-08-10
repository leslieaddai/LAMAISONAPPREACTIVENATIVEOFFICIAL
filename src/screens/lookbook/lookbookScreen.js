import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import CollectionComp from '../../components/collectionComp';

import {getCollection} from '../../config/Urls';
import {SkypeIndicator} from 'react-native-indicators';
import axios from 'react-native-axios';
import {errorMessage} from '../../config/NotificationMessage';
import {errorHandler} from '../../config/helperFunction';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyImageComponent from './MyImageComponent';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import {Axios} from 'axios';
import ContinueButton from '../auth/componnets/ContinueBtn';

export default function LookbookScreen(props) {
  const dispatch = useDispatch();
  //
  const [data, setData] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [error, setError] = useState(null);
  ///
  const user = useSelector(state => state.userData);
  const user2 = props?.route?.params?.userData;

  const [allStates, setAllStates] = useState([]);
  const [allLoading, setAllLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = 135;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://lamaisonadmin.com/api/v1/collection/list',
          {user_id: userId},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          },
        );
        setData(response.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          setError(
            `Server Error: ${error.response.status} - ${JSON.stringify(
              error.response.data,
            )}`,
          );
        } else if (error.request) {
          setError('No response received from server');
        } else {
          setError(`Error in request setup: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  ///
  const onloading = (value, label) => {
    setLoading(value);
  };

  const updateState = data => {
    setAllStates(prev => ({...prev, ...data}));
  };

  const updateLoadingState = data => {
    setAllLoading(prev => ({...prev, ...data}));
  };

  useEffect(() => {
    getApiData(getCollection);

    props?.navigation.addListener('focus', () => {
      getApiData(getCollection);
    });
  }, [props?.navigation]);

  const getApiData = url => {
    setAllLoading(true);
    axios
      .post(url, {user_id: user2?.userData?.id})
      .then(function (response) {
        setAllLoading(false);
        setAllStates(response.data.data.reverse());
      })
      .catch(function (error) {
        setAllLoading(false);
        errorMessage(errorHandler(error));
      });
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={{flex: 1}}>
        {allLoading ? (
          <SkypeIndicator color="black" />
        ) : (
          <>
            <View style={styles.container}>
              <NewHeaderComp
                movePreviousArrow={true}
                arrowNavigation={() => props.navigation.goBack()}
                title={'Lookbook'}
              />

              {/* <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                  <Text>{error}</Text>
                ) : (
                  <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderCollectionItem}
                    ListEmptyComponent={<Text>No data available.</Text>}
                  />
                )}
              </View> */}

              {/* <View style={styles.headWrap}>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{position: 'absolute', left: wp2(4)}}>
                  <ICONS.AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.lookbookText}>Lookbook</Text>
              </View> */}
              {data.length !== 0 ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingVertical: 20}}>
                  <Text style={styles.collectionText}>Latest Collection</Text>
                  {data.length > 0 ? (
                    <TouchableOpacity style={styles.imageContainer}>
                      {loading ? (
                        <SkeletonPlaceholder
                          borderRadius={4}
                          alignItems="center"
                          backgroundColor="#dddddd">
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View style={styles.skeletonView} />
                          </View>
                        </SkeletonPlaceholder>
                      ) : undefined}
                      <MyImageComponent
                        progressiveRenderingEnabled={true}
                        onLoadStart={() => {
                          onloading(true, 'onLoadStart');
                        }}
                        onLoad={() => onloading(false, 'onLoad')}
                        onLoadEnd={() => {
                          onloading(false, 'onLoadEnd');
                        }}
                        allStates={data}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={{backgroundColor: 'white'}} />
                  )}
                  <Text style={styles.collectionText}>All Collections</Text>
                  {/* <Text>{JSON.stringify(data)}</Text> */}
                  <View>
                    <FlatList
                      contentContainerStyle={{
                        paddingHorizontal: wp2(4),
                        paddingVertical: hp2(1),
                      }}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={data}
                      renderItem={({item, index}) => {
                        console.log('ss');
                        return (
                          <>
                            {item?.collection_products.length > 0 &&
                              index > 0 && (
                                <CollectionComp
                                  name={item?.name}
                                  itemscollection={item?.collection_products}
                                  uri={{uri: item?.media[0]?.original_url}}
                                  user={user2}
                                />
                              )}
                          </>
                        );
                      }}
                    />
                  </View>
                  <View style={{marginHorizontal: 20, marginTop: '10%'}}>
                    <ContinueButton
                      onPress={() =>
                        props.navigation.navigate('selectCoverPhoto')
                      }
                      text={'Create collection'}
                    />
                  </View>
                  {/* {user?.userData?.id === user2?.userData?.id &&
                    user?.userData?.role?.[0]?.id === 2 && (
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('selectCoverPhoto')
                        }
                        style={styles.button}>
                        <Text style={{color: 'white'}}>CREATE COLLECTION</Text>
                      </TouchableOpacity>
                    )} */}
                </ScrollView>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>No collection added yet</Text>
                  {user?.userData?.id === user2?.userData?.id &&
                    user?.userData?.role?.[0]?.id === 3 && (
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('selectCoverPhoto')
                        }
                        style={styles.button}>
                        <Text style={{color: 'white'}}>CREATE COLLECTION</Text>
                      </TouchableOpacity>
                    )}
                </View>
              )}
            </View>
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
    marginBottom: hp2(2),
  },
  lookbookText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  collectionText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 22,
    marginLeft: wp2(6),
    marginBottom: hp2(0.5),
  },
  imageContainer: {
    width: wp2(84),
    height: hp2(22),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: wp2(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: hp2(1),
  },
  skeletonView: {
    width: wp2(84),
    height: hp2(22),
    borderRadius: wp2(6),
  },
  button: {
    width: wp2(48),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp2(2),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  mediaContainer: {
    marginRight: 10,
  },
  mediaImage: {
    width: 100,
    height: 100,
  },
  collectionContainer: {
    marginVertical: 10,
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mediaScrollView: {
    paddingLeft: 10,
  },
  collectionName: {fontWeight: '600', color: 'black', marginLeft: wp2(6)},
});
