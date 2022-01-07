import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
const bgPrimary = '#4D4A95';

import Ionicons from 'react-native-vector-icons/Ionicons';

const slides = [
  {
    key: 'welcome',
    title: 'welcome, Chatty!',
    text: 'A next-gen chat application. Click Next to begin',
    image: require('../assets/welcome.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'vr',
    title: 'Metaverse',
    text: 'Join the discussion and learn then nuances of Virtual Reality',
    image: require('../assets/Virtual_reality.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'ai',
    title: 'Artificial Intelligence',
    text: 'What do people say about mankind greatest invention. Join the community to learn more',
    image: require('../assets/Firmware.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'photography',
    title: 'Arial Photography',
    text: 'Get the chance to meet other professional and learn the de factor in Arial Photography.',
    image: require('../assets/Camera.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'climate',
    title: 'Climate Change',
    text: 'With the recent rise in sea level and expotential temperature rise. What are scientists and folks saying about climate change',
    image: require('../assets/among_nature.png'),
    backgroundColor: bgPrimary,
  },
];

export const AppIntro = ({navigation}) => {
  const isDone = () => {
    // Alert.alert('You are done here!');
    navigation.navigate('Splash');
  };

  const {height, width} = useWindowDimensions();

  const platformNextIcon =
    // 'chevron-forward';
    Platform.OS === 'ios' ? 'chevron-forward' : 'arrow-forward';

  const platformDoneIcon =
    //  'checkmark-done';
    Platform.OS === 'ios' ? 'checkmark-done' : 'checkmark';

  const Size = 30;

  const renderItems = ({item}) => (
    <View
      style={{
        backgroundColor: item.backgroundColor,
        ...styles.slideContainer,
      }}>
      <Text style={{...styles.title, transform: [{translateY: height / 8}]}}>
        {item.title}
      </Text>
      <Image
        source={item.image}
        style={{
          ...styles.image,
          width: width - 100,
          height: 240,
          marginTop: height / 4,
        }}
      />
      <View style={{...styles.textContainer, width: width - 100}}>
        <Text style={{...styles.text}}>{item.text}</Text>
      </View>
    </View>
  );

  const renderDoneButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Register')}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        padding: 5,
        marginRight: 25,
      }}>
      <Ionicons name={platformDoneIcon} size={Size} color={'#fff'} />
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="light-contents" backgroundColor={bgPrimary} />
      <AppIntroSlider
        renderItem={renderItems}
        data={slides}
        onDone={isDone}
        renderDoneButton={renderDoneButton}
        showNextButton={true}
        showSkipButton={true}
        showPrevButton={true}
        activeDotStyle={{
          borderWidth: 5,
          borderRadius: 2,
          borderColor: '#fff',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
  },
  title: {
    alignItems: 'flex-start',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    textTransform: 'capitalize',
  },
  image: {
    alignSelf: 'center',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  textContainer: {
    alignSelf: 'center',
    paddingTop: 20,
  },
  text: {
    color: '#eee',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 24,
  },
});
