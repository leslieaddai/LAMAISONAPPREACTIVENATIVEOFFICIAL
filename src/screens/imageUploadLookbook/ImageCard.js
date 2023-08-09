import React, {memo} from 'react';
import {
 
  Image,
  TouchableOpacity,
 
  Platform,

} from 'react-native';



import {

  ICONS,
  
  wp2,
  hp2,

} from '../../theme';

import {errorMessage} from '../../config/NotificationMessage';

const ImageCard = props => {


  const abc = img => {
    if (img.uri === props.item.node.image.uri) {
      props.state.setSelectedImage(
        props.state.selectedImage.filter(
          e => e.uri !== props.item.node.image.uri,
        ),
      );
    } else {
      formatImgObj(props.item.node.image);
    }
  };

  const formatImgObj = img => {
    const uri =
      Platform.OS === 'android' ? img.uri : img.uri.replace('file://', '');
    const filename = img.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;

    props.state.setSelectedImage([
      ...props.state.selectedImage,
      {
        uri,
        name: filename,
        type,
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={() =>
     
        props.state.selectedImage.length !== 4 ||
        props.state.selectedImage.some(e => e.uri === props.item.node.image.uri)
          ? props.state.selectedImage.some(
              e => e.uri === props.item.node.image.uri,
            )
            ? props.state.setSelectedImage(
                props.state.selectedImage.filter(
                  e => e.uri !== props.item.node.image.uri,
                ),
              )
            : 
              formatImgObj(props.item.node.image)
          : errorMessage('You cant select more than 4 photos')
      }
      key={props.key}
      style={{width: wp2(24), height: wp2(24), overflow: 'hidden'}}>
      <Image
        key={props.key}
        source={{uri: props.item.node.image.uri}}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />

      {props.state.selectedImage.some(
        e => e.uri === props.item.node.image.uri,
      ) && (
        <ICONS.AntDesign
          name="checkcircle"
          size={20}
          color="#0F2ABA"
          style={{
            position: 'absolute',
            right: wp2(2),
            top: hp2(0.5),
            zIndex: 999,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(ImageCard);
