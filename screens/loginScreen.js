import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {
  bgLight,
  textDark,
  lightDark,
  bgPrimary,
  colorGoogle,
  Size,
  colorDisabled,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {setSuccess, onLogin} from '../feature/reducers/appGlobalReducer';
import {SuccessComponent} from '../components/success';
import {deviceTypeAndroid} from '../utils/platforms';

export const LoginErrorComponent = ({message, isError}) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();

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
      dispatch(
        onLogin({
          isError: false,
        }),
      );
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
    }, 4000);
  });

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={isError ? colorGoogle : bgLight}
      />
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
  );
};

export const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = useState(route.params?.email || null);
  const [password, setPassword] = useState(null);
  const [visible, setVisible] = useState(true);

  const {
    //hook up to redux store
    error,
    success,
    login,
  } = useSelector(state => state.globals);
  const dispatch = useDispatch();

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /*
  *
  Error Handling
  *
  */
  const handleLogin = () => {
    if (!email) {
      dispatch(
        onLogin({
          loginInfo: {email, password},
          isError: true,
          errorMsg: 'Email Field Is Missing',
          success: false,
        }),
      );
      return;
    }

    if (email && !emailPattern.test(email)) {
      dispatch(
        onLogin({
          loginInfo: {email, password},
          isError: true,
          errorMsg: 'Invalid Email Address',
          success: false,
        }),
      );

      return;
    }

    if (!password) {
      dispatch(
        onLogin({
          loginInfo: {email, password},
          isError: true,
          errorMsg: 'Password Field Is Missing',
          success: false,
        }),
      );
      return;
    }

    if (
      password &&
      route.params?.password &&
      password !== route.params?.password
    ) {
      dispatch(
        onLogin({
          loginInfo: {email, password},
          isError: true,
          errorMsg: 'Wrong Password',
          success: false,
        }),
      );

      return;
    }

    dispatch(
      setSuccess({
        isSuccess: true,
        successMessage: 'Login Successful',
        type: 'LOGIN',
      }),
    );

    setTimeout(
      () =>
        dispatch(
          setSuccess({
            isSuccess: true,
            successMessage: "Wait You're Being LoggedIn",
            type: 'LOGIN',
          }),
        ),
      3000,
    );

    setTimeout(() => navigation.navigate('Splash'), 6000);
  };

  const iconName = visible ? 'eye-off' : 'eye';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      {login.isError && (
        <LoginErrorComponent message={login.errorMsg} isError={login.isError} />
      )}
      {success.isSuccess && success.type === 'LOGIN' && (
        <SuccessComponent message={success.successMessage} />
      )}

      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/rounded-chat.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>Chatty</Text>
        </View>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.description}>SignIn to continue</Text>

        <View
          style={{
            marginTop: 40,
            marginBottom: 20,
          }}>
          <View style={{marginBottom: 20}}>
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
              defaultValue={email}
              onChangeText={mailText => setEmail(mailText)}
            />
          </View>

          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                top: deviceTypeAndroid === 'Handset' ? 16 : 8,
              }}>
              <MaterialIcons
                name="vpn-key"
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="Password"
              style={styles.textInput}
              defaultValue={password}
              onChangeText={passwd => setPassword(passwd)}
              secureTextEntry={visible}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
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

          <TouchableOpacity onPress={handleLogin} style={styles.btnLogin}>
            <Text style={styles.btnLoginText}>Login Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.navigate('Password-reset')}>
            <Text style={styles.forgetPasswd}>Forget password?</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={[styles.btnSocial, {backgroundColor: bgPrimary}]}>
            <FontAwesome5 name="facebook-f" color={bgLight} size={Size} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSocial}>
            <Ionicons
              name="logo-google"
              color={bgLight}
              size={Size}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSocial, {backgroundColor: bgPrimary}]}>
            <FontAwesome5
              name="linkedin-in"
              color={bgLight}
              size={Size}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={styles.textInfo}>Don't have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                ...styles.textInfo,
                fontWeight: 'bold',
                color: bgPrimary,
              }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    backgroundColor: bgLight,
    paddingVertical: 40,
    width: '100%',
    paddingHorizontal: 40,
    alignSelf: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },

  logoImage: {
    width: deviceTypeAndroid === 'Handset' ? 40 : 60,
    height: deviceTypeAndroid === 'Handset' ? 40 : 60,
    resizeMode: 'cover',
  },

  logoText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    marginLeft: 8,
    color: textDark,
  },

  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    fontWeight: '400',
    color: lightDark,
    marginTop: 10,
    fontFamily: 'Outfit',
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
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    color: bgLight,
    textAlign: 'center',
  },

  forgetPasswd: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
    textAlign: 'center',
    color: lightDark,
    marginTop: 10,
  },

  btnSocial: {
    width: deviceTypeAndroid === 'Handset' ? 35 : 50,
    height: deviceTypeAndroid === 'Handset' ? 35 : 50,
    borderRadius: 50,
    backgroundColor: colorGoogle,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginRight: 10,
  },

  textInfo: {
    textAlign: 'center',
    fontSize: deviceTypeAndroid === 'Handset' ? 16 : 24,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
  },
});
