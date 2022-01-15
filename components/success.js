import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Animated,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {onSuccess} from '../feature/reducers/successReducer';
import {bgLight, colorSuccess} from '../utils/colors';

export const SuccessComponent = ({message}) => {
  const {success} = useSelector(state => state.success);
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

  //clear success state in 8.10 sec
  setTimeout(
    () =>
      dispatch(
        onSuccess({
          successMessage: null,
          isSuccess: false,
        }),
      ),
    8010,
  );
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={success.isSuccess ? colorSuccess : bgLight}
      />
      <Animated.View
        style={{
          height: 60,
          width,
          backgroundColor: colorSuccess,
          paddingTop: 10,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          transform: [{translateY: moveInAnim}, {translateY: moveOutAnim}],
          opacity: fadeIn,
          opacity: fadeOut,
        }}>
        <Animated.Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: bgLight,
            textAlign: 'center',
            marginTop: 5,
            color: bgLight,
            transform: [{translateX: animateRight}],
          }}>
          {message}
        </Animated.Text>
      </Animated.View>
    </SafeAreaView>
  );
};
