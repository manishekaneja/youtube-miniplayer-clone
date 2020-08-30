import {StatusBar} from 'react-native';

import {
  DISSAPPEARING_SCREEN,
  SCREEN_HEIGHT,
  BOTTOM_NAVIGATOR_HEIGHT,
} from '../../../ComponentsSize';

function useValueInterpolateHook(touchDifference, imageRatio, width, height) {
  const contentWidth = touchDifference.interpolate({
    inputRange: [0, DISSAPPEARING_SCREEN],
    outputRange: [width, width],
    extrapolate: 'clamp',
  });

  const overlayHeight = touchDifference.interpolate({
    inputRange: [0, (3 * height) / 4, height, DISSAPPEARING_SCREEN],
    outputRange: [
      SCREEN_HEIGHT - StatusBar.currentHeight - BOTTOM_NAVIGATOR_HEIGHT,
      64,
      64,
      0,
    ],
    extrapolate: 'clamp',
  });
  const translateY = touchDifference.interpolate({
    inputRange: [0, (3 * height) / 4, height, DISSAPPEARING_SCREEN],
    outputRange: [
      0,
      height - BOTTOM_NAVIGATOR_HEIGHT - 64,
      height - BOTTOM_NAVIGATOR_HEIGHT - 64,
      DISSAPPEARING_SCREEN,
    ],
    extrapolate: 'clamp',
  });
  const imageHeight = touchDifference.interpolate({
    inputRange: [0, (3 * height) / 4, height, DISSAPPEARING_SCREEN],
    outputRange: [imageRatio * width, 64, 64, 0],
    extrapolate: 'clamp',
  });

  const opacity = touchDifference.interpolate({
    inputRange: [0, height, DISSAPPEARING_SCREEN],
    outputRange: [1, 0.9, 0],
    extrapolate: 'clamp',
  });
  return {
    contentWidth,
    overlayHeight,
    translateY,
    imageHeight,
    opacity,
  };
}
export default useValueInterpolateHook;
