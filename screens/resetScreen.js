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
  useWindowDimensions,
} from 'react-native';
import {ErrorComponent} from '../components/errors';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setError} from '../feature/reducers/appGlobalReducer';

import {
  bgLight,
  lightDark,
  colorDisabled,
  bgPrimary,
  Size,
} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';

export const ResetScreen = ({navigation}) => {
  /*
    *********************************
    RESET PASSWORD STATE
    *********************************
    */
  const [newPassword, setNewPassword] = useState(null);
  const [repeat, setRepeat] = useState(null);
  const [visible, setVisible] = useState(true);

  const {error} = useSelector(state => state.globals);
  const dispatch = useDispatch();

  const handleCreateNewPassword = () => {
    if (!newPassword) {
      dispatch(
        setError({
          isError: true,
          message: 'Enter New Password',
        }),
      );
      return;
    }

    if (!repeat) {
      dispatch(
        setError({
          isError: true,
          message: 'Re-enter New Password',
        }),
      );
      return;
    }

    if (newPassword !== repeat) {
      dispatch(
        setError({
          isError: true,
          message: 'Password Do Not Match',
        }),
      );
      return;
    }

    if (newPassword === route.params?.password) {
      dispatch(
        setError({
          message: "New Password Can't Be Same As Old One",
          isError: true,
        }),
      );

      return;
    }
    navigation.navigate('Login');
  };

  const iconName = visible ? 'eye-off' : 'eye';

  return (
    <ImageBackground
      source={require('../assets/images/bgSecurity.jpg')}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <SafeAreaView>
        {error.isError && <ErrorComponent message={error.message} />}
        <ScrollView contentContainerStyle={styles.contentsContainer}>
          <Text style={styles.title}>Create New Password</Text>
          <Text style={styles.description}>
            Your new password must be different from the previous ones
          </Text>
          <View style={{marginTop: 40, marginBottom: 20}}>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="Password"
              style={styles.textInput}
              defaultValue={newPassword}
              onChangeText={passwd => setNewPassword(passwd)}
              secureTextEntry={visible}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 20,
                top: deviceTypeAndroid === 'Handset' ? 16 : 8,
              }}
              onPress={() => setVisible(!visible)}>
              <Ionicons
                name={iconName}
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholderTextColor={colorDisabled}
            placeholder="Repeat Password"
            style={styles.textInput}
            defaultValue={repeat}
            onChangeText={passwd => setRepeat(passwd)}
            secureTextEntry={visible}
          />

          <TouchableOpacity
            onPress={handleCreateNewPassword}
            style={styles.btnLogin}>
            <Text style={styles.btnLoginText}>Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    marginTop: 100,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 40,
    justifyContent: 'flex-start',
  },
  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: lightDark,
    fontFamily: 'OutfiT',
    marginTop: 5,
  },
  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: lightDark,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colorDisabled,
    marginBottom: 10,
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
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
