import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import {
  bgLight,
  textDark,
  lightDark,
  bgPrimary,
  colorFb,
  colorGoogle,
  Size,
  colorDisabled,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ErrorComponent} from '../components/errors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {setError} from '../feature/reducers/errorReducer';
import {onSuccess} from '../feature/reducers/successReducer';
import {SuccessComponent} from '../components/success';

export const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = useState(route.params?.email || null);
  const [password, setPassword] = useState(null);
  const [visible, setVisible] = useState(true);

  // const {setError, setErrorMessage, error} = useContext(CreateErrorContext);
  const {
    error: {error},
    success: {success},
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email) {
      dispatch(
        setError({
          isError: true,
          message: 'Email field is missing',
        }),
      );
      return;
    }

    if (!password) {
      dispatch(
        setError({
          isError: true,
          message: 'Password field is missing',
        }),
      );
      return;
    }

    dispatch(
      onSuccess({
        isSuccess: true,
        successMessage: 'Login Successful',
      }),
    );

    setTimeout(
      () =>
        dispatch(
          onSuccess({
            successMessage: 'Logging you in...',
            isSuccess: true,
          }),
        ),
      3500,
    );

    setTimeout(() => navigation.navigate('Splash'), 7500);
  };

  const {width} = useWindowDimensions();

  const iconName = visible ? 'eye-off' : 'eye';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: {bgLight}}}>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      {error.isError && <ErrorComponent message={error.message} />}
      {success.isSuccess && (
        <SuccessComponent message={success.successMessage} />
      )}

      <ScrollView
        contentContainerStyle={{
          backgroundColor: bgLight,
          minHeight: '100%',
          paddingVertical: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
            marginHorizontal: 30,
          }}>
          <Image
            source={require('../assets/rounded-chat.png')}
            style={{width: 40, height: 40, resizeMode: 'cover'}}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              marginLeft: 8,
              color: lightDark,
            }}>
            Chatty
          </Text>
        </View>

        <Text
          style={{
            fontSize: 27,
            fontWeight: '500',
            color: lightDark,
            marginLeft: 30,
          }}>
          Welcome Back!
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: lightDark,
            marginLeft: 30,
            marginTop: 10,
          }}>
          SignIn to continue
        </Text>
        <View
          style={{
            marginVertical: 45,
            marginHorizontal: 30,
          }}>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <MaterialIcons
                name="alternate-email"
                color={colorDisabled}
                size={Size}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="email"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colorDisabled,
                marginBottom: 10,
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
              defaultValue={email}
              onChangeText={mailText => setEmail(mailText)}
            />
          </View>

          <View style={{marginBottom: 20}}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 16}}>
              <MaterialIcons name="vpn-key" color={colorDisabled} size={Size} />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={colorDisabled}
              placeholder="password"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                fontSize: 18,
                fontWeight: '500',
                color: lightDark,
                paddingLeft: 40,
              }}
              defaultValue={password}
              onChangeText={passwd => setPassword(passwd)}
              secureTextEntry={visible}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 0, top: 16}}
              onPress={() => setVisible(!visible)}>
              <Ionicons name={iconName} color={colorDisabled} size={Size} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              alignSelf: 'center',
              padding: 15,
              width: width - 100,
              borderRadius: 50,
              backgroundColor: bgPrimary,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: bgLight,
                textAlign: 'center',
              }}>
              Login Now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.navigate('Password-reset')}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
                color: lightDark,
                marginTop: 10,
              }}>
              Forget password?
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity>
            <MaterialIcons name="facebook" color={colorFb} size={33} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: colorGoogle,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 8,
              marginRight: 10,
            }}>
            <Ionicons
              name="logo-google"
              color={bgLight}
              size={22}
              style={{borderRadius: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: bgPrimary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="linkedin-in"
              color={bgLight}
              size={22}
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
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '500',
              color: lightDark,
            }}>
            Don't have account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                color: textDark,
              }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
