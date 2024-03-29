import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,

  Platform,
  SafeAreaView,
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

import {errorMessage, } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {SizesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';

export default function Sizes(props) {
  

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  
  const category = props?.route?.params?.state?.stateChange?.category;
  

  useEffect(() => {
    setLoading(true);

    axios
      .get(SizesUrl, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(async function (res) {
      
        setData(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        
        setLoading(false);
       
        errorMessage(errorHandler(error))
      });
  }, []);

  const options = text => {
    return (
      <TouchableOpacity
        onPress={() => {
         
          const newState = props.route.params.state.quantity.map(
            (obj, index) => {
              // :point_down:️ if id equals 2, update country property
              if (index === props.route.params.key) {
                return {...obj, size: text.size, size_id: text.id};
              }
              // :point_down:️ otherwise return the object as is
              return obj;
            },
          );
          props.route.params.state.setQuantity(newState);
          props.navigation.goBack();
        }}
        style={styles.optionWrap}>
        <Text style={{color: 'black'}}>{text.size}</Text>
       
        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                props.route.params.state.quantity[props.route.params.key]
                  .size === text.size
                  ? 'black'
                  : '#D9D9D9',
            },
          ]}></View>
      </TouchableOpacity>
    );
  };
  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
  
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>SIZE</Text>
      </View>
      <Text style={styles.titleTxt}>
        {category === 1
          ? 'Footwear  (U.K)  - select all available sizes'
          : 'Clothing  (U.K)  - select your size'}
      </Text>

      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp2(6),
          }}>
          <SkypeIndicator color={'black'} />
        </View>
      ) : (
        <>
          {data?.map(item => {
            
            return <>{item.category_id === category && options(item)}</>;
          })}
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
    width: wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  optionWrap: {
    width: wp2(90),
    height: hp2(4),
   
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp2(1),
    marginTop: hp2(2),
    alignSelf: 'center',
  },
  circle: {
    width: wp2(5),
    height: wp2(5),
   
    borderRadius: 100,
  },
  titleTxt: {
    marginVertical: hp2(1),
    alignSelf: 'center',
    color: 'black',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
