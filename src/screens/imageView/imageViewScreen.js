import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';

import {ICONS, COLORS, wp2, hp2, IMAGES} from '../../theme';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';

export default function ImageViewScreen(props) {
  const scrollX = new Animated.Value(0);
  const itemdata = props?.route?.params?.item;
  const itemindex =
    props?.route?.params?.indexValue === undefined
      ? null
      : props?.route?.params?.indexValue;

  // Initially, no errors for any images
  const [imageErrors, setImageErrors] = useState({});

  // Helper function to render image or fallback
  const renderImage = (item, index) => {
    const imageUri = item?.original_url;
    const hasError = imageErrors[index]; // Check if the current image has an error

    return (
      <View
        key={index}
        style={{width: wp2(100), height: hp2(90), alignSelf: 'center'}}>
        <Image
          source={
            hasError || !imageUri ? IMAGES.notFoundImage : {uri: imageUri}
          } // Use fallback if error or uri is null
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
          onError={() => {
            // Update the error state for this image
            setImageErrors(prevErrors => ({...prevErrors, [index]: true}));
          }}
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: COLORS.appBackground}} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{marginLeft: wp2(3), marginTop: hp2(4)}}>
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
              {itemdata[0]?.image?.map((item, index) =>
                renderImage(item, index),
              )}
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
              getItemLayout={(data, index) => ({
                length: wp2(100),
                offset: wp2(100) * index,
                index,
              })}
              initialScrollIndex={itemindex}
              renderItem={({item, index}) => renderImage(item, index)}
            />
          )}
          {itemdata[0]?.image?.length > 1 && (
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
