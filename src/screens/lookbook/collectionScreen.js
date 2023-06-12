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

export default function CollectionScreen({navigation, route}) {
  items = route.params;
  //console.log(items)
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.collectionText}>COLLECTION</Text>
        </View>
        <Text style={styles.text}>{items?.collectionname}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          data={items?.collection}
          numColumns={2}
          renderItem={({item}) => {
            // console.log("sajda",item?.product?.product_images[0].media[0]?.original_url)
            return (
              <CollectionItemsComp
                //userData={items?.userData}
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
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: rfv(18),
    alignSelf: 'center',
    marginTop: hp2(3),
  },
  flatlist: {
    //flexDirection:'row',
    paddingTop: hp2(2),
    paddingBottom: hp2(12),
    //justifyContent:'space-between',
  },
});
