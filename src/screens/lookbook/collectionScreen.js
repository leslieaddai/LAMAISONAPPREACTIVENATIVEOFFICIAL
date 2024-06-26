import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';
import axios from 'react-native-axios';

import CollectionItemsComp from '../../components/collectionItemsComp';

import {useSelector} from 'react-redux';
import {DeleteCollection} from '../../config/Urls';
import {successMessage} from '../../config/NotificationMessage';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import {ScrollView} from 'react-native-gesture-handler';

export default function CollectionScreen({navigation, route}) {
  items = route.params;
  // console.log(items?.collection[0]?.collection_id)
  const user = useSelector(state => state.userData);

  const [showDelete, setShowDelete] = useState(false);

  const onDeleteCollection = () => {
    if (showDelete) {
      Alert.alert('Confirmation', 'Do you want to delete?', [
        {
          text: 'No',
          onPress: () => {
            console.log('No Pressed');
            setShowDelete(false);
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setShowDelete(false);
            deletecollection();
          },
        },
      ]);
    } else {
      setShowDelete(true);
    }
  };
  const deletecollection = () => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${DeleteCollection}${items?.collection[0]?.collection_id}`,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
    };
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        successMessage('Collection Delete Successfully');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <NewHeaderComp
            title={'Collection'}
            movePreviousArrow={true}
            arrowNavigation={() => navigation.goBack()}
          />
          <View style={styles.headWrap}>
            {items?.user?.userData?.id === user?.userData?.id && (
              <TouchableOpacity
                style={{position: 'absolute', right: wp2(4)}}
                onPress={() => onDeleteCollection()}>
                {showDelete ? (
                  <View style={styles.deleteButton}>
                    <Text style={{color: 'black', fontSize: rfv(8)}}>
                      Delete Collection
                    </Text>
                    <ICONS.Ionicons
                      name="ios-trash-bin"
                      size={14}
                      color="red"
                    />
                  </View>
                ) : (
                  <ICONS.Ionicons name="menu-outline" size={30} color="black" />
                )}
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text
              style={{fontSize: 22, marginHorizontal: 10, paddingVertical: 20}}>
              {items?.collectionname}
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={items?.collection}
              numColumns={2}
              renderItem={({item}) => {
                console.log(item?.product?.product_images[0].media[0]);
                console.log(item?.product?.name);
                return (
                  <CollectionItemsComp
                    data={item}
                    uri={{
                      uri: item?.product?.product_images[0].media[0]
                        ?.original_url,
                    }}
                    name={item?.product?.name}
                    price={item?.product?.price}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 1000,
  },
  headWrap: {
    marginTop: Platform.OS === 'ios' ? hp2(0) : 0,
  },
  collectionText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(14),
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: rfv(18),
    alignSelf: 'center',
    marginTop: hp2(3),
  },
  flatlist: {
    paddingTop: hp2(2),
    paddingBottom: hp2(12),
    gap: 10,
  },
  deleteButton: {
    width: wp2(28),
    height: hp2(4),
    backgroundColor: '#D9D9D9',
    borderRadius: wp2(4),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
