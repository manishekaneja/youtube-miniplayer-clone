import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import CenterSection from './CenterSection';
import Colours from '../../../Colours';
import {HEADER_HEIGHT, Elevation} from '../../../ComponentsSize';

const ApplicationHeader = () => (
  <Header
    leftComponent={LeftSection}
    centerComponent={CenterSection}
    rightComponent={RightSection}
    containerStyle={styles.root}
    leftContainerStyle={styles.leftContainerStyle}
    rightContainerStyle={styles.rightContainerStyle}
    centerContainerStyle={styles.centerContainerStyle}
  />
);

export default ApplicationHeader;

const styles = StyleSheet.create({
  root: {
    elevation: Elevation.headers,
    backgroundColor: Colours.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    color: Colours.secondary.light,
    height: HEADER_HEIGHT + StatusBar.currentHeight,
  },
  leftContainerStyle: {
    flex: 1,
  },
  centerContainerStyle: {
    flex: 0,
  },
  rightContainerStyle: {
    flex: 0.5,
  },
});
