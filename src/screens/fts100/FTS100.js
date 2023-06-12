import React, {useState, useEffect} from 'react';
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
import Category from '../../components/FTS100Comps/category';
import BrandComp from '../../components/FTS100Comps/brands';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {FTSUrl, StylesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function FTS100(props) {
  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();
  const [loadingStyles, setLoadingStyles] = useState(false);
  const [loadingFts, setLoadingFts] = useState(false);
  const [dataStyles, setDataStyles] = useState([]);
  const [dataFts, setDataFts] = useState([]);
  const user = useSelector(state => state.userData);

  // useEffect(() => {
  //   getStyles();
  //   getFTS();

  //   props?.navigation.addListener('focus', () => {
  //     getStyles();
  //     getFTS();
  //   });

  //   props?.navigation.addListener('blur', () => {
  //     setSelected('');
  //   });

  // },[props?.navigation])

  useEffect(() => {
    getFTS();
    getStyles();
  }, []);

  const getStyles = () => {
    //setLoadingStyles(true);

    axios
      .get(StylesUrl)
      .then(async function (res) {
        console.log(res.data);
        setDataStyles(res.data.data);
        //setLoadingStyles(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoadingStyles(false);
        errorMessage('Something went wrong!');
      });
  };

  const getFTS = () => {
    setLoadingFts(true);

    axios
      .get(FTSUrl)
      .then(async function (res) {
        console.log(res.data);
        setDataFts(res.data.data);
        setLoadingFts(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoadingFts(false);
        errorMessage('Something went wrong!');
      });
  };

  // useEffect(()=>{
  //   setLoadingStyles(true);

  //   axios
  //   .get(StylesUrl)
  //   .then(async function (res) {
  //      console.log(res.data);
  //      setDataStyles(res.data.data);
  //      setLoadingStyles(false);
  //   })
  //   .catch(function (error) {
  //     console.log(error.response.data)
  //     setLoadingStyles(false);
  //     errorMessage('Something went wrong!')
  //   });

  // },[])

  // useEffect(()=>{
  //   setLoadingFts(true);

  //   axios.get(FTSUrl)
  //   .then(async function (res) {
  //      console.log(res.data);
  //      setDataFts(res.data.data);
  //      setLoadingFts(false);
  //   })
  //   .catch(function (error){
  //      console.log(error.response.data)
  //      setLoadingFts(false);
  //      errorMessage('Something went wrong!')
  //   });

  // },[])

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
          console.log(res.data);
          setDataFts(res.data.data);
          setLoadingFts(false);
        })
        .catch(function (error) {
          console.log(error.response.data);
          setLoadingFts(false);
          errorMessage('Something went wrong!');
        });
    }
  };

  return (
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
                  //console.log("item=======>",item);
                  return (
                    <>
                      <Category
                        data={{item}}
                        state={{selected, setSelected, onSelectStyle}}
                      />
                    </>
                  );
                })}
              </>
            )}
            {/* <Category text="top 100" state={{selected,setSelected}} />
        <Category text="streetwear" state={{selected,setSelected}} />
        <Category text="sportswear" state={{selected,setSelected}} />
        <Category text="nightlife" state={{selected,setSelected}} />
        <Category text="formalwear" state={{selected,setSelected}} />
        <Category text="outdoorswear" state={{selected,setSelected}} />
        <Category text="beachwear" state={{selected,setSelected}} /> */}

            {/* <Category text="activewear" state={{selected,setSelected}} />
        <Category text="beachwear" state={{selected,setSelected}} />
        <Category text="casualwear" state={{selected,setSelected}} />
        <Category text="formalwear" state={{selected,setSelected}} />
        <Category text="nightlife" state={{selected,setSelected}} />
        <Category text="outdoor" state={{selected,setSelected}} />
        <Category text="streetwear" state={{selected,setSelected}} /> */}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: hp2(1),
            paddingBottom: hp2(12),
            flexGrow: 1,
          }}>
          {/* <BrandComp rank={1} />      
        <BrandComp rank={2} /> 
        <BrandComp rank={3} /> 
        <BrandComp rank={4} />  
        <BrandComp rank={5} />  
        <BrandComp rank={6} />  
        <BrandComp rank={7} />  
        <BrandComp rank={8} />  
        <BrandComp rank={9} />  
        <BrandComp rank={10} />  
        <BrandComp rank={11} />  
        <BrandComp rank={12} />  */}
          {loadingFts ? (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <SkypeIndicator color={'black'} />
            </View>
          ) : (
            <>
              {dataFts?.map((item, index) => {
                //console.log("item=======>",item);
                return (
                  <>
                    <BrandComp data={{item}} key2={index} />
                  </>
                );
              })}
            </>
          )}
        </ScrollView>

        {/* <BottomComp /> */}
      </View>
    </SafeAreaView>
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
