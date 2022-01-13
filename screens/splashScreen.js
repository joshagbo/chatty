import React, {useRef, useEffect} from 'react';
import {
  Animated,
  StatusBar,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';

import {Categories} from '../components/categories';
import chatIcon from '../assets/rounded-chat.png';
import {bgPrimary} from '../utils/colors';

const bgColor = '#4D4A95';

const SplashScreenComponent = () => {
  //translate  log&title along Y-axis
  const startAnimation = useRef(new Animated.Value(0)).current;
  const startHomeAnimation = useRef(new Animated.Value(0)).current;

  const {height, width} = useWindowDimensions();

  //scale logo
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  //move logo xy-axis
  const moveLogo = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  ).current;

  const moveTitle = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  ).current;

  const fadeInAnimation = useRef(new Animated.Value(0)).current;
  const startLogoScale = useRef(new Animated.Value(5)).current;
  const startTitleScale = useRef(new Animated.Value(2)).current;
  const onScaleFade = useRef(new Animated.Value(0)).current;
  // const animImageMode = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    //start animation immediately

    Animated.parallel([
      // Animated.delay(2000),
      Animated.timing(startLogoScale, {
        toValue: 1,
        useNativeDriver: true,
      }),

      Animated.timing(startTitleScale, {
        toValue: 1,
        useNativeDriver: true,
      }),

      Animated.timing(onScaleFade, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    //start animation after 500ms
    setTimeout(() => {
      //parallel animation
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -height + 65,
          useNativeDriver: true,
        }),

        Animated.timing(scaleLogo, {
          toValue: 0.4,
          useNativeDriver: true,
        }),

        Animated.timing(scaleTitle, {
          toValue: 1,
          useNativeDriver: true,
        }),

        Animated.timing(moveLogo, {
          toValue: {
            x: width - 20,
            y: height + 160,
          },
          useNativeDriver: true,
        }),

        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y: height / 2 - 100,
          },
          useNativeDriver: true,
        }),

        Animated.timing(startHomeAnimation, {
          toValue: 65,
          useNativeDriver: true,
        }),

        Animated.timing(fadeInAnimation, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => console.log({secondAnimFinished: finished}));
    }, 1000);
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgPrimary} />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          bottom: 0,
          right: 0,
          backgroundColor: bgColor,
          transform: [{translateY: startAnimation}],
        }}>
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.Image
            source={chatIcon}
            style={{
              width: 120,
              height: 120,
              marginBottom: 10,
              opacity: onScaleFade,
              transform: [
                {scale: startLogoScale},
                {scale: scaleLogo},
                {translateX: moveLogo.x},
                {
                  translateY: moveLogo.y,
                },
              ],
            }}
          />
          <Animated.Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              color: '#ddd',
              opacity: onScaleFade,
              transform: [
                {scale: startTitleScale},
                {scale: scaleTitle},
                {
                  translateX: moveTitle.x,
                },
                {translateY: moveTitle.y},
              ],
            }}>
            Chatty
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          marginBottom: 65,
          backgroundColor: '#fff',
          opacity: fadeInAnimation,
          transform: [{translateY: startHomeAnimation}],
        }}>
        <Categories />
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreenComponent;
