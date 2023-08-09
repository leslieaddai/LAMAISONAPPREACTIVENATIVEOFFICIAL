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

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {SkypeIndicator} from 'react-native-indicators';

export default function SelectSizes(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);



  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://lamaison.clickysoft.net/api/v1/product/${props?.route?.params?.data?.id}/color/${props?.route?.params?.color?.id}`,
      )
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
      <TouchableOpacity style={styles.optionWrap}
      disabled={text?.quantity < 1 ? true : false}
          onPress={() => {
            props?.route?.params?.state?.setSizeId(text);
            props?.navigation.goBack();
          }}
      >
        <Text style={{color: 'black'}}>{text?.size?.size}</Text>
        <Text style={[styles.quantityTxt,{color:text.quantity<5?'#E81717':'black'}]}>{text?.quantity== 0? 'Out of stock' :text?.quantity + ' remaining!'}</Text>

        <TouchableOpacity
        disabled={text?.quantity < 1 ? true : false}
          onPress={() => {
            props?.route?.params?.state?.setSizeId(text);
            props?.navigation.goBack();
          }}
          style={[
            styles.circle,
            {
              backgroundColor:
                props?.route?.params?.state?.sizeId?.id === text?.id
                  ? 'black'
                  : '#D9D9D9',
            },
          ]}></TouchableOpacity>
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
        {props?.route?.params?.data?.category_id === 1
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
           
            return <>{options(item)}</>;
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
  quantityTxt: { position: 'absolute', left: wp2(28)},
  titleTxt: {
    marginVertical: hp2(1),
    alignSelf: 'center',
    color: 'black',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
