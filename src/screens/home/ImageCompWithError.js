
import React, {useState, useEffect} from 'react';
import { IMAGES } from '../../theme';
import {

  Image,

} from 'react-native';
const ImageCompWithError = ({uri}) => {
  const [imageUri, setImageUri] = useState(uri);
  const [hasError, setHasError] = useState(false); // Added state to track loading error

  const handleImageError = () => {
    setHasError(true); // Mark that an error occurred
    setImageUri(IMAGES.notFoundImage); // Optionally set a fallback image URI directly
  };

  return (
    <Image
      source={hasError || !imageUri ? IMAGES.notFoundImage : {uri: imageUri}}
      style={{width: '100%', height: '100%'}}
      resizeMode="cover"
      onError={handleImageError}
    />
  );
};
export default ImageCompWithError;
