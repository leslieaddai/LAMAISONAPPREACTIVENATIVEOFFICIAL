import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import AddCollectionComp from '../../components/addCollectionComp';

import LoaderComp from '../../components/loaderComp';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {createCollection, GetBrandProductsById} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

import UploadSuccess from '../../assets/icons/uploaded-success.svg';
import Twitter from '../../assets/icons/twitter.svg';
import Facebook from '../../assets/icons/facebook.svg';
import LinkedIn from '../../assets/icons/linkedin.svg';
import ContinueButton from '../auth/componnets/ContinueBtn';

export default function AddCollection(props) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [uploadButton, setUploadButton] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const collectionName = props?.route?.params?.name;
  const collectionImage = props?.route?.params?.selectedImage;

  useEffect(() => {
    setLoading(true);

    console.log('load branddd');
    axios
      .get(GetBrandProductsById + `/${user?.userData?.id}`)
      .then(async function (res) {
        console.log(res.data.data);
        setData(res.data.data.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        console.log('err brand');
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  const onAddCollection = () => {
    setLoading2(true);

    var formdata = new FormData();

    formdata.append('user_id', user?.userData?.id);
    formdata.append('image', collectionImage);
    formdata.append('name', collectionName);
    selectedProducts.map((item, index) => {
      formdata.append('product_id[]', item);
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCollection,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };

    axios
      .request(config)
      .then(async function (res) {
        setLoading2(false);
        successMessage('Created Successfully');
        setUploadButton(true);

        setTimeout(() => {
          props.navigation.pop(2);
        }, 3000);
      })
      .catch(function (error) {
        setLoading2(false);

        errorMessage(errorHandler(error));
      });
  };

  if (uploadButton) {
    return (
      <View
        style={[
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        {/* <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" /> */}
        <UploadSuccess width="146" height="146" />
        <View style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
          <Text style={styles.uploadTxt}>Congratulations!</Text>
          <Text style={{fontSize: 14}}>Collection Uploaded</Text>
        </View>
        <View
          style={{
            backgroundColor: '#F6F6F6',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 10,
            marginTop: '15%',
          }}>
          <Text style={{fontSize: 14}}>
            Tell your friends about your great choice:
          </Text>
          <View style={{flexDirection: 'row', gap: 10, paddingTop: 20}}>
            <View
              style={{
                backgroundColor: 'white',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 999,
              }}>
              <Twitter width="22" height="22" />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 999,
              }}>
              <Facebook width="20" height="20" />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 999,
              }}>
              <LinkedIn width="20" height="20" />
            </View>
          </View>
        </View>
        <View style={{width: '90%', marginTop: '10%'}}>
          <ContinueButton
            text={'Got it!'}
            onPress={() => props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading2 && <LoaderComp />}
      </View>

      <SafeAreaView style={styles.container}>
        <NewHeaderComp
          title={'Create Collection'}
          movePreviousArrow={true}
          arrowNavigation={() => props.navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <Text style={{fontSize: 20}}>3. Select all pieces</Text>
          {selectedProducts.length > 0 && (
            <TouchableOpacity onPress={onAddCollection} style={styles.button}>
              <Text style={{color: 'white', fontWeight: 700, fontSize: 16}}>
                Finish
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <AddCollectionComp
                  state={{selectedProducts, setSelectedProducts}}
                  data={{item}}
                />
              );
            }}
          />
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
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(16),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  uploadTxt: {
    marginTop: hp2(2),
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: rfv(16),
  },
  button: {
    height: hp2(5),
    borderRadius: 10,
    paddingHorizontal: 40,
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
