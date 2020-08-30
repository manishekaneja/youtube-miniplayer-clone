import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {BOTTOM_NAVIGATOR_HEIGHT, Elevation} from '../../../ComponentsSize';
import Colours from '../../../Colours';
export default function BottomNavigator() {
  return (
    <View style={styles.root}>
      <TouchableHighlight
        style={styles.navigationButton}
        onPress={() => Alert.alert('Home')}>
        <Text style={styles.textStyles}>Home</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.navigationButton}
        onPress={() => Alert.alert('Inof')}>
        <Text style={styles.textStyles}>Info</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: BOTTOM_NAVIGATOR_HEIGHT,
    elevation: Elevation.layouts,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: Colours.primary.main,
  },
  navigationButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    color: Colours.secondary.main,
  },
});
