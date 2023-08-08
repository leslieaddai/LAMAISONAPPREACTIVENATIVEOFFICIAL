import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  FlatList,
  SafeAreaView,
  Alert,
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
import CollectionItemsComp from '../../components/collectionItemsComp';

import {useDispatch, useSelector} from 'react-redux';

export default function CollectionScreen({navigation, route}) {
  items = route.params;
  const user = useSelector(state => state.userData);
 
  const [showDelete, setShowDelete] = useState(false);

  const onDeleteCollection = () => {
    

    if(showDelete){
      Alert.alert('Confirmation', 'Do you want to delete?', [
        {
          text: 'No',
          onPress: () => {
            console.log('No Pressed')
            setShowDelete(false)
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setShowDelete(false)
          },
        },
      ]);

    }else{
      setShowDelete(true);
    }
    
  }

  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
 
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', left: wp2(4)}}
            >
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.collectionText}>COLLECTION</Text>
          {items?.user?.userData?.id === user?.userData?.id && (
            <TouchableOpacity
            style={{position: 'absolute', right: wp2(4)}}
          onPress={() => onDeleteCollection()}>
          {showDelete ? (
            <View style={styles.deleteButton}>
              <Text style={{color: 'black',fontSize:rfv(8),}}>Delete Collection</Text>
              <ICONS.Ionicons name="ios-trash-bin" size={14} color="red" />
            </View>
          ) : (
            <ICONS.Ionicons
              name="menu-outline"
              size={30}
              color="black"
          
            />
          )}
        </TouchableOpacity>
          )}
        </View>
        <Text style={styles.text}>{items?.collectionname}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          data={items?.collection}
          numColumns={2}
          renderItem={({item}) => {
           
            return (
              <CollectionItemsComp
                
                data={item}
                uri={{
                  uri: item?.product?.product_images[0].media[0]?.original_url,
                }}
                name={item?.product?.name}
                price={item?.product?.price}
              />
            );
          }}
        />

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
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
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
