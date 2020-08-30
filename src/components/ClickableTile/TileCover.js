import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {Image} from 'react-native-elements';
import Colours from '../../../Colours';

export default function TileCover({uri}) {
  return (
    <View style={styles.root}>
      <Image
        placeholderStyle={styles.containerStyles}
        PlaceholderContent={
          <View>
            <ActivityIndicator size="large" color={Colours.primary.main} />
          </View>
        }
        transition={true}
        fadeDuration={1000}
        source={{uri}}
        style={styles.imageStyles}
        containerStyle={styles.containerStyles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colours.primary.dark,
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: 200,
  },
  containerStyles: {
    flex: 1,
  },
});
