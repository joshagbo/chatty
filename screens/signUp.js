import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  bgLight,
  textDark,
  lightDark,
  bgPrimary,
  colorGoogle,
  colorDisabled,
  Size,
} from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {onRegister, setSuccess} from '../feature/reducers/appGlobalReducer';
import {deviceTypeAndroid} from '../utils/platforms';
import {SuccessComponent} from '../components/success';

export const SignupErrorComponent = ({message, isError}) => {
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
        onRegister({
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

export const SignUpScreen = ({navigation}) => {
  /*
  ********************************
  //Internal Signup State
  ********************************
  */
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [visible, setVisible] = useState(true);

  const {
    //Hook-up to redux store
    registration,
    success,
  } = useSelector(state => state.globals);
  const dispatch = useDispatch();

  const iconName = visible ? 'eye-slash' : 'eye';

  //validate email authenticity
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = () => {
    const userInfo = {firstname, lastname, username, email, password};
    /*
********************************
//Error Handling
********************************
  */
    if (!firstname) {
      dispatch(
        onRegister({
          registrationInfo: userInfo,
          isError: true,
          errorMsg: 'Firstname Field Is Missing',
        }),
      );
      return;
    }

    if (!lastname) {
      dispatch(
        onRegister({
          registrationInfo: userInfo,
          isError: true,
          errorMsg: 'Lastname Field Is Missing',
        }),
      );
      return;
    }

    if (!username) {
      dispatch(
        onRegister({
          registrationInfo: userInfo,
          isError: true,
          errorMsg: 'Username Field Is Missing',
        }),
      );
      return;
    }

    if (!email) {
      dispatch(
        onRegister({
          registrationInfo: userInfo,
          isError: true,
          errorMsg: 'Email Field Is Missing',
        }),
      );
      return;
    }

    if (email && !emailPattern.test(email)) {
      dispatch(
        onRegister({
          registrationInfo: userInfo,
          isError: true,
          errorMsg: 'Invalid Email Address',
        }),
      );
      return;
    }

    if (!password) {
      dispatch(
        onRegister({
          registrationInfo: userInfo,
          isError: true,
          errorMsg: 'Password Field Is Missing',
        }),
      );
      return;
    }

    dispatch(
      setSuccess({
        isSuccess: true,
        message: 'Registration Successful',
        type: 'REGISTRATION',
      }),
    );

    setTimeout(
      () =>
        dispatch(
          setSuccess({
            isSuccess: true,
            message: 'Directing You To Login...',
            type: 'REGISTRATION',
          }),
        ),
      3000,
    );
    //redirect after 6s
    setTimeout(() => navigation.navigate('Login', {email, password}), 6000);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      {registration.isError && (
        <SignupErrorComponent
          message={registration.errorMsg}
          isError={registration.isError}
        />
      )}

      {success.isSuccess && success.type === 'REGISTRATION' && (
        <SuccessComponent message={success.message} />
      )}
      <ScrollView contentContainerStyle={styles.contentsContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/rounded-chat.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>Chatty</Text>
        </View>

        <Text style={styles.title}>Explore Possibilities!</Text>
        <Text style={styles.description}>SignUp Now</Text>
        <View
          style={{
            marginVertical: 20,
          }}>
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                top: deviceTypeAndroid === 'Handset' ? 16 : 8,
              }}>
              <FontAwesome5
                name="user-alt"
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="Firstname"
              style={styles.textInput}
              defaultValue={firstname}
              onChangeText={fName => setFirstname(fName)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                top: deviceTypeAndroid === 'Handset' ? 16 : 8,
              }}>
              <FontAwesome5
                name="user"
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="Lastname"
              style={styles.textInput}
              defaultValue={lastname}
              onChangeText={lName => setLastname(lName)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                top: deviceTypeAndroid === 'Handset' ? 16 : 8,
              }}>
              <FontAwesome5
                name="user-check"
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="Username"
              style={styles.textInput}
              defaultValue={username}
              onChangeText={uName => setUsername(uName)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                top: deviceTypeAndroid === 'Handset' ? 16 : 8,
              }}>
              <FontAwesome5
                name="at"
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="Email"
              style={styles.textInput}
              defaultValue={email}
              onChangeText={mail => setEmail(mail)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                top: deviceTypeAndroid === 'Handset' ? 16 : 8,
              }}>
              <FontAwesome5
                name="key"
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              style={styles.textInput}
              placeholder="Password"
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
              <FontAwesome5
                name={iconName}
                color={colorDisabled}
                size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleRegister} style={styles.btnSignup}>
            <Text style={styles.btnSignupText}>SignUp Now</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: deviceTypeAndroid === 'Handset' ? 14 : 20,
              fontFamily: 'Outfit-Medium',
              color: lightDark,
              marginTop: 10,
              textAlign: 'center',
            }}>
            By registering, you acknowledge and agree to our{' '}
            <Text style={{textDecorationLine: 'underline'}}>
              Terms of use and privacy policy
            </Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{...styles.btnSocial, backgroundColor: bgPrimary}}>
            <FontAwesome5 name="facebook-f" color={bgLight} size={Size} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSocial}>
            <MaterialCommunityIcons
              name="google"
              color={bgLight}
              size={Size}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.btnSocial, backgroundColor: bgPrimary}}>
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
          <Text style={styles.textInfo}>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                ...styles.textInfo,
                fontWeight: 'bold',
                color: bgPrimary,
              }}>
              SignIn
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
    marginLeft: 8,
    color: textDark,
    fontFamily: 'Outfit-Bold',
  },

  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
    marginTop: 10,
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: lightDark,
  },

  fieldContainer: {
    marginTop: 20,
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colorDisabled,
    marginBottom: 10,
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
    paddingLeft: deviceTypeAndroid === 'Handset' ? 45 : 60,
  },

  btnSignup: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 20,
  },

  btnSignupText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
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
