import React, {useState} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import ClickableTile from '../../components/ClickableTile';

import {actions} from '../../reactReducer';
import Colours from '../../../Colours';

export default function Home({
  list,
  dispatch,
  appendMoreItems,
  getTrendingGifs,
}) {
  const ListRender = React.useCallback(
    ({item}) => (
      <ClickableTile
        {...{clicked: (id) => dispatch(actions.tilePressed(id)), item}}
      />
    ),
    [dispatch],
  );

  const [refreshing, updateRefreshFlag] = useState(false);
  return (
    <View style={{...styles.root}}>
      <FlatList
        {...{refreshing}}
        ListFooterComponent={
          list.length > 0 ? (
            <View style={styles.footerStyle}>
              <ActivityIndicator size="large" color={Colours.secondary.main} />
            </View>
          ) : null
        }
        initialNumToRender={5}
        removeClippedSubviews={true}
        onEndReached={() =>
          appendMoreItems().catch((error) => console.error(error))
        }
        onRefresh={() => {
          updateRefreshFlag(true);
          getTrendingGifs()
            .then(() => updateRefreshFlag(false))
            .catch((error) => {
              console.log(error);
            });
        }}
        data={list}
        keyExtractor={({id}) => id.toString() + Math.random()}
        renderItem={ListRender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  footerStyle: {
    height: 32,
  },
});
