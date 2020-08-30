import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Text} from 'react-native-elements';
import Colours from '../../../Colours';

export default function TileDescription({item}) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>
        {item?.title.trim().length > 0 ? item?.title : 'Untitled'}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.description}>
        {item?.title.trim().length > 0 ? item?.title : 'Untitled'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colours.secondary.light,
  },
  description: {
    fontSize: 12,
    letterSpacing: 1,
    color: Colours.secondary.dark,
  },
});
