import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import {bgLight, bgPrimary, lightDark} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';

export const SuccessConfirmation = ({navigation}) => (
  <ImageBackground
    source={require('../assets/images/bgSecurity.jpg')}
    style={{flex: 1, width: '100%', resizeMode: 'cover'}}>
    <StatusBar
      barStyle="dark-content"
      translucent
      backgroundColor={'transparent'}
    />
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/mailSent.png')}
          style={styles.imageBanner}
        />
        <Text style={styles.title}>Email Verified</Text>
        <Text style={styles.description}>
          We have send to you Email and Instructions Regarding the request to
          reset your password. Pls check your email and follow the instructions
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reset')}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  imageBanner: {
    width: '100%',
    height: deviceTypeAndroid === 'Handset' ? 200 : 250,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: bgPrimary,
  },
  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    fontWeight: '400',
    color: lightDark,
    marginTop: 10,
    fontFamily: 'Outfit',
    textAlign: 'center',
    width: '80%',
  },
  button: {
    alignSelf: 'center',
    padding: 15,
    width: '80%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 40,
  },
  buttonText: {
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    color: bgLight,
    textAlign: 'center',
  },
});
