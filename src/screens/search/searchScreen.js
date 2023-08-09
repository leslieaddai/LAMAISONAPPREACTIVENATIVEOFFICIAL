import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,
  TextInput,
 
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

export default function SearchScreen({navigation, route}) {
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
        setLoading(false);
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
        <View style={styles.container}>
          <View style={styles.headWrap}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textBoxInput}
                value={text}
                  onChangeText={handleInputChange}
              
               
                placeholderTextColor={'grey'}
                returnKeyLabel="done"
                returnKeyType="done"
                placeholder="what do you want to wear?"
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('filterScreen', text)}
              
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

          {loading && data?.length === 0 && selected==='brands' && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: hp2(6),
              }}>
              <SkypeIndicator color={'black'} />
            </View>
          )}

          {loading2 && dataEditor?.length === 0 && selected==='editors' && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: hp2(6),
              }}>
              <SkypeIndicator color={'black'} />
            </View>
          )}

          {selected==='brands'?(
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
            renderItem={({item,index}) => {
              return <SearchComp key={index} data={item} />;
            }}
          />
          ):(
            <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: hp2(2),
              alignSelf: 'center',
            }}
            data={dataEditor}
            numColumns={3}
            renderItem={({item,index}) => {
              return <SearchComp2 key={index} data={item} />;
            }}
          />
          )}

          {loading && data?.length !== 0 && selected==='brands' && (
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
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'space-around',
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
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
