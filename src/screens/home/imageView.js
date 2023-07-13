import React, {useState,useRef,useEffect} from 'react';
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

export default function ImageView(props) {

  itemdata = props?.route?.params?.item
  itemindex = props?.route?.params?.indexValue
  console.log(itemdata)

  // const ref = useRef();

  // const scrollToIndex = index => {
  //   ref?.current?.scrollToIndex({
  //     animated:true,
  //     index:index,
  //   });
  // }
 
  // useEffect(()=>{
  //   scrollToIndex(1);
  // },[])

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
      <FlatList
        //ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={itemdata?.product_images?.[0]?.image}
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
        />
      <View
       style={styles.toolBar}>
       <TouchableOpacity>
       <ICONS.MaterialIcons name="mode-comment" size={34} color="white" />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{itemdata?.product_comments?.length}</Text>

       <TouchableOpacity>
       <ICONS.Ionicons name="heart" size={34} color="white" />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{itemdata?.product_likes_count}</Text>

       <TouchableOpacity>
       <ICONS.MaterialCommunityIcons name="hanger" size={34} color="white" />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{itemdata?.product_wishlist_count}</Text>

       <TouchableOpacity>
       <ICONS.FontAwesome5 name="retweet" size={34} color="white" />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{itemdata?.product_shares_count}</Text>
     </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolBar:{
    width: wp2(100),
    height:hp2(7),
    backgroundColor:'#FFFFFF50',
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  toolBarText:{
    color:'white',
    fontWeight:'bold',
  },
});
