import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import TileCover from './TileCover';
import TileDescription from './TileDescription';
import Colours from '../../../Colours';

export default function ClickableTile({item, clicked}) {
  return (
    <TouchableHighlight
      onPress={() => {
        clicked(item.id);
      }}
      style={styles.root}>
      <>
        <TileCover uri={item.images.downsized.url} />
        <TileDescription {...{item}} />
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colours.primary.main,
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 6,
    elevation: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
