import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppIntro} from '../components/appIntro';
import {RegistrationScreen} from '../screens/registrationScreen';
import {LoginScreen} from '../screens/loginScreen';
import {SignUpScreen} from '../screens/signUp';
import SplashScreenComponent from '../components/splashScreen';

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Intro" component={AppIntro} />
    <Stack.Screen name="Register" component={RegistrationScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="Splash" component={SplashScreenComponent} />
  </Stack.Navigator>
);
