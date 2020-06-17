import React from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PlayerContext, { defaultValue } from './src/contexts/PlayerContext';

import Routes from './src/routes';
import GlobalStyle from './src/styles/global';

export default class App extends React.Component {
  state = defaultValue;

  async componentDidMount() {
    await AsyncStorage.removeItem('@last-played-track')
  }

  render() {
      return (
        <>
          <StatusBar barStyle="light-content" backgroundColor={GlobalStyle.colors.SECOUNDARY_COLOR}/>
          <PlayerContext.Provider value={this.state}>
            <Routes/>
          </PlayerContext.Provider>
        </>
      );
  }
}