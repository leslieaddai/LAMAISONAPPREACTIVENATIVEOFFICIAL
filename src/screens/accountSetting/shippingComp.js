import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {AddShipping} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import ContinueButton from '../auth/componnets/ContinueBtn';
import NewInputComp from '../../components/NewInputComp';

export default function ShippingComp(props) {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(
    props?.data?.shipping_brand !== null
      ? props?.data?.shipping_brand?.price
      : '',
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    setPrice(
      props?.data?.shipping_brand !== null
        ? props?.data?.shipping_brand?.price
        : '',
    );
  }, [props?.data?.shipping_brand]);

  const onSubmit = () => {
    if (price !== '') {
      setLoading(true);

      let config = {
        method: 'post',
        url: AddShipping,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
        data: {price: Number(price), region_id: props?.data?.id},
      };

      axios
        .request(config)
        .then(async function (res) {
          setShow(false);
          props?.state?.getAllRegions();
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          errorMessage(errorHandler(error));
        });
    } else {
      errorMessage('Please input price!');
    }
  };

  return (
    <>
      {show ? (
        <View style={styles.container}>
          <View style={styles.disclaimerBox}>
            <TouchableOpacity
              onPress={() => {
                setPrice(
                  props?.data?.shipping_brand !== null
                    ? props?.data?.shipping_brand?.price
                    : '',
                );
                setShow(false);
              }}
              style={{alignSelf: 'flex-end', marginHorizontal: 20}}>
              <ICONS.Entypo
                name="circle-with-cross"
                size={24}
                color="#7B788A"
              />
            </TouchableOpacity>

            <NewInputComp
              handleOnChange={e => setPrice(e)}
              value={price}
              inputText={'Enter Shipping Price For ' + props?.data?.name}
            />
            {/* <View style={styles.inputWrap}>
              <TextInput
                placeholder={'Enter Shipping Price For ' + props?.data?.name}
                placeholderTextColor={'grey'}
                value={price}
                onChangeText={e => setPrice(e)}
                style={{flex: 1, color: 'black'}}
                keyboardType={'number-pad'}
              />
            </View> */}
            <Text style={styles.freeShippingTxt}>
              If you want to give free shipping then just enter 0 in price.
            </Text>

            <TouchableOpacity
              disabled={loading}
              style={styles.savebtn}
              onPress={() => {
                onSubmit();
              }}>
              {loading ? (
                <SkypeIndicator size={24} color={'white'} />
              ) : (
                <Text style={{color: 'white'}}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <TouchableOpacity onPress={() => setShow(true)} style={styles.optionWrap}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                props?.data?.shipping_brand !== null ? COLORS.main : '#D9D9D9',
            },
          ]}></View>
        <Text style={{color: 'black', fontSize: 16}}>{props?.data?.name}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(100),
    height: hp2(100),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 999,
  },
  optionWrap: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '90%',
    padding: 20,
    backgroundColor: COLORS.gray100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  circle: {
    width: wp2(5),
    height: wp2(5),
    borderRadius: 4,
  },
  disclaimerBox: {
    width: wp2(80),
    backgroundColor: COLORS.appBackground,
    borderRadius: wp2(3),
    borderWidth: 1,
    marginTop: hp2(20),
    paddingVertical: hp2(2),
  },
  savebtn: {
    width: '85%',
    height: 40,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  priceTxt: {color: 'black', fontSize: hp('2')},
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp2(1),
  },
  freeShippingTxt: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
