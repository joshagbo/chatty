import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {bgLight, bgPrimary, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import {useSelector} from 'react-redux';

export const AppIntro = ({navigation}) => {
  const {slides} = useSelector(state => state.globals);

  const renderItems = ({item}) => (
    <Animated.View
      style={[
        styles.slideContainer,
        {
          backgroundColor: item.backgroundColor,
        },
      ]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </Animated.View>
  );

  const onDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          padding: 5,
          marginRight: 25,
        }}>
        <FontAwesome5
          name={Platform.select({
            android: 'angle-double-right',
            ios: 'angle-double-right',
            default: 'angle-double-right',
          })}
          size={Platform.select({
            android: deviceTypeAndroid === 'Handset' ? Size : Size * 1.2,
            ios: deviceTypeAndroid === 'Handset' ? Size : Size * 1.2,
            default: deviceTypeAndroid === 'Handset' ? Size : Size * 1.2,
          })}
          color={bgLight}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar barStyle="light-contents" backgroundColor={bgPrimary} />
      <AppIntroSlider
        renderItem={renderItems}
        data={slides}
        renderDoneButton={onDoneButton}
        showNextButton={true}
        showSkipButton={true}
        showPrevButton={true}
        activeDotStyle={{
          borderWidth: 6,
          borderRadius: 20,
          borderColor: bgLight,
        }}
        // ref={ref => (slideRefs = ref)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
    color: '#fff',
    textTransform: 'capitalize',
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  image: {
    height: deviceTypeAndroid === 'Handset' ? '40%' : '50%',
    width: deviceTypeAndroid === 'Handset' ? '90%' : '80%',
    alignSelf: 'center',
    borderRadius: 15,
    resizeMode: 'contain',
  },
  textContainer: {
    width: deviceTypeAndroid === 'Handset' ? '90%' : '80%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  text: {
    fontSize: deviceTypeAndroid === 'Handset' ? 16 : 24,
    color: bgLight,
    fontFamily: 'Outfit-Medium',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 24,
  },
});
