import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import { IMAGES } from '../../theme';
const ImageCompWithErrorProfile = ({uri}) => {
  // Initialize with the provided uri or fall back to the local image if none provided
  const [imageUri, setImageUri] = useState(uri || IMAGES.profileIcon3);
  const handleError = () => setImageUri(IMAGES.profileIcon3); // Use the fallback image on error

  // Determine the source correctly for both local and remote images
  const source = typeof imageUri === 'string' ? {uri: imageUri} : imageUri;

  return (
    <Image
      source={source}
      style={{width: '100%', height: '100%'}}
      resizeMode="cover"
      onError={handleError}
    />
  );
};
export default ImageCompWithErrorProfile;