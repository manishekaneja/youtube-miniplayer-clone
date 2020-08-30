import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Colours from '../../../Colours';
import ClickableTile from '../ClickableTile';
import {DISSAPPEARING_SCREEN} from '../../../ComponentsSize';
import remoteData from '../../../remoteData';
import {actions} from '../../reactReducer';

function OverlayBottomContent({value, dispatch, touchDifference, height}) {
  const hideOpacity = touchDifference.interpolate({
    inputRange: [0, height, DISSAPPEARING_SCREEN],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  const [relatedImages, updatedRelatedImages] = useState([]);

  const getRelatedImages = useCallback(
    ({offset}) => {
      if (value?.title) {
        return remoteData.getSearchResult({
          limit: 5,
          offset,
          q: value.title,
        });
      } else {
        return null;
      }
    },
    [value],
  );
  useEffect(() => {
    if (value) {
      const fetchCall = getRelatedImages({offset: 0});
      if (fetchCall) {
        fetchCall
          .then(({data}) => updatedRelatedImages(data.data))
          .catch((error) => console.error(error));
      }
    }
  }, [getRelatedImages, value]);

  const ListRender = React.useCallback(
    ({item}) => (
      <ClickableTile
        {...{clicked: () => dispatch(actions.setImageDirect(item)), item}}
      />
    ),
    [dispatch],
  );
  return (
    <>
      <Animated.View style={[styles.root, {opacity: hideOpacity}]}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.heading}>
          {value?.title.trim().length > 0 ? value?.title : 'Untitled'}
        </Text>
        <Text style={styles.subheading}>
          {value?.title.trim().length > 0 ? value?.title : 'Untitled'}
        </Text>
      </Animated.View>
      <Animated.FlatList
        ListFooterComponent={
          relatedImages.length > 0 ? (
            <View style={styles.footerStyle}>
              <ActivityIndicator size="large" color={Colours.secondary.main} />
            </View>
          ) : null
        }
        onEndReached={() => {
          getRelatedImages({offset: relatedImages.length + 2})
            .then(({data}) =>
              updatedRelatedImages((pl) => pl.concat(data.data)),
            )
            .catch((error) => console.error(error));
        }}
        initialNumToRender={5}
        removeClippedSubviews={true}
        style={{opacity: hideOpacity}}
        data={relatedImages}
        keyExtractor={({id}) => id.toString() + Math.random()}
        renderItem={ListRender}
      />
    </>
  );
}

export default OverlayBottomContent;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: Colours.primary.light,
  },
  heading: {
    color: Colours.secondary.main,
    fontSize: 22,
    fontWeight: 'bold',
  },
  subheading: {
    color: Colours.secondary.dark,
    fontSize: 14,
    fontWeight: 'normal',
  },
  footerStyle: {
    padding: 10,
    height: 32,
  },
});
