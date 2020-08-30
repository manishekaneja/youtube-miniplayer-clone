import React, {useReducer, useCallback, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import ImageContext from './src/context/ImageContext';
import LayoutContext from './src/context/LayoutContext';

import ApplicationHeader from './src/components/Header';
import Home from './src/screens/Home';
import ImageOverlay from './src/components/ImageOverlay';
import Colours from './Colours';
import BottomNavigator from './src/components/BottomNavigator';
import {Elevation} from './ComponentsSize';

import {reducer, initialState, actions} from './src/reactReducer';
import remoteData from './remoteData';

function useDataFetchHook() {
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const {random_id, list} = reducerState;
  const getTrendingGifs = useCallback(
    () =>
      remoteData
        .getTrending({limit: 15, random_id: random_id, offset: 0})
        .then(({data}) => dispatch(actions.onRefresh(data.data))),
    [random_id],
  );
  const appendMoreItems = useCallback(
    () =>
      remoteData
        .getTrending({limit: 10, random_id: random_id, offset: list.length + 1})
        .then(({data}) => dispatch(actions.gotNewItems(data.data))),
    [random_id, list],
  );
  useEffect(() => {
    remoteData.getRandomId().then(({data: {random_id: r_id}}) => {
      dispatch(actions.setRandomId(r_id));
    });
  }, []);
  useEffect(() => {
    getTrendingGifs().catch((error) => console.log(error));
  }, [getTrendingGifs]);

  return {
    reducerState,
    dispatch,
    appendMoreItems,
    getTrendingGifs,
  };
}

const App = () => {
  const {width, height} = useWindowDimensions();
  const {
    reducerState,
    dispatch,
    appendMoreItems,
    getTrendingGifs,
  } = useDataFetchHook();
  return (
    <>
      <LayoutContext.Provider value={{width, height}}>
        <ImageContext.Provider value={reducerState.selectedImage}>
          <StatusBar
            animated={true}
            networkActivityIndicatorVisible={true}
            translucent={true}
            hidden={false}
            showHideTransition={true}
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <SafeAreaView style={styles.root}>
            <ApplicationHeader />
            <Home
              random_id={reducerState.random_id}
              list={reducerState.list}
              {...{appendMoreItems, getTrendingGifs, dispatch}}
            />
            <BottomNavigator />
            <ImageOverlay
              {...{
                value: reducerState.isSelected
                  ? reducerState.selectedImage
                  : null,
                width,
                height,
                dispatch,
              }}
            />
          </SafeAreaView>
        </ImageContext.Provider>
      </LayoutContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colours.primary.dark,
    flex: 1,
    position: 'relative',
    elevation: Elevation.screen,
  },
});

export default App;
