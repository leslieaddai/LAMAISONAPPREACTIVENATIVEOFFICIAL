import React, {useState} from 'react';
import {Image} from 'react-native';
import {IMAGES} from '../../theme'; // Ensure this is the correct path to your IMAGES object

const MyImageComponent = ({onLoadStart, onLoad, onLoadEnd, allStates}) => {
  const [imageSource, setImageSource] = useState({
    uri: allStates[0]?.media[0]?.original_url,
  });

  // Define a function to handle loading errors
  const handleImageError = () => {
    // Set the image source to the local fallback "not found" image without the uri key
    setImageSource(IMAGES.notFoundImage); // Use the correct key for your fallback image
  };

  return (
    <Image
      progressiveRenderingEnabled={true}
      onLoadStart={() => onLoadStart(true, 'onLoadStart')}
      onLoad={() => onLoad(false, 'onLoad')}
      onLoadEnd={() => onLoadEnd(false, 'onLoadEnd')}
      onError={handleImageError} // Add the error handler
      source={
        typeof imageSource === 'string' ? {uri: imageSource} : imageSource
      } // Dynamically set source to either a local image or a URI
      style={{width: '100%', height: '100%'}}
      resizeMode="contain"
    />
  );
};

export default MyImageComponent;
