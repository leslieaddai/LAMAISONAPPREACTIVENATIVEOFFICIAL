import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {wp2, hp2, IMAGES, COLORS} from '../../theme';

export function ImgComp({path}) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const onLoading = value => {
    setLoading(value);
  };

  const onImageError = () => {
    setImageError(true);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('imageViewScreen', {
          item: [{image: [{original_url: path.preview_url}]}],
        })
      }
      style={styles.imageContainer}>
      <Image
        style={{width: 110, height: 110, borderRadius: 10}}
        resizeMode="cover"
        progressiveRenderingEnabled={true}
        onLoadStart={() => onLoading(true)}
        onLoadEnd={() => onLoading(false)}
        onError={onImageError}
        source={
          imageError || path.preview_url == null
            ? IMAGES.notFoundImage
            : {uri: path.preview_url}
        }
      />
    </TouchableOpacity>
  );
}

export default function Lookbook(props) {
  const renderImage = ({item}) => <ImgComp path={item.items} />;

  return (
    <>
      <Text style={styles.titleTxt}>Lookbook</Text>
      <View style={styles.galleryContainer}>
        {props?.data?.length !== 0 ? (
          <FlatList
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
            showsHorizontalScrollIndicator={false}
            data={props.data.reverse()}
            renderItem={renderImage}
            style={{flexDirection: 'row'}}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              width: '100%',
              height: 113,
              backgroundColor: COLORS.gray100,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: rfv(15),
                color: COLORS.gray400,
              }}>
              Nothing Here Yet
            </Text>
          </View>
        )}
      </View>

      {props?.data?.length !== 0 && (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('lookbookScreen', {
              userData: props?.route?.params?.userData,
            })
          }
          style={styles.viewAll}>
          <Text style={{color: 'black', fontWeight: '400', fontSize: rfv(16)}}>
            View Lookbook
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleTxt: {
    fontWeight: '400',
    fontSize: rfv(20),
    color: 'black',
    marginTop: 25,
    marginBottom: 16,
  },
  galleryContainer: {
    width: wp2(90),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
  skeletonView: {
    width: wp2(28),
    height: hp2(12),
    overflow: 'hidden',
  },
  viewAll: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    marginTop: 16,
  },
});
