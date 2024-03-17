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
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  ICONS,
  COLORS,
 
  wp2,
  hp2,

} from '../../theme';

import CollectionComp from '../../components/collectionComp';

import {getCollection} from '../../config/Urls';
import {SkypeIndicator} from 'react-native-indicators';
import axios from 'react-native-axios';
import {errorMessage, } from '../../config/NotificationMessage';
import {errorHandler} from '../../config/helperFunction';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyImageComponent from './MyImageComponent';


export default function LookbookScreen(props) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.userData);
  const user2 = props?.route?.params?.userData;
 


  const [allStates, setAllStates] = useState([]);
  const [allLoading, setAllLoading] = useState(false);
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }


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
      .post(
        url,
        {user_id: user2?.userData?.id},
       
      )
      .then(function (response) {
        setAllLoading(false);
        setAllStates(response.data.data.reverse());
       
      })
      .catch(function (error) {
        setAllLoading(false);
       
      
        errorMessage(errorHandler(error))
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
            <View style={styles.headWrap}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{position: 'absolute', left: wp2(4)}}>
                <ICONS.AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.lookbookText}>Lookbook</Text>
            </View>

            {allStates.length!==0?(
              <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: hp2(12)}}>
              <Text style={styles.collectionText}>Latest Collection</Text>
              <Text style={styles.collectionName}>{allStates[0]?.name}</Text>
              {allStates.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('collectionScreen', {
                      collection: allStates[0].collection_products,
                      collectionname: allStates[0]?.name,
                      user:user2,
                    })
                  }
                  style={styles.imageContainer}>
                    {loading?
                    <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.skeletonView} />
                    </View>
                    </SkeletonPlaceholder>
                :
                undefined
                    }
                  <MyImageComponent
                    progressiveRenderingEnabled={true}
                    onLoadStart={()=>{onloading(true,"onLoadStart")}}
                    onLoad={()=>onloading(false,"onLoad")}
                    onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
                    allStates={ allStates}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.imageContainer}></View>
              )}
              <Text style={styles.collectionText}>All Collections</Text>
              <View>
                <FlatList
                  contentContainerStyle={{
                    paddingHorizontal: wp2(4),
                    paddingVertical: hp2(1),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={allStates}
                  renderItem={({item, index}) => {
                    console.log('ss');
                    return (
                      <>
                        {index > 0 && (
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
            </ScrollView>
            ):(
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
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
    fontWeight: '600',
    fontSize: rfv(22),
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
  skeletonView:{
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
  collectionName: {fontWeight: '600', color: 'black', marginLeft: wp2(6)},
});
