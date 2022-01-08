import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {ContextProvider} from './feature/context';
import {AppStack} from './navigators/stack';

// const bgPrimary = '#4D4A95';

const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;
