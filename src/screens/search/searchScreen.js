import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
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
import SearchComp from '../../components/searchComp';
import LoaderComp from '../../components/loaderComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {SearchUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function SearchScreen({navigation, route}) {
  const [selected, setSelected] = useState('brands');
  const [text, setText] = useState(route?.params);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();
  const user = useSelector(state => state.userData);

  const [loadingComp, setLoadingComp] = useState(false);

  const {Price} = useSelector(state => state.Price);
  const color = useSelector(state => state.Colour);
  const size = useSelector(state => state.Size);
  const style = useSelector(state => state.Style);
  const item = useSelector(state => state.Item);
  const region = useSelector(state => state.Continent);

  useEffect(() => {
    getSearchResults('1');
  }, []);

  const getSearchResults = page_no => {
    setLoading(true);

    let obj = {
      keyword: text,
      price_range: Price,
    };

    if (size?.Id !== '') {
      obj = {...obj, size: Number(size?.Id)};
    }
    if (color?.Id !== '') {
      obj = {...obj, color: Number(color?.Id)};
    }
    if (style?.Id !== '') {
      obj = {...obj, style: Number(style?.Id)};
    }
    if (item?.Id !== '') {
      obj = {...obj, item: Number(item?.Id)};
    }
    if (region?.Id !== '') {
      obj = {...obj, region: Number(region?.Id)};
    }

    axios
      .post(SearchUrl + page_no, obj)
      .then(async function (res) {
        console.log(res?.data);
        setData(prev => [...prev, ...res?.data?.data]);
        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loadingComp && <LoaderComp />}
      </View>

      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.headWrap}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textBoxInput}
                value={text}
                onChangeText={value => {
                  setText(value);
                }}
                onSubmitEditing={() => {
                  console.log('submited', text);
                }}
                placeholderTextColor={'grey'}
                returnKeyLabel="done"
                returnKeyType="done"
                placeholder="what do you want to wear?"
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('filterScreen', text)}
              //onPress={()=>props.navigation.navigate('stackNavComp', {screen: 'filterScreen'})}
            >
              <ICONS.FontAwesome5 name="sliders-h" size={34} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setSelected('brands')}>
              <Text
                style={[
                  styles.text,
                  {color: selected == 'brands' ? 'black' : 'gray'},
                ]}>
                BRANDS
              </Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={() => setSelected('editors')}>
              <Text
                style={[
                  styles.text,
                  {color: selected == 'editors' ? 'black' : 'gray'},
                ]}>
                EDITORS
              </Text>
            </TouchableOpacity>
          </View>

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

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: hp2(2),
              alignSelf: 'center',
            }}
            data={data}
            numColumns={3}
            onEndReached={() =>
              !loading && page !== null && getSearchResults(String(pageNo + 1))
            }
            onEndReachedThreshold={0.1}
            renderItem={({item}) => {
              return <SearchComp />;
            }}
          />

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

          {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp2(12),
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: wp2(97),
          alignSelf: 'center',
        }}>
        <SearchComp />
       
      </ScrollView> */}

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
  inputBox: {
    width: wp2(78),
    height: hp2(5),
    backgroundColor: '#D9D9D9',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    //marginVertical: hp2(1),
    //alignSelf:'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    width: wp2(50),
    height: hp2(8),
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp2(1),
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  text: {
    fontWeight: '700',
    fontSize: rfv(14),
    //color: 'black',
  },
  textBoxInput: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
