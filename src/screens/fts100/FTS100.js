import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,

  Text,

  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  COLORS,

  wp2,
  hp2,

} from '../../theme';

import Category from '../../components/FTS100Comps/category';
import BrandComp from '../../components/FTS100Comps/brands';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {FTSUrl, StylesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';

export default function FTS100(props) {
  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();
  const [loadingStyles, setLoadingStyles] = useState(false);
  const [loadingFts, setLoadingFts] = useState(false);
  const [dataStyles, setDataStyles] = useState([]);
  const [dataFts, setDataFts] = useState([]);
  const user = useSelector(state => state.userData);

 

  useEffect(() => {
    getFTS();
    getStyles();
  }, []);

  const getStyles = () => {
   

    axios
      .get(StylesUrl)
      .then(async function (res) {
       
        setDataStyles(res.data.data);
        //setLoadingStyles(false);
      })
      .catch(function (error) {
        
        
        errorMessage(errorHandler(error))
      });
  };

  const getFTS = () => {
    setLoadingFts(true);

    axios
      .get(FTSUrl)
      .then(async function (res) {
       
        setDataFts(res.data.data);
        setLoadingFts(false);
      })
      .catch(function (error) {
        
        setLoadingFts(false);
      
        errorMessage(errorHandler(error))
      });
  };



  const onSelectStyle = (styleId, name) => {
    if (selected === name) {
      setSelected('');
      getFTS();
    } else {
      setSelected(name);
      setLoadingFts(true);

      axios
        .get(FTSUrl + `/${styleId}`)
        .then(async function (res) {
         
          setDataFts(res.data.data);
          setLoadingFts(false);
        })
        .catch(function (error) {
         
          setLoadingFts(false);
         
          errorMessage(errorHandler(error))
        });
    }
  };

  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.ftsText}>FTS 100</Text>

        <View style={{height: hp2(7)}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {loadingStyles ? (
              <View style={{width: wp2(100), alignItems: 'center'}}>
                <SkypeIndicator color={'black'} />
              </View>
            ) : (
              <>
                {dataStyles?.map(item => {
              
                  return (
                    <>
                      <Category
                        data={{item}}
                        state={{selected, setSelected, onSelectStyle,loadingFts}}
                      />
                    </>
                  );
                })}
              </>
            )}
            

           
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: hp2(1),
            paddingBottom: hp2(12),
            flexGrow: 1,
          }}>
          
          {loadingFts ? (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <SkypeIndicator color={'black'} />
            </View>
          ) : (
            <>
              {dataFts?.length!==0?(
                <>
                {dataFts?.map((item, index) => {
                
                return (
                  <>
                    <BrandComp data={{item}} key2={index} />
                  </>
                );
              })}
                </>
              ):(
                <View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>FTS Not Available</Text></View>
              )}
            </>
          )}
        </ScrollView>

        
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
  ftsText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignSelf: 'center',
  },
});
