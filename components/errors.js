import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Animated,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {setError} from '../feature/reducers/appGlobalReducer';
import {bgLight, colorGoogle, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ErrorComponent = ({message}) => {
  const {error} = useSelector(state => state.globals);
  const dispatch = useDispatch();

  const {height, width} = useWindowDimensions();

  const moveInAnim = useRef(new Animated.Value(-200)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  const fadeOut = useRef(new Animated.Value(1)).current;
  const moveOutAnim = useRef(new Animated.Value(0)).current;
  const animateRight = useRef(new Animated.Value(-200)).current;

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
      Animated.spring(animateRight, {
        toValue: 0,
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
  });

  //clear error state in 8.10 sec
  setTimeout(
    () => dispatch(setError({isError: false, message: null, type: 'CLEANUP'})),
    8010,
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={error.isError ? colorGoogle : bgLight}
        translucent={false}
      />
      <SafeAreaView>
        <Animated.View
          style={{
            height: 60,
            width,
            backgroundColor: colorGoogle,
            paddingTop: 10,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            left: 0,
            zIndex: 10,
            transform: [{translateY: moveInAnim}, {translateY: moveOutAnim}],
            opacity: fadeIn,
            opacity: fadeOut,
          }}>
          <Animated.Text
            style={{
              fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
              fontFamily: 'Outfit-Medium',
              color: bgLight,
              textAlign: 'center',
              transform: [{translateX: animateRight}],
            }}>
            <FontAwesome5
              name="info-circle"
              size={deviceTypeAndroid === 'Handset' ? Size / 1.8 : Size / 1.2}
              color={bgLight}
            />{' '}
            {message}
          </Animated.Text>
        </Animated.View>
      </SafeAreaView>
    </>
  );
};
