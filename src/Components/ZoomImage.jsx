import {StyleSheet} from 'react-native';
import PhotoZoom from 'react-native-photo-zoom';
import {windowWidth} from '../Util/Dimension';
import {useState} from 'react';

const ZoomImage = ({item, scale}) => {
  return (
    <PhotoZoom
      source={{uri: item}}
      minimumZoomScale={1}
      fadeDuration={500}
      maximumZoomScale={2.5}
      scale={scale}
      androidScaleType="fitCenter"
      onLoad={() => console.log('Image loaded PhotoZoom inside Zoom Image!')}
      style={styles.postImage}
    />
  );
};
export default ZoomImage;

const styles = StyleSheet.create({
  postImage: {
    width: windowWidth,
    height: 400,
    resizeMode: 'contain',
  },
});
