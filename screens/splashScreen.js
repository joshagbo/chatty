import React, {useRef, useEffect} from 'react';
import {
  Animated,
  StatusBar,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';

import {Categories} from '../components/categories';
import chatIcon from '../assets/images/rounded-chat.png';
import {bgLight, bgPrimary} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';

const bgColor = '#4D4A95';

const SplashScreenComponent = ({navigation}) => {
  /*
  *
  //initial animationn state
  *
  */
  //translate  log&title along Y-axis
  const startAnimation = useRef(new Animated.Value(0)).current;
  const startHomeAnimation = useRef(new Animated.Value(0)).current;

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

  const {height, width} = useWindowDimensions();

  useEffect(() => {
    //start animation immediately
    Animated.parallel([
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

    //start animation after 1s
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue:
            deviceTypeAndroid === 'Handset' ? -height + 65 : -height + 100,
          useNativeDriver: true,
        }),

        Animated.timing(scaleLogo, {
          toValue: deviceTypeAndroid === 'Handset' ? 0.4 : 0.5,
          useNativeDriver: true,
        }),

        Animated.timing(scaleTitle, {
          toValue: 1,
          useNativeDriver: true,
        }),

        Animated.timing(moveLogo, {
          toValue: {
            y: deviceTypeAndroid === 'Handset' ? height + 165 : height - 50,
            x: deviceTypeAndroid === 'Handset' ? width - 50 : width - 200,
          },
          useNativeDriver: true,
        }),

        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y:
              deviceTypeAndroid === 'Handset'
                ? height / 2 - 90
                : height / 2 - 120,
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
      <StatusBar barStyle="light-content" backgroundColor={bgPrimary} />
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
              fontSize: deviceTypeAndroid === 'Handset' ? 22 : 35,
              fontFamily: 'Outfit-Bold',
              color: bgLight,
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
          backgroundColor: bgLight,
          opacity: fadeInAnimation,
          transform: [{translateY: startHomeAnimation}],
        }}>
        <Categories navigation={navigation} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreenComponent;
