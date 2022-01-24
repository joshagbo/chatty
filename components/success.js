import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {deviceTypeAndroid} from '../utils/platforms';
import {useDispatch, useSelector} from 'react-redux';
import {setSuccess} from '../feature/reducers/appGlobalReducer';
import {bgLight, colorSuccess} from '../utils/colors';

export const SuccessComponent = ({message}) => {
  const [loading, setLoading] = useState(true);
  const {success} = useSelector(state => state.globals);
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
    }, 6010);
  });

  //clear success state in 6.10 sec
  setTimeout(
    () =>
      dispatch(
        setSuccess({
          successMessage: null,
          isSuccess: false,
          type: 'CLEANUP',
        }),
      ),
    6010,
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
        <Animated.View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <ActivityIndicator size="small" color={bgLight} animating={loading} />
          <Animated.Text
            style={{
              fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
              fontFamily: 'Outfit-Medium',
              color: bgLight,
              textAlign: 'center',
              marginLeft: 5,
              color: bgLight,
              transform: [{translateX: animateRight}],
            }}>
            {message}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};
