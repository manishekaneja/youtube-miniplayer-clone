import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
const LeftSection = () => (
  <View style={styles.root}>
    <Text style={styles.heading}>GifTUBE</Text>
    <Text style={styles.subheading}>Using Gifhy</Text>
  </View>
);

export default LeftSection;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 6,
  },
  subheading: {
    paddingBottom: 5,
    color: 'white',
    fontSize: 12,
    fontWeight: 'normal',
  },
});
