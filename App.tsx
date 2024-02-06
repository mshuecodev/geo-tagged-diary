/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';

import Routes from 'routes/index';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
