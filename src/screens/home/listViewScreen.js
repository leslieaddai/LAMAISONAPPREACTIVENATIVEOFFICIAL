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
import PostCompListView from './postCompListView';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {Popular,Newsfeed} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function ListViewScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();
  const user = useSelector(state => state.userData);

  useEffect(() => {
    getNewsfeed('1');
  }, []);

  const getNewsfeed = page_no => {
    setLoading(true);

    axios
      .get(Newsfeed+page_no,{
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        console.log(res?.data);
        setFeedData(prev => [...prev, ...res?.data?.data?.newsfeed?.data]);
        setPage(res?.data?.data?.newsfeed?.next_page_url);
        setPageNo(res?.data?.data?.newsfeed?.current_page);
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
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('homeScreen')}
            style={styles.iconWrap2}>
            <Image
              source={IMAGES.gridView}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
          disabled={user?.token!==''?false:true}
            onPress={() => props.navigation.navigate('listViewScreen')}
            style={styles.iconWrap2}>
            <Image
              source={IMAGES.listView}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {loading && feedData?.length === 0 && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp2(6),
          }}>
          <SkypeIndicator color={'black'} />
        </View>
      )}
     
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical:hp2(2)}}
            data={feedData}
            onEndReached={() =>
              !loading && page !== null && getNewsfeed(String(pageNo + 1))
            }
            onEndReachedThreshold={0.1}
            renderItem={({item,index}) => {
              return (
               <PostCompListView key={index} data={item} />
              );
            }}
          />

{!loading && feedData?.length === 0 && (
          <View style={{ alignItems: 'center', flex: 1 }}><Text>No Data Available</Text></View>
        )}
         
          {loading && feedData?.length !== 0 && (
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  iconContainer: {
    width: wp2(44),
    height: hp2(8),
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
  },
  iconWrap2: {
    width: wp2(12),
    height: hp2(8),
    overflow: 'hidden',
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  postWrap: {
    width: wp2(94),
    height: hp2(7),
    //backgroundColor:'red',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: hp2(1),
  },
  imageWrap: {
    width: wp2(14),
    height: wp2(14),
    borderRadius: wp2(5),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: wp2(100),
    height: hp2(36),
    overflow: 'hidden',
    //backgroundColor:'yellow',
  },
  iconWrap: {
    width: wp2(80),
    height: hp2(6),
    //backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  deleteButton: {
    width: wp2(38),
    height: hp2(6),
    backgroundColor: '#D9D9D9',
    borderRadius: wp2(6),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: wp2(44),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
