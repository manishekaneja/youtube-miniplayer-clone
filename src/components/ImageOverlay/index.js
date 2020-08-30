import React, {useRef, useLayoutEffect, useCallback, useState} from 'react';
import {StyleSheet, Animated, PanResponder, StatusBar} from 'react-native';
import Colours from '../../../Colours';
import {
  DISSAPPEARING_SCREEN,
  Elevation,
  OverlayState,
} from '../../../ComponentsSize';
import useValueInterpolateHook from './useValueInterpolateHook';
import OverlayBottomContent from './OverlayBottomContent';
import OverlayTopContent from './OverlayTopContent';
import {actions} from '../../reactReducer';

export default function ImageOverlay({value, width, height, dispatch}) {
  const [imageRatio, updateImageRatio] = useState(200 / width);
  const touchDifference = useRef(new Animated.Value(DISSAPPEARING_SCREEN))
    .current;
  const currentState = useRef(OverlayState.MAXIMUM);

  const maximizePlayer = useCallback(
    () =>
      Animated.spring(touchDifference, {
        toValue: -height,
        useNativeDriver: false,
        velocity: 100,
        damping: 50,
      }).start(() => {
        touchDifference.flattenOffset();
        touchDifference.setOffset(0);
        touchDifference.setValue(0);
        currentState.current = OverlayState.MAXIMUM;
      }),
    [touchDifference, currentState, height],
  );
  const minimizePlayer = useCallback(
    () =>
      Animated.spring(touchDifference, {
        toValue: height,
        useNativeDriver: false,
        velocity: 100,
        damping: 50,
      }).start(() => {
        touchDifference.flattenOffset();
        touchDifference.setOffset(height);
        touchDifference.setValue(0);
        currentState.current = OverlayState.MINIMUM;
      }),
    [touchDifference, currentState, height],
  );
  const backToPosition = useCallback(
    () =>
      Animated.spring(touchDifference, {
        toValue: 0,
        useNativeDriver: false,
        velocity: 100,
        damping: 50,
      }).start(),
    [touchDifference],
  );
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (__, {dx, dy}) =>
        dx > 2 || dx < -2 || dy > 2 || dy < -2,
      onPanResponderMove: (_, {dy}) => {
        touchDifference.setValue(dy);
      },
      onPanResponderRelease: () => {
        if (touchDifference._value > height / 10) {
          minimizePlayer();
        } else if (touchDifference._value < (-1 * height) / 10) {
          maximizePlayer();
        } else if (
          currentState.current === OverlayState.MINIMUM &&
          touchDifference._value > 5
        ) {
          dispatch(actions.unSet());
        } else {
          backToPosition();
        }
      },
    }),
  ).current;
  useLayoutEffect(() => {
    if (!value) {
      updateImageRatio(200 / width);
      touchDifference.setValue(DISSAPPEARING_SCREEN);
    } else {
      updateImageRatio(
        (parseInt(value.images.original.height, 10) || 200) /
          (parseInt(value.images.original.width, 10) || width),
      );
      maximizePlayer();
    }
  }, [value, touchDifference, maximizePlayer, width, updateImageRatio]);
  const {
    contentWidth,
    overlayHeight,
    translateY,
    imageHeight,
    opacity,
  } = useValueInterpolateHook(touchDifference, imageRatio, width, height);

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFill,
        ...styles.root,
        width: contentWidth,
        height: overlayHeight,
        transform: [{translateY}],
        opacity,
      }}>
      <Animated.View
        style={[
          styles.closeStyle,
          {maxHeight: (3 * height) / 4, height: imageHeight},
        ]}
        {...panResponder.panHandlers}>
        <OverlayTopContent
          {...{
            maximizePlayer,
            value,
            dispatch,
            touchDifference,
            height,
            width,
          }}
        />
      </Animated.View>
      <OverlayBottomContent {...{value, dispatch, touchDifference, height}} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    backgroundColor: Colours.primary.dark,
    elevation: Elevation.layouts,
    overflow: 'hidden',
  },
  closeStyle: {
    flexDirection: 'row',
  },
});
