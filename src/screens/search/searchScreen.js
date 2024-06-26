import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2, IMAGES} from '../../theme';

import NewImageSVG from '../../assets/discover.svg';

import SearchComp from '../../components/searchComp';
import SearchComp2 from '../../components/searchComp2';
import LoaderComp from '../../components/loaderComp';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {SearchUrl, EditorSearch} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {debounce} from 'lodash';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonViewSearchComp from '../../components/SkeletonViewComponents/SkeletonViewSearchComp';
import HeaderComponent from '../auth/componnets/HeaderComponnet';
import {useNavigation} from '@react-navigation/native';
import TextEditingComponent from '../auth/componnets/TexteditingComponent';
import SearchComponnetTextEditCont from '../auth/componnets/searchComp';
import ContinueButton from '../auth/componnets/ContinueBtn';
import {SvgUri} from 'react-native-svg';
import NewInputComp from '../../components/NewInputComp';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import types from '../../Redux/types';

export default function SearchScreen({navigation, route}) {
  let skeletonArr = [{}];
  const [selected, setSelected] = useState('brands');
  const [text, setText] = useState(route?.params);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataEditor, setDataEditor] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState(0);
  const [previouspage, setPreviouspage] = useState();
  const [noItemsFound, setNoItemsFound] = useState(false);
  const user = useSelector(state => state.userData);

  const [loadingComp, setLoadingComp] = useState(false);
  const nav = useNavigation();

  const {Price} = useSelector(state => state.Price);
  const color = useSelector(state => state.Colour);
  const size = useSelector(state => state.Size);
  const style = useSelector(state => state.Style);
  const item = useSelector(state => state.Item);
  const region = useSelector(state => state.Continent);
  const resetDiscover = () => {
    dispatch({
      type: types.Priceadd,
      payload: '',
    });

    dispatch({
      type: types.Sizeadd,
      payload: {size: '', id: ''},
    });

    dispatch({
      type: types.Colouradd,
      payload: {color: '', id: ''},
    });

    dispatch({
      type: types.Styleadd,
      payload: {style: '', id: ''},
    });

    dispatch({
      type: types.Itemadd,
      payload: {item: '', id: ''},
    });

    dispatch({
      type: types.Continetadd,
      payload: {continent: '', id: ''},
    });
  };

  useEffect(() => {
    // setTimeout(() => {
      getSearchResults('', '1');
      getEditorResults('');
    // }, 2000);
    console.log('Routes', route);
  }, []);

  useEffect(() => {
    if (text == '') {
      // resetDiscover();
      getSearchResults('', '1');
      getEditorResults('');
    }
  }, [text]);

  const getEditorResults = searchtext => {
    setLoading2(true);
    axios
      .post(EditorSearch, {keyword: searchtext})
      .then(async function (res) {
        setDataEditor(res?.data?.data);
        setLoading2(false);
      })
      .catch(function (error) {
        setLoading2(false);

        errorMessage(errorHandler(error));
      });
  };

  const getSearchResults = (searchtext, page_no) => {
    setPreviouspage(page_no);
    setLoading(true);

    let obj = {
      keyword: searchtext,
      price_range: Price,
    };

    // if (size?.Id !== '') {
    //   obj = {...obj, size: Number(size?.Id)};
    // }
    // if (color?.Id !== '') {
    //   obj = {...obj, color: Number(color?.Id)};
    // }
    // if (style?.Id !== '') {
    //   obj = {...obj, style: Number(style?.Id)};
    // }
    // if (item?.Id !== '') {
    //   obj = {...obj, item: Number(item?.Id)};
    // }
    // if (region?.Id !== '') {
    //   obj = {...obj, region: Number(region?.Id)};
    // }

    console.log('1obj:', obj);

    axios
      .post(SearchUrl + page_no, obj)
      .then(async function (res) {
        console.log('res----:', res);
        if (previouspage == res?.data?.current_page) {
          setData([...res?.data?.data]);
          setPage(res?.data?.next_page_url);
          setPageNo(res?.data?.current_page);
          // setLoading(false);
          setLoading(true);
        } else {
          setData(prev => [...prev, ...res?.data?.data]);
          setPage(res?.data?.next_page_url);
          setPageNo(res?.data?.current_page);
          setLoading(false);
        }
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };

  const debouncedSearch = debounce(searchTerm => {
    setData([]);
    setDataEditor([]);
    getSearchResults(searchTerm, '1');
    getEditorResults(searchTerm);
  }, 2);

  let typingTimeout = null;
  const handleInputChange = text => {
    setText(text);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      debouncedSearch(text);
    }, 2000);
  };
  const ItemNotFoundComponent = () => {
    return (
      <View
        style={{
          marginTop: '25%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <Image style={{width: 84, height: 84}} source={IMAGES.no_items_found} />
        <View
          style={{
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>
            No Results Found
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              color: '#A1A1AA',
              textAlign: 'center',
            }}>
            Sorry, there are no results for this search, please try another
            phrase
          </Text>
        </View>
        <ContinueButton
          style={{
            marginTop: 60,
            width: '95%',
          }}
          text={'Back To Search'}
        />
      </View>
    );
  };

  noItems = null;
  useEffect(() => {
    if (data.length === 0 || dataEditor.length === 0) {
      noItems = setTimeout(() => {
        setNoItemsFound(true);
      }, 5000);
    } else if (data.length > 0 || dataEditor.length > 0) {
      clearTimeout(noItems);
      setNoItemsFound(false);
    }
  }, [data.length]);

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loadingComp && <LoaderComp />}
      </View>

      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {/* <HeaderComponent title={'Discover'}></HeaderComponent> */}
        <NewHeaderComp
          arrowNavigation={() => nav.navigate('homeScreen')}
          movePreviousArrow={true}
          title={'Discover'}
        />
        <View style={styles.container}>
          <View
            style={{
              width: '80%',
              gap: 15,
              marginHorizontal: 20,
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View style={{width: '92%'}}>
              <SearchComponnetTextEditCont
                value={text}
                onChangeText={handleInputChange}
                placeholderTextColor={'grey'}
                returnKeyLabel="done"
                returnKeyType="done"
                placeholder="Search"
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('filterScreen', text)}>
              <Image
                style={{height: 45, width: 45}}
                source={IMAGES.setingsIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    selected == 'brands' ? COLORS.main : COLORS.gray100,
                },
              ]}
              onPress={() => setSelected('brands')}>
              <Text
                style={[
                  styles.tabText,
                  {color: selected == 'brands' ? COLORS.main : 'black'},
                ]}>
                Brands
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    selected == 'editors' ? COLORS.main : COLORS.gray100,
                },
              ]}
              onPress={() => setSelected('editors')}>
              <Text
                style={[
                  styles.tabText,
                  {color: selected == 'editors' ? COLORS.main : 'black'},
                ]}>
                Editors
              </Text>
            </TouchableOpacity>
          </View>
          {data?.length === 0 && selected === 'brands' && (
            <>
              {!noItemsFound ? (
                <FlatList
                  data={skeletonArr}
                  renderItem={() => {
                    return <SkeletonViewSearchComp />;
                  }}
                />
              ) : (
                <ItemNotFoundComponent />
              )}
            </>
          )}
          {dataEditor?.length === 0 && selected === 'editors' && (
            <>
              {!noItemsFound ? (
                <FlatList
                  data={skeletonArr}
                  renderItem={() => {
                    return <SkeletonViewSearchComp />;
                  }}
                />
              ) : (
                <ItemNotFoundComponent />
              )}
            </>
          )}

          {selected === 'brands' ? (
            loading && data.length === 0 ? (
              <Text></Text>
            ) : (
              // Render the FlatList when data is available
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: hp2(2),
                  alignSelf: 'center',
                }}
                key={'_'}
                keyExtractor={data => '_' + data.id}
                data={data}
                numColumns={3}
                onEndReached={() =>
                  !loading &&
                  page !== null &&
                  getSearchResults('', String(pageNo + 1))
                }
                onEndReachedThreshold={0.1}
                renderItem={({item, index}) => {
                  return <SearchComp key={index} data={item} />;
                }}
              />
            )
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: hp2(2),
                alignSelf: 'center',
              }}
              data={dataEditor}
              numColumns={3}
              renderItem={({item, index}) => {
                return <SearchComp2 key={index} data={item} />;
              }}
            />
          )}
          {/* {loading && data.length !== 0 && selected === 'brands' && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: hp2(3),
              }}>
              <SkypeIndicator size={26} color={'black'} />
            </View>
          )} */}
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
  text: {
    fontWeight: '700',
    fontSize: rfv(14),
  },
  tabsContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  tabText: {
    fontWeight: '500',
    fontSize: rfv(14),
  },
});
