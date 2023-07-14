import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Animated,
  ImageBackground,
  Platform,
  SafeAreaView,
  FlatList,
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
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';

export default function ImageViewScreen(props) {
  const scrollX = new Animated.Value(0);
  itemdata = props?.route?.params?.item
  itemindex = props?.route?.params?.indexValue === undefined ? null : props?.route?.params?.indexValue
  console.log(itemdata)
  console.log(itemindex)
 
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <TouchableOpacity onPress={()=>props.navigation.goBack()}
        style={{
          marginLeft: wp2(3),
          marginTop: hp2(4),
          position: 'absolute',
          zIndex: 999,
        }}>
        <ICONS.AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      {itemindex === null ? (
        <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}>
          {itemdata[0]?.image?.map((item,index)=>{
             console.log("testimgas",itemdata[0]?.image.length)
            return(
            <View key={index} style={{width: wp2(100), height: hp2(100)}}>
            <Image
              source={{uri:item?.original_url}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          )
          })}
      </Animated.ScrollView>
      ) : (
        <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={itemdata?.[0]?.image}
        getItemLayout={(data, index) => (
          {length: wp2(100), offset: wp2(100) * index, index}
        )}
        initialScrollIndex={itemindex}
        renderItem={({item,index})=>{
          return(
            <View key={index} style={{width: wp2(100), height: hp2(100)}}>
            <Image
              source={{uri:item?.original_url}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          )
        }}
        >
      </Animated.FlatList>
      )}
     {itemdata[0]?.image?.length>1 && (
       <View
       style={{
         width: wp2(100),
         position: 'absolute',
         bottom: hp2(3),
         zIndex: 999,
       }}>
       <RNAnimatedScrollIndicators
         numberOfCards={itemdata[0]?.image?.length}
         scrollWidth={wp2(100)}
         activeColor={'#707070'}
         inActiveColor={'#D9D9D9'}
         scrollAnimatedValue={scrollX}
       />
     </View>
     )}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
