import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorComponent} from '../components/errors';
import {setError} from '../feature/reducers/appGlobalReducer';

import {
  bgLight,
  lightDark,
  colorDisabled,
  bgPrimary,
  Size,
} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';

export const PasswordResetScreen = ({navigation}) => {
  /*
    *********************************
    RESET PASSWORD STATE
    *********************************
    */
  const [resetEmail, setResetEmail] = useState();

  const {error} = useSelector(state => state.globals);
  const dispatch = useDispatch();

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSendInstructions = () => {
    if (!resetEmail) {
      dispatch(setError({message: 'Email Field Is Empty', isError: true}));
      return;
    }

    if (resetEmail && !emailPattern.test(resetEmail)) {
      dispatch(
        setError({
          message: 'Invalide Email Address',
          isError: true,
        }),
      );
      return;
    }
    navigation.navigate('Confirmed');
  };

  return (
    <>
      <ImageBackground
        source={require('../assets/images/bgSecurity.jpg')}
        style={{
          flex: 1,
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
        }}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        <SafeAreaView style={{flex: 1}}>
          {error.isError && <ErrorComponent message={error.message} />}
          <ScrollView contentContainerStyle={styles.contentsContainer}>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.description}>
              Enter the email associated with your account and we'll send email
              with reset instructions to reset your password.
            </Text>

            <View style={{marginTop: 40}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <MaterialIcons
                  name="alternate-email"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={colorDisabled}
                placeholder="Email"
                style={styles.textInput}
                defaultValue={resetEmail}
                onChangeText={mail => setResetEmail(mail)}
              />
            </View>

            <TouchableOpacity
              onPress={handleSendInstructions}
              style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>Send Instruction</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 40,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: 100,
  },

  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: lightDark,
    marginTop: 10,
    fontFamily: 'Outfit',
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    color: lightDark,
    fontFamily: 'Outfit-Bold',
  },

  textInput: {
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: colorDisabled,
    marginBottom: 10,
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
    paddingLeft: deviceTypeAndroid === 'Handset' ? 40 : 55,
  },

  btnLogin: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 20,
  },

  btnLoginText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
  },
});
