import React from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import {Image} from 'react-native-elements';
import Colours from '../../../Colours';
import {DISSAPPEARING_SCREEN} from '../../../ComponentsSize';
import {actions} from '../../reactReducer';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function OverlayTopContent({
  value,
  maximizePlayer,
  dispatch,
  touchDifference,
  height,
  width,
}) {
  const imageWidth = touchDifference.interpolate({
    inputRange: [0, (3 * height) / 4, height, DISSAPPEARING_SCREEN],
    outputRange: [width, width, 120, 0],
    extrapolate: 'clamp',
  });
  const buttonWidth = touchDifference.interpolate({
    inputRange: [0, (3 * height) / 4, height, DISSAPPEARING_SCREEN],
    outputRange: [0, 0, 64, 0],
    extrapolate: 'clamp',
  });

  const titleWidth = touchDifference.interpolate({
    inputRange: [0, (3 * height) / 4, height, DISSAPPEARING_SCREEN],
    outputRange: [0, 0, width - 64 - 120, width - 64 - 120],
    extrapolate: 'clamp',
  });

  return (
    <>
      <TouchableHighlight
        style={[styles.flx_1, styles.flx_r]}
        onPress={(event) => {
          event.stopPropagation();
          maximizePlayer();
        }}>
        <>
          <AnimatedImage
            placeholderStyle={styles.containerStyles}
            PlaceholderContent={
              <View>
                <ActivityIndicator size="large" color={Colours.primary.main} />
              </View>
            }
            source={{uri: value?.images?.original?.url}}
            containerStyle={styles.imageContainer}
            style={{width: imageWidth}}
          />
          <Animated.View style={[styles.center, {width: titleWidth}]}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.heading}>
              {value?.title.trim().length > 0 ? value?.title : 'Untitled'}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.subheading}>
              {value?.title.trim().length > 0 ? value?.title : 'Untitled'}
            </Text>
          </Animated.View>
        </>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={(event) => {
          event.stopPropagation();
          if (value?.title) {
            dispatch(actions.unSet());
          } else {
            Alert.alert(
              'Warning',
              "It's better to let the content load before you click on it.",
            );
          }
        }}>
        <Animated.View
          style={{
            width: buttonWidth,
            ...styles.closeButtonStyle,
          }}>
          <Text style={styles.heading}>X</Text>
        </Animated.View>
      </TouchableHighlight>
    </>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  heading: {
    color: Colours.secondary.main,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subheading: {
    color: Colours.secondary.dark,
    fontSize: 14,
    fontWeight: 'normal',
  },
  center: {
    justifyContent: 'center',
    paddingHorizontal: 6,
    alignItems: 'flex-start',
  },
  closeButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  flx_1: {
    flex: 1,
  },
  flx_r: {
    flexDirection: 'row',
  },
  containerStyles: {
    backgroundColor: Colours.primary.dark,
    flex: 1,
  },
});
