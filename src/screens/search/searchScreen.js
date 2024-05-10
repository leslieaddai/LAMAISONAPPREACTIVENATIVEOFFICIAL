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

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
 
  ICONS,
  COLORS,

  wp2,
  hp2,
  IMAGES,
 
} from '../../theme';

import SearchComp from '../../components/searchComp';
import SearchComp2 from '../../components/searchComp2';
import LoaderComp from '../../components/loaderComp';

import {errorMessage, } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {SearchUrl,EditorSearch} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import { debounce } from 'lodash'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonViewSearchComp from '../../components/SkeletonViewComponents/SkeletonViewSearchComp';
import HeaderComponent from '../auth/componnets/HeaderComponnet';
import { useNavigation } from '@react-navigation/native';
import TextEditingComponent from '../auth/componnets/TexteditingComponent';
import SearchComponnetTextEditCont from '../auth/componnets/searchComp';

export default function SearchScreen({navigation, route}) {
  let skeletonArr = [{},{},{}]
  const [selected, setSelected] = useState('brands');
  const [text, setText] = useState(route?.params);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataEditor, setDataEditor] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();
  const [previouspage,setPreviouspage] = useState()
  const user = useSelector(state => state.userData);

  const [loadingComp, setLoadingComp] = useState(false);
  const navi= useNavigation()

  const {Price} = useSelector(state => state.Price);
  const color = useSelector(state => state.Colour);
  const size = useSelector(state => state.Size);
  const style = useSelector(state => state.Style);
  const item = useSelector(state => state.Item);
  const region = useSelector(state => state.Continent);

  useEffect(() => {
    getSearchResults('','1');
    getEditorResults();
  }, []);
  useEffect(()=>{
    if(text==''){
      getSearchResults('','1');
      getEditorResults('');
    }
  },[text])

  const getEditorResults = (searchtext) => {
    setLoading2(true);
    axios
      .post(EditorSearch,{keyword:searchtext})
      .then(async function (res) {
        
        setDataEditor(res?.data?.data)
        setLoading2(false);
      })
      .catch(function (error) {
      
        setLoading2(false);
      
        errorMessage(errorHandler(error))
      });
  }

  const getSearchResults = (searchtext,page_no) => {
    setPreviouspage(page_no)
    setLoading(true);

    let obj = {
      keyword: searchtext,
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
        if(previouspage == res?.data?.current_page){
         
        setData([...res?.data?.data]);
        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        // setLoading(false);
        setLoading(true);
      }else{
        setData(prev => [...prev, ...res?.data?.data]);
        setPage(res?.data?.next_page_url);
        setPageNo(res?.data?.current_page);
        setLoading(false);
      }
      })
      .catch(function (error) {
       
        setLoading(false);
     
        errorMessage(errorHandler(error))
      });
  };

  const debouncedSearch = debounce((searchTerm) => {
                setData([]);
                  setDataEditor([]);
                  getSearchResults(searchTerm,'1');
                  getEditorResults(searchTerm);
  
  }, 2000);
  let typingTimeout = null;
const handleInputChange = (text) => {
  setText(text)
  clearTimeout(typingTimeout); 

  typingTimeout = setTimeout(() => {
    debouncedSearch(text); 
  }, 2000);
}
  
  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loadingComp && <LoaderComp />}
      </View>

      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderComponent title={'Discover'}  ></HeaderComponent>
        <View style={styles.container}>

          <View style={styles.headWrap}>

            <View style={{width:hp2(39),paddingHorizontal:15}}>
              <SearchComponnetTextEditCont
                styles={styles.textBoxInput}
                value={text}
                onChangeText={handleInputChange}
                placeholderTextColor={'grey'}
                returnKeyLabel="done"
                returnKeyType="done"
                placeholder="what do you want to wear?"
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('filterScreen', text)}>
            <Image
            style={{height:45,width:45,paddingLeft:10}}
            source={IMAGES.setingsIcon}></Image>
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

          {loading && data?.length === 0 && selected === 'brands' && (
            <FlatList
              data={skeletonArr}
              renderItem={() => {
                return <SkeletonViewSearchComp />;
              }}
            />
          )}
{/* 
          {!loading &&data?.length === 0 && (
            <View >
            <Text style={{fontSize: 20}}>No Items Found</Text>
          </View>

          )} */}

          {loading2 && dataEditor?.length === 0 && selected === 'editors' && (
            <FlatList
              data={skeletonArr}
              renderItem={() => {
                return <SkeletonViewSearchComp />;
              }}
            />
          )}

          {selected === 'brands' ? (
            loading && data.length === 0 ? (
              // Show skeleton loader when data is being fetched
              <FlatList
                data={skeletonArr}
                numColumns={3} // Example numColumns for brands
                renderItem={() => {
                  return <SkeletonViewSearchComp />;
                }}
              />
            ) : data.length === 0 ? (
              // Show "No Items Found" when loading is finished and data is empty
              <View style={styles.centerMessage}>
                <Text style={{fontSize: 20}}>No Items Found</Text>
              </View>
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
                  getSearchResults(String(pageNo + 1))
                }
                onEndReachedThreshold={0.1}
                renderItem={({item, index}) => {
                  return <SearchComp key={index} data={item} />;
                }}
              />
            )
          ) : (
            // Render the editors' FlatList
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

          {loading && data.length !== 0 && selected === 'brands' && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: hp2(3),
              }}>
              <SkypeIndicator size={26} color={'black'} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  centerMessage: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight:'700',
  fontSize:20
},
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

  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(0),
    alignItems: 'center',
    // width:20
    // justifyContent: 'space-around',
  },
  iconContainer: {
    width: wp2(50),
    height: hp2(8),
    flexDirection: 'row',
 
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

  },
  textBoxInput: {
    // flex: ,
    
// paddingHorizontal:100
  }
});
