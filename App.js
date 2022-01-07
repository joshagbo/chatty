import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './navigators/stack';

// const bgPrimary = '#4D4A95';

const App = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default App;
