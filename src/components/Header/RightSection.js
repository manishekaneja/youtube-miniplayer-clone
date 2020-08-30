import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
const RightSection = () => <Text style={styles.root} />;

export default RightSection;
const styles = StyleSheet.create({
  root: {
    display: 'none',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
