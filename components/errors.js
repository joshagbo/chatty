import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  useWindowDimensions,
  Animated,
} from 'react-native';

import {CreateErrorContext} from '../feature/context';
import {bgLight, colorGoogle} from '../utils/colors';

export const ErrorComponent = () => {
  const {error, errorMessage, setError} = useContext(CreateErrorContext);

  const {height, width} = useWindowDimensions();

  const moveInAnim = useRef(new Animated.Value(-200)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  const fadeOut = useRef(new Animated.Value(1)).current;
  const moveOutAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(moveInAnim, {
        toValue: 0,
        duration: 20,
        useNativeDriver: true,
      }),
      Animated.timing(fadeIn, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveOutAnim, {
          toValue: -height,
          useNativeDriver: true,
        }),
      ]).start();
    }, 8000);

    setTimeout(() => setError(false), 8010);
  });

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={error ? colorGoogle : bgLight}
      />
      <Animated.View
        style={{
          height: 100,
          width,
          backgroundColor: colorGoogle,
          paddingTop: 10,
          paddingBottom: 20,
          // marginBottom: 20,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          transform: [{translateY: moveInAnim}, {translateY: moveOutAnim}],
          opacity: fadeIn,
          opacity: fadeOut,
        }}>
        <Text
          style={{
            fontSize: 27,
            color: bgLight,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Oops!
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: bgLight,
            textAlign: 'center',
            marginTop: 5,
          }}>
          {errorMessage}
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};
