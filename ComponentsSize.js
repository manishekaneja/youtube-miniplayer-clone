import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const HEADER_HEIGHT = 64;

const BOTTOM_NAVIGATOR_HEIGHT = 48;

const Elevation = {
  screen: 0,
  headers: 10,
  layouts: 20,
  popups: 50,
};

const OverlayState = {
  MAXIMUM: 'maximum',
  MINIMUM: 'minimum',
};

const DISSAPPEARING_SCREEN = height * 1.1;

Object.freeze(Elevation);
Object.freeze(OverlayState);

export {
  HEADER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  BOTTOM_NAVIGATOR_HEIGHT,
  DISSAPPEARING_SCREEN,
  Elevation,
  OverlayState,
};
